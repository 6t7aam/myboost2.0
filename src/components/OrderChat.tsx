import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  order_id: string;
  sender_type: "customer" | "admin";
  sender_id: string | null;
  message: string;
  created_at: string;
}

interface OrderChatProps {
  orderId: string;
  isAdmin?: boolean;
}

const OrderChat = ({ orderId, isAdmin = false }: OrderChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!orderId) return;

    console.log("[OrderChat] Component mounted with orderId:", orderId);
    console.log("[OrderChat] isAdmin:", isAdmin);

    const fetchMessages = async () => {
      setLoading(true);
      console.log("[OrderChat] Fetching messages for order_id:", orderId);

      const { data, error } = await supabase
        .from("order_messages")
        .select("*")
        .eq("order_id", orderId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("[OrderChat] Error fetching messages:", error);
        console.error("[OrderChat] Error details:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        });
        toast.error("Failed to load messages");
      } else {
        console.log("[OrderChat] Messages fetched successfully:", data?.length || 0, "messages");
        console.log("[OrderChat] Messages data:", data);
        setMessages(data || []);
      }
      setLoading(false);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`order-chat-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "order_messages",
          filter: `order_id=eq.${orderId}`,
        },
        (payload) => {
          console.log("[OrderChat] Real-time message received:", payload.new);
          setMessages((prev) => [...prev, payload.new as Message]);
          scrollToBottom();
        }
      )
      .subscribe();

    console.log("[OrderChat] Subscribed to channel:", `order-chat-${orderId}`);

    return () => {
      console.log("[OrderChat] Unsubscribing from channel:", `order-chat-${orderId}`);
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }

    if (!currentUserId) {
      toast.error("You must be logged in to send messages");
      return;
    }

    if (!orderId) {
      toast.error("Invalid order ID");
      return;
    }

    setSending(true);

    const messageData = {
      order_id: orderId,
      sender_type: isAdmin ? "admin" : "customer",
      sender_id: currentUserId,
      message: newMessage.trim(),
    };

    console.log("[OrderChat] Sending message:", messageData);
    console.log("[OrderChat] Current user ID:", currentUserId);
    console.log("[OrderChat] Order ID:", orderId);
    console.log("[OrderChat] Is Admin:", isAdmin);

    const { data, error } = await supabase
      .from("order_messages")
      .insert(messageData)
      .select();

    if (error) {
      console.error("[OrderChat] Error sending message:", error);
      console.error("[OrderChat] Error details:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      toast.error(`Failed to send message: ${error.message}`);
    } else {
      console.log("[OrderChat] Message sent successfully:", data);
      setNewMessage("");

      // Manually refresh messages to ensure it appears
      console.log("[OrderChat] Refreshing messages after send...");
      const { data: refreshedMessages, error: fetchError } = await supabase
        .from("order_messages")
        .select("*")
        .eq("order_id", orderId)
        .order("created_at", { ascending: true });

      if (!fetchError && refreshedMessages) {
        console.log("[OrderChat] Messages refreshed:", refreshedMessages.length, "messages");
        setMessages(refreshedMessages);
      } else if (fetchError) {
        console.error("[OrderChat] Error refreshing messages:", fetchError);
      }

      toast.success("Message sent");
    }
    setSending(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="rounded-2xl border border-primary/30 bg-card overflow-hidden">
      {/* Header */}
      <div className="border-b border-primary/30 bg-primary/5 px-6 py-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-black uppercase text-foreground">Chat</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="mb-4 h-[400px] overflow-y-auto rounded-lg bg-black/40 p-4">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-center text-sm text-muted-foreground">
                    No messages yet. Start the conversation!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => {
                    const isOwnMessage = msg.sender_id === currentUserId;
                    const isAdminMessage = msg.sender_type === "admin";

                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-xl px-4 py-3 ${
                            isAdminMessage
                              ? "bg-primary/20 border border-primary/40"
                              : "bg-secondary/80 border border-border/50"
                          }`}
                        >
                          <div className="mb-1 flex items-center gap-2">
                            <span className={`text-xs font-bold uppercase ${isAdminMessage ? "text-primary" : "text-foreground"}`}>
                              {isAdminMessage ? "Admin" : "You"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(msg.created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-foreground whitespace-pre-wrap break-words">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={sending}
                className="bg-black/40 border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim() || sending}
                className="shrink-0 bg-primary text-background hover:bg-primary/90 font-bold"
              >
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderChat;
