import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PayPalButtonProps {
  amount: number;
  orderId: string;
  onSuccess: () => void;
  disabled?: boolean;
}

const PayPalButton = ({ amount, orderId, onSuccess, disabled }: PayPalButtonProps) => {
  const [processing, setProcessing] = useState(false);

  const handlePayPalPayment = async () => {
    setProcessing(true);

    try {
      // Step 1: Create PayPal order
      const createResponse = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'USD',
          orderId,
        }),
      });

      const createData = await createResponse.json();

      if (!createData.ok || !createData.orderID) {
        throw new Error(createData.error || 'Failed to create PayPal order');
      }

      const paypalOrderID = createData.orderID;

      // Step 2: Open PayPal approval window
      const approvalUrl = `https://www.paypal.com/checkoutnow?token=${paypalOrderID}`;
      const paypalWindow = window.open(
        approvalUrl,
        'PayPal',
        'width=500,height=600,scrollbars=yes'
      );

      if (!paypalWindow) {
        throw new Error('Please allow popups to complete PayPal payment');
      }

      // Step 3: Poll for window close or wait for user action
      const pollTimer = setInterval(() => {
        if (paypalWindow.closed) {
          clearInterval(pollTimer);
          // User closed window - ask if they completed payment
          setTimeout(() => {
            const completed = confirm('Did you complete the PayPal payment?');
            if (completed) {
              capturePayment(paypalOrderID);
            } else {
              setProcessing(false);
              toast.error('Payment cancelled');
            }
          }, 500);
        }
      }, 500);

      // Auto-capture after 5 minutes (fallback)
      setTimeout(() => {
        if (!paypalWindow.closed) {
          clearInterval(pollTimer);
          paypalWindow.close();
          capturePayment(paypalOrderID);
        }
      }, 300000);
    } catch (error: any) {
      console.error('PayPal payment error:', error);
      toast.error(error.message || 'PayPal payment failed');
      setProcessing(false);
    }
  };

  const capturePayment = async (paypalOrderID: string) => {
    try {
      const captureResponse = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderID: paypalOrderID,
          dbOrderId: orderId,
        }),
      });

      const captureData = await captureResponse.json();

      if (!captureData.ok) {
        throw new Error(captureData.error || 'Failed to capture payment');
      }

      toast.success('Payment successful!');
      onSuccess();
    } catch (error: any) {
      console.error('PayPal capture error:', error);
      toast.error(error.message || 'Failed to verify payment');
      setProcessing(false);
    }
  };

  return (
    <Button
      onClick={handlePayPalPayment}
      disabled={disabled || processing}
      size="lg"
      className="w-full gap-2.5 rounded-xl font-bold uppercase tracking-wider text-base glow-box-intense"
    >
      {processing ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" /> Processing PayPal Payment…
        </>
      ) : (
        <>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.905 9.5c.21-1.342.09-2.268-.451-3.105C19.625 5.205 18.29 4.5 16.36 4.5H8.49c-.555 0-1.03.405-1.12.96L4.5 19.5h4.17l1.05-6.645-.033.21c.09-.555.563-.96 1.118-.96h2.325c4.575 0 8.16-1.86 9.21-7.23.03-.165.06-.315.09-.465-.165-.075-.165-.075 0 0z"/>
            <path d="M9.615 9.435c.06-.36.345-.63.72-.63h4.65c.555 0 1.08.045 1.575.135.15.03.3.075.435.12.135.045.27.09.39.15.06.03.12.06.18.09.525.24.96.585 1.26 1.065.21-1.335.09-2.25-.45-3.075C17.55 6.105 16.215 5.4 14.285 5.4H6.415c-.555 0-1.03.405-1.12.96L2.43 20.4h4.17l1.17-7.425.845-3.54z" opacity=".7"/>
          </svg>
          Pay ${amount.toFixed(2)} with PayPal
        </>
      )}
    </Button>
  );
};

export default PayPalButton;
