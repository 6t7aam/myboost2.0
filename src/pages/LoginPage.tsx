import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LogIn, Loader2, Mail, Lock, ArrowLeft, KeyRound, MailCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import AuthShell from "@/components/auth/AuthShell";
import { AuthField, PasswordField } from "@/components/auth/AuthField";

type Mode = "login" | "forgot";

const LoginPage = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      const { data: { user: loggedInUser } } = await supabase.auth.getUser();
      if (loggedInUser) {
        const { data: isAdmin } = await supabase.rpc("has_role", {
          _user_id: loggedInUser.id,
          _role: "admin",
        });
        toast({ title: "Welcome back!", description: "You have been logged in successfully." });
        navigate(isAdmin ? "/admin" : "/account");
      }
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await resetPassword(email);
    setIsLoading(false);

    if (error) {
      toast({ title: "Couldn't send email", description: error.message, variant: "destructive" });
    } else {
      setResetSent(true);
      toast({ title: "Check your inbox", description: "We've sent you a password reset link." });
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://www.myboost.top/login" />
      </Helmet>

      {mode === "login" ? (
        <AuthShell
          icon={<LogIn className="h-7 w-7 text-primary" />}
          title="Welcome Back"
          subtitle="Log in to manage your orders and boosts"
          footer={
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          }
        >
          <form onSubmit={handleLogin} className="space-y-4">
            <AuthField
              id="login-email"
              label="Email"
              type="email"
              Icon={Mail}
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            <PasswordField
              id="login-password"
              label="Password"
              Icon={Lock}
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => { setMode("forgot"); setResetSent(false); }}
                className="text-xs font-semibold text-primary transition-colors hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="btn-yellow h-12 w-full gap-2 rounded-xl font-bold uppercase tracking-wider glow-box"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              Log In
            </Button>
          </form>
        </AuthShell>
      ) : (
        <AuthShell
          icon={<KeyRound className="h-7 w-7 text-primary" />}
          title="Reset Password"
          subtitle="Enter your email and we'll send you a reset link"
          footer={
            <button
              type="button"
              onClick={() => { setMode("login"); setResetSent(false); }}
              className="mx-auto flex items-center justify-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to login
            </button>
          }
        >
          {resetSent ? (
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
              <MailCheck className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-3 text-lg font-bold text-foreground">Email sent!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                If an account exists for <span className="font-semibold text-foreground">{email}</span>, you'll
                receive a password reset link shortly. Check your inbox and spam folder.
              </p>
            </div>
          ) : (
            <form onSubmit={handleForgot} className="space-y-4">
              <AuthField
                id="forgot-email"
                label="Email"
                type="email"
                Icon={Mail}
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="btn-yellow h-12 w-full gap-2 rounded-xl font-bold uppercase tracking-wider glow-box"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                Send Reset Link
              </Button>
            </form>
          )}
        </AuthShell>
      )}
    </>
  );
};

export default LoginPage;
