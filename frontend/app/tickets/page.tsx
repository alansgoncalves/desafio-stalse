import { fetchTickets } from "@/lib/services";
import { TicketsTable } from "@/components/TicketsTable";
import { Suspense } from "react";
import { Ticket } from "@/lib/types";
import Link from 'next/link'

// Componente de página principal
export default async function TicketsPage() {
    let initialTickets: Ticket[] = [];
    let error: string | null = null;

    try {
        // Busca inicial de todos os tickets no servidor
        initialTickets = await fetchTickets();
    } catch (err) {
        console.error("Erro ao carregar tickets iniciais:", err);
        error = "Não foi possível carregar a lista de tickets. Verifique o backend.";
    }

    return (
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-start mb-8 flex-col sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold mb-8 text-gray-500">Tickets Mini Inbox</h1>
            <Link href="/dashboard" passHref>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 cursor-pointer">
                Voltar Dashboard
              </button>
            </Link>
        </div>
          {error ? (
            <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg">
                <p>{error}</p>
            </div>
          ) : (
            <Suspense fallback={<div className="text-center">Preparando a tabela...</div>}>
                {/* Passa a lista inicial para o componente cliente */}
              <TicketsTable initialTickets={initialTickets} />
            </Suspense>
          )}
      </main>
    );
}