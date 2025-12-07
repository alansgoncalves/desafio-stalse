// Mock (simulação) do cliente de API para evitar chamadas HTTP reais
jest.mock('@/lib/api', () => ({
  api: {
    get: jest.fn(),
    patch: jest.fn(),
  },
}));

import { fetchMetrics } from '@/lib/services';
import { api } from '@/lib/api';

describe('fetchMetrics', () => {
  it('Função fetchMetrics deve chamar api.get com o caminho /metrics', async () => {
    // Configura o mock para retornar um valor de sucesso
    (api.get as jest.Mock).mockResolvedValue({ total_tickets: 100 }); 
    
    await fetchMetrics();

    // Verifica se a função de fetch foi chamada com o endpoint correto
    expect(api.get).toHaveBeenCalledWith('/metrics'); 
  });
});