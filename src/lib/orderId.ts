interface OrderIdSource {
  id?: string | null;
  manual_order_code?: string | null;
}

export function formatOrderId(order: OrderIdSource | null | undefined): string {
  if (!order) return "—";
  if (order.manual_order_code) return order.manual_order_code;
  if (order.id) return order.id.slice(0, 8);
  return "—";
}
