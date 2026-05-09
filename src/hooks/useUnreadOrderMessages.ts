import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

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
      const { data: orders } = await supabase
        .from("orders")
        .select("id")
        .eq("user_id", user.id);
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
      const { count: unread } = await supabase
        .from("order_messages")
        .select("id", { count: "exact", head: true })
        .in("order_id", ids)
        .in("sender_type", ["admin", "system"])
        .is("read_at", null);
      if (!cancelled) setCount(unread || 0);
    };

    refreshOrderIds().then(refreshCount);

    channel = supabase
      .channel(`unread-${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "order_messages" },
        () => refreshCount()
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
      .subscribe();

    const interval = setInterval(refreshCount, 30000);

    return () => {
      cancelled = true;
      if (channel) supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [user?.id]);

  return count;
}
