import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LogIn, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      // Check if user is admin and redirect accordingly
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center px-4 pt-24 pb-12">
        <Card className="w-full max-w-md border-primary/20 glow-border">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-2">
              <LogIn className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Login</CardTitle>
            <p className="text-sm text-muted-foreground">Welcome back to MyBoost</p>
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-secondary border-border focus:border-primary"
              />
              <Button type="submit" disabled={isLoading} className="w-full glow-box font-bold uppercase tracking-wider">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Login
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-semibold">Sign Up</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
