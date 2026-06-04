import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

const authRedirectUrl = () =>
  window.location.hostname === "localhost"
    ? window.location.origin
    : "https://www.myboost.top";

// When a user signs in with Discord, persist their Discord identity into
// `profiles` so the order-sync Edge Function can DM/thread them later.
const syncDiscordProfile = async (user: User) => {
  const discordIdentity = user.identities?.find((i) => i.provider === "discord");
  if (!discordIdentity) return;

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const data = (discordIdentity.identity_data ?? {}) as Record<string, unknown>;

  // Discord's stable user id is `provider_id` / `sub`; username can be
  // `user_name`, `full_name`, `name`, or `custom_claims.global_name`.
  const discordId =
    (data.provider_id as string) ||
    (data.sub as string) ||
    (meta.provider_id as string) ||
    (meta.sub as string) ||
    null;
  const discordUsername =
    (data.user_name as string) ||
    (data.full_name as string) ||
    (data.name as string) ||
    (meta.user_name as string) ||
    (meta.full_name as string) ||
    (meta.name as string) ||
    null;

  if (!discordId) return;

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      email: user.email ?? null,
      discord_id: discordId,
      discord_username: discordUsername,
      display_name: discordUsername,
      avatar_url: (data.avatar_url as string) || (meta.avatar_url as string) || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) console.warn("Failed to sync Discord profile:", error.message);
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        if (event === "SIGNED_IN" && session?.user) {
          // Defer to avoid running Supabase calls inside the auth callback.
          setTimeout(() => { void syncDiscordProfile(session.user); }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const redirectUrl = window.location.hostname === 'localhost'
      ? window.location.origin
      : 'https://www.myboost.top';

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signInWithDiscord = async (redirectTo?: string) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        // Request identify (id + username) and email scopes.
        scopes: "identify email",
        redirectTo: redirectTo
          ? `${authRedirectUrl()}${redirectTo}`
          : authRedirectUrl(),
      },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const baseUrl = window.location.hostname === "localhost"
      ? window.location.origin
      : "https://www.myboost.top";
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/reset-password`,
    });
    return { error };
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    return { error };
  };

  return { user, session, loading, signUp, signIn, signInWithDiscord, signOut, resetPassword, updatePassword };
};
