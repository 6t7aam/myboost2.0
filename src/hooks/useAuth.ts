import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

const authRedirectUrl = () =>
  window.location.hostname === "localhost"
    ? window.location.origin
    : "https://www.myboost.top";

const str = (v: unknown): string | null => (typeof v === "string" && v ? v : null);

// When a user signs in with Discord, persist their Discord identity into
// `profiles` so the order-sync Edge Function can DM/thread them later.
//
// NOTE on schema: this project's `profiles` has a random `id` PK plus a UNIQUE
// `user_id` FK to auth.users, and RLS is keyed on `auth.uid() = user_id`. So we
// upsert on `user_id` (NOT `id`) — a row already exists from the signup trigger.
const syncDiscordProfile = async (user: User) => {
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const app = (user.app_metadata ?? {}) as Record<string, unknown>;
  const customClaims = (meta.custom_claims ?? {}) as Record<string, unknown>;

  // Find the Discord identity if present, but don't *require* it — identities
  // are not always populated on the session user, and the same data is in
  // user_metadata. The snowflake id is `identity.id` and/or provider_id/sub.
  const discordIdentity = user.identities?.find((i) => i.provider === "discord");
  const data = (discordIdentity?.identity_data ?? {}) as Record<string, unknown>;

  const providers = Array.isArray(app.providers) ? (app.providers as string[]) : [];
  const isDiscord =
    !!discordIdentity ||
    app.provider === "discord" ||
    providers.includes("discord") ||
    !!str(data.provider_id) ||
    str(meta.iss)?.includes("discord") === true;

  if (!isDiscord) return;

  const discordId =
    str(discordIdentity?.id) ||
    str(data.provider_id) ||
    str(data.sub) ||
    str(meta.provider_id) ||
    str(meta.sub) ||
    null;

  const discordUsername =
    str(data.user_name) ||
    str(data.full_name) ||
    str(data.name) ||
    str(customClaims.global_name) ||
    str(meta.user_name) ||
    str(meta.full_name) ||
    str(meta.name) ||
    null;

  if (!discordId) {
    console.warn("[discord] sign-in detected but could not resolve discord_id from", {
      identity_data: data,
      user_metadata: meta,
    });
    return;
  }

  console.log("[discord] linking profile", { user_id: user.id, discord_id: discordId, discord_username: discordUsername });

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      email: user.email ?? null,
      discord_id: discordId,
      discord_username: discordUsername,
      display_name: discordUsername,
      avatar_url: str(data.avatar_url) || str(meta.avatar_url) || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("[discord] failed to upsert profile:", error);
  } else {
    console.log("[discord] profile linked successfully for", user.id);
  }
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
      // Backfill: if an already-logged-in Discord user is missing discord_id,
      // link it now. syncDiscordProfile no-ops for non-Discord users.
      if (session?.user) {
        setTimeout(() => { void syncDiscordProfile(session.user); }, 0);
      }
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
