export interface Metrics {
  total_tickets: number;
  tickets_by_day: { date: string; count: number }[];
  top_categories: Record<string, number>;
  top_brands: Record<string, number>;
  top_products: Record<string, number>;
}

export interface Ticket {
  id: number;
  created_at: string;
  customer_name: string;
  channel: string;
  subject: string;
  status: 'open' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high';
}