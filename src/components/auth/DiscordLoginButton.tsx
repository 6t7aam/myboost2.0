import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface DiscordLoginButtonProps {
  /** Path to return to after the OAuth round-trip, e.g. "/order". */
  redirectTo?: string;
  label?: string;
}

/** Discord's brand mark. */
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3a.074.074 0 0 0-.079.037c-.34.6-.719 1.387-.984 2.001a18.27 18.27 0 0 0-5.486 0 12.6 12.6 0 0 0-.997-2.001.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C1.533 7.55.943 10.65 1.233 13.71a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.245.198.372.292a.077.077 0 0 1-.006.127c-.598.349-1.22.645-1.873.891a.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-3.547-.838-6.624-2.546-9.314a.061.061 0 0 0-.031-.028ZM8.02 11.846c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
  </svg>
);

const DiscordLoginButton = ({ redirectTo, label = "Continue with Discord" }: DiscordLoginButtonProps) => {
  const { signInWithDiscord } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const { error } = await signInWithDiscord(redirectTo);
    if (error) {
      setLoading(false);
      toast({ title: "Discord login failed", description: error.message, variant: "destructive" });
    }
    // On success the browser redirects to Discord, so we leave the spinner on.
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="h-12 w-full gap-2 rounded-xl bg-[#5865F2] font-bold uppercase tracking-wider text-white hover:bg-[#4752c4]"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <DiscordIcon className="h-5 w-5" />}
      {label}
    </Button>
  );
};

export default DiscordLoginButton;
