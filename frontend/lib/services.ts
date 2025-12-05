import { api } from "./api";
import { Metrics } from "./types";
import { Ticket } from "./types";

// Função para buscar as métricas do backend
export async function fetchMetrics(): Promise<Metrics> {
  return api.get<Metrics>("/metrics");
}

// Função para buscar tickets, aceitando um termo de busca
export async function fetchTickets(searchTerm: string = ""): Promise<Ticket[]> {
  // api.get montará a URL como /tickets?search=searchTerm
  return api.get<Ticket[]>("/tickets", { query: { search: searchTerm } });
}
