import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { User, LogOut, Package, CheckCircle, ClipboardList } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";

const AccountPage = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ display_name: string | null; email: string | null } | null>(null);
  const [orderStats, setOrderStats] = useState({ active: 0, completed: 0 });

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("display_name, email")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => { if (data) setProfile(data); });

      supabase
        .from("orders")
        .select("status")
        .eq("user_id", user.id)
        .then(({ data }) => {
          if (data) {
            setOrderStats({
              active: data.filter((o) => o.status === "pending" || o.status === "active").length,
              completed: data.filter((o) => o.status === "completed").length,
            });
          }
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://www.myboost.top/account" />
      </Helmet>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-3xl">
        <Card className="border-primary/20 glow-border mb-8">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl text-foreground">
                {profile?.display_name || "My Account"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{profile?.email || user.email}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => { await signOut(); navigate("/"); }}
              className="border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 mr-1.5" /> Logout
            </Button>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="border-border/50 hover:glow-border transition-all">
            <CardContent className="p-4 text-center">
              <Package className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Orders</p>
              <p className="text-2xl font-bold text-primary mt-1">{orderStats.active}</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 hover:glow-border transition-all">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-5 w-5 text-green-400 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Completed</p>
              <p className="text-2xl font-bold text-green-400 mt-1">{orderStats.completed}</p>
            </CardContent>
          </Card>
        </div>

        <Link to="/my-orders">
          <Button className="w-full gap-2 glow-box font-bold uppercase tracking-wider">
            <ClipboardList className="h-4 w-4" /> View All Orders
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AccountPage;
