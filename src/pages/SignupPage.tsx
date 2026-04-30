import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showAgreementError, setShowAgreementError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      toast({
        title: "Account created!",
        description: "Check your email to verify your account, then log in.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://www.myboost.top/signup" />
      </Helmet>
      <Navbar />
      <div className="flex items-center justify-center px-4 pt-24 pb-12">
        <Card className="w-full max-w-md border-primary/20 glow-border">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-2">
              <UserPlus className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Create Account</CardTitle>
            <p className="text-sm text-muted-foreground">Join MyBoost today</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary border-border focus:border-primary"
              />
              <Input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-secondary border-border focus:border-primary"
              />

              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="agree-terms"
                    checked={agreed}
                    onCheckedChange={(v) => {
                      setAgreed(v === true);
                      if (v) setShowAgreementError(false);
                    }}
                    className="mt-1 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <label htmlFor="agree-terms" className="text-sm text-muted-foreground leading-snug cursor-pointer select-none">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline" target="_blank">Terms of Service</Link>,{" "}
                    <Link to="/refund" className="text-primary hover:underline" target="_blank">Refund Policy</Link>, and{" "}
                    <Link to="/privacy" className="text-primary hover:underline" target="_blank">Privacy Policy</Link>
                  </label>
                </div>
                {showAgreementError && (
                  <p className="text-xs text-destructive pl-6">You must agree to the terms to continue</p>
                )}
              </div>

              <Button type="submit" disabled={isLoading} className="w-full glow-box font-bold uppercase tracking-wider">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Create Account
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-semibold">Login</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
