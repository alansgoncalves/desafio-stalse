import { api } from "./api";
import { Metrics } from "./types";

// Função para buscar as métricas do backend
export async function fetchMetrics(): Promise<Metrics> {
  // O caminho é /metrics, mas o cliente api.get adiciona a base URL
  return api.get<Metrics>("/metrics");
}