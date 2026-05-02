import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import OrderChat from "./OrderChat";

interface OrderChatDialogProps {
  orderId: string;
  orderService: string;
}

const OrderChatDialog = ({ orderId, orderService }: OrderChatDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="border-primary/30 text-primary hover:bg-primary/10"
      >
        <MessageSquare className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg">
              Order Chat - {orderService}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">Order ID: {orderId.slice(0, 8)}</p>
          </DialogHeader>
          <OrderChat orderId={orderId} isAdmin={true} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderChatDialog;
