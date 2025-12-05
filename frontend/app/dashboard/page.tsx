import { fetchMetrics } from "@/lib/services";
import { Metrics } from "@/lib/types";

const StatCard = ({ title, value }: { title: string; value: string | number }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="mt-1 text-3xl font-semibold text-indigo-600">{value}</p>
  </div>
);

const TopItemsList = ({ title, data }: { title: string; data: Record<string, number> }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mt-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <dl className="space-y-2">
      {Object.entries(data)
        .sort(([, countA], [, countB]) => countB - countA) // Ordena por contagem
        .map(([name, count]) => (
          <div key={name} className="flex justify-between border-b pb-1">
            <dt className="text-sm text-gray-600">{name}</dt>
            <dd className="text-sm font-medium text-gray-900">{count}</dd>
          </div>
        ))}
    </dl>
  </div>
);

// Componente Principal da Página
export default async function DashboardPage() {
  let metrics: Metrics | null = null;
  let error: string | null = null;

  try {
    metrics = await fetchMetrics();
  } catch (err) {
    console.error("Erro ao buscar métricas:", err);
    error = "Não foi possível carregar as métricas do servidor. Verifique o backend e o arquivo metrics.json.";
  }

  if (error) {
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-red-600">Erro no Dashboard</h1>
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  if (!metrics) {
     return <div className="p-4 text-center">Carregando dados...</div>;
  }

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard de Métricas</h1>
      
      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total de Tickets no Dataset" value={metrics.total_tickets.toLocaleString()} />
        <StatCard title="Total de Categorias Diferentes" value={Object.keys(metrics.top_categories).length} />
      </div>

      {/* Top Listas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {metrics.top_categories && (
          <TopItemsList title="Top 5 Categorias (Exemplo)" data={metrics.top_categories} />
        )}
      </div>
    </main>
  );
}