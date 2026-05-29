import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Loader2, Mail, Lock, MailCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import AuthShell from "@/components/auth/AuthShell";
import { AuthField, PasswordField } from "@/components/auth/AuthField";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showAgreementError, setShowAgreementError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setShowAgreementError(true);
      return;
    }
    setShowAgreementError(false);
    setIsLoading(true);
    const { error } = await signUp(email, password);
    setIsLoading(false);

    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } else {
      setCreated(true);
      toast({
        title: "Account created!",
        description: "Check your email to verify your account, then log in.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://www.myboost.top/signup" />
      </Helmet>
      <AuthShell
        icon={<UserPlus className="h-7 w-7 text-primary" />}
        title="Create Account"
        subtitle="Join MyBoost and start climbing today"
        footer={
          !created ? (
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Log In
              </Link>
            </p>
          ) : undefined
        }
      >
        {created ? (
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
            <MailCheck className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-3 text-lg font-bold text-foreground">Almost there!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We've sent a verification link to <span className="font-semibold text-foreground">{email}</span>.
              Confirm your email, then log in.
            </p>
            <Link to="/login">
              <Button className="btn-yellow mt-5 h-11 w-full gap-2 rounded-xl font-bold uppercase tracking-wider glow-box">
                Go to Login
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthField
              id="signup-email"
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
              id="signup-password"
              label="Password"
              Icon={Lock}
              value={password}
              onChange={setPassword}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              required
              minLength={6}
            />

            <div className="space-y-1">
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="agree-terms"
                  checked={agreed}
                  onCheckedChange={(v) => {
                    setAgreed(v === true);
                    if (v) setShowAgreementError(false);
                  }}
                  className="mt-0.5 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <label htmlFor="agree-terms" className="cursor-pointer select-none text-xs leading-snug text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline" target="_blank">Terms of Service</Link>,{" "}
                  <Link to="/refund" className="text-primary hover:underline" target="_blank">Refund Policy</Link>, and{" "}
                  <Link to="/privacy" className="text-primary hover:underline" target="_blank">Privacy Policy</Link>
                </label>
              </div>
              {showAgreementError && (
                <p className="pl-7 text-xs text-destructive">You must agree to the terms to continue</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="btn-yellow h-12 w-full gap-2 rounded-xl font-bold uppercase tracking-wider glow-box"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
              Create Account
            </Button>
          </form>
        )}
      </AuthShell>
    </>
  );
};

export default SignupPage;
