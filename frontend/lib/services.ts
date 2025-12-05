import { api } from "./api";
import { Metrics } from "./types";

// Função para buscar as métricas do backend
export async function fetchMetrics(): Promise<Metrics> {
  return api.get<Metrics>("/metrics");
}