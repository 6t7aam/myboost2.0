import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { installAudioGesture, playMessageSound } from "@/lib/notificationSounds";
import { setTitleAlert } from "@/lib/titleAlert";
import { isSoundEnabled } from "@/hooks/useSoundPreference";

export function useUnreadOrderMessages(user: User | null | undefined) {
  const [count, setCount] = useState(0);
  const orderIdsRef = useRef<string[]>([]);

  useEffect(() => {
    if (!user) {
      setCount(0);
      return;
    }

    let cancelled = false;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const refreshOrderIds = async () => {
      const { data: orders, error } = await supabase
        .from("orders")
        .select("id")
        .eq("user_id", user.id);
      if (error) {
        console.error("[useUnreadOrderMessages] orders fetch failed:", error.message);
      }
      orderIdsRef.current = (orders || []).map((o) => o.id);
      return orderIdsRef.current;
    };

    const refreshCount = async () => {
      const ids = orderIdsRef.current.length
        ? orderIdsRef.current
        : await refreshOrderIds();
      if (ids.length === 0) {
        if (!cancelled) setCount(0);
        return;
      }
      const { count: unread, error } = await supabase
        .from("order_messages")
        .select("id", { count: "exact", head: true })
        .in("order_id", ids)
        .in("sender_type", ["admin", "system"])
        .is("read_at", null);
      if (error) {
        console.error(
          "[useUnreadOrderMessages] unread query failed:",
          error.message,
          "— is the read_at column migration applied?"
        );
        if (!cancelled) setCount(0);
        return;
      }
      if (!cancelled) setCount(unread || 0);
    };

    refreshOrderIds().then(refreshCount);

    installAudioGesture();

    channel = supabase
      .channel(`unread-${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "order_messages" },
        (payload) => {
          console.log("[useUnreadOrderMessages] order_messages INSERT", payload.new);
          const row = payload.new as { sender_type?: string; order_id?: string };
          const isInbound = row.sender_type === "admin" || row.sender_type === "system";
          const onThisOrder =
            typeof window !== "undefined" &&
            row.order_id &&
            window.location.pathname.startsWith(`/order/status/${row.order_id}`);
          if (isInbound && !onThisOrder) {
            if (isSoundEnabled()) void playMessageSound();
            setTitleAlert("🔔 New Message — MyBoost");
          }
          refreshCount();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "order_messages" },
        () => refreshCount()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders", filter: `user_id=eq.${user.id}` },
        () => refreshOrderIds().then(refreshCount)
      )
      .subscribe((status) => {
        console.log("[useUnreadOrderMessages] subscription status:", status);
      });

    const interval = setInterval(refreshCount, 30000);

    return () => {
      cancelled = true;
      if (channel) supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [user?.id]);

  return count;
}
