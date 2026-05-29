import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Loader2, KeyRound, ShieldCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import AuthShell from "@/components/auth/AuthShell";
import { PasswordField } from "@/components/auth/AuthField";

const UpdatePasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const { updatePassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // The recovery link establishes a session (detectSessionInUrl). Wait for it
  // so we only allow the update when a valid recovery/session is present.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Password too short", description: "Use at least 6 characters.", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Passwords don't match", description: "Please re-enter the same password.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const { error } = await updatePassword(password);
    setIsLoading(false);

    if (error) {
      toast({ title: "Couldn't update password", description: error.message, variant: "destructive" });
    } else {
      setDone(true);
      toast({ title: "Password updated!", description: "You can now use your new password." });
      setTimeout(() => navigate("/account"), 1500);
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://www.myboost.top/reset-password" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <AuthShell
        icon={<KeyRound className="h-7 w-7 text-primary" />}
        title="Set New Password"
        subtitle="Choose a strong password for your account"
      >
        {done ? (
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
            <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-3 text-lg font-bold text-foreground">All set!</h3>
            <p className="mt-2 text-sm text-muted-foreground">Your password has been updated. Redirecting…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!ready && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-center text-xs text-muted-foreground">
                Open this page from the reset link in your email to continue.
              </div>
            )}
            <PasswordField
              id="new-password"
              label="New Password"
              Icon={Lock}
              value={password}
              onChange={setPassword}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              required
              minLength={6}
            />
            <PasswordField
              id="confirm-password"
              label="Confirm Password"
              Icon={Lock}
              value={confirm}
              onChange={setConfirm}
              placeholder="Repeat your password"
              autoComplete="new-password"
              required
              minLength={6}
            />
            <Button
              type="submit"
              disabled={isLoading || !ready}
              className="btn-yellow h-12 w-full gap-2 rounded-xl font-bold uppercase tracking-wider glow-box"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              Update Password
            </Button>
          </form>
        )}
      </AuthShell>
    </>
  );
};

export default UpdatePasswordPage;
