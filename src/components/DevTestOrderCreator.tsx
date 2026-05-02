import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestTube, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DevTestOrderCreator = () => {
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  // Only show in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  const createTestOrder = async () => {
    setCreating(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please login first to create a test order");
        setCreating(false);
        return;
      }

      // Create test order
      const { data, error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          service: "Test Order - Arena Breakout: Infinite Koens Farming",
          price: 99.99,
          status: "pending",
          booster_type: "Test Booster",
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating test order:", error);
        toast.error("Failed to create test order");
        setCreating(false);
        return;
      }

      toast.success("Test order created!");

      // Redirect to order status page
      navigate(`/order/status/${data.id}`);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to create test order");
      setCreating(false);
    }
  };

  return (
    <Card className="border-yellow-500/50 bg-yellow-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-500">
          <TestTube className="h-5 w-5" />
          Developer Test Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Create a test order for local development. This will not trigger payments.
        </p>
        <Button
          onClick={createTestOrder}
          disabled={creating}
          className="bg-yellow-500 text-black hover:bg-yellow-600"
        >
          {creating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <TestTube className="h-4 w-4 mr-2" />
              Create Test Order
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DevTestOrderCreator;
