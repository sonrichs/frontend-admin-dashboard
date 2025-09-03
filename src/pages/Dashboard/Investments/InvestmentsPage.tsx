import { useEffect, useState } from 'react';
import { getInvestments } from '../../../api/resources/investmentApi';
import type { Investment } from '../../../api/models/Investment';
import CreateInvestmentModal from './CreateInvestmentModal';

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedInvestments = await getInvestments();
      setInvestments(fetchedInvestments);
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Investments List</h1>
      <div className="mb-4 flex justify-end"></div>
      <div className="mb-4 flex justify-end">
        <CreateInvestmentModal />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Project</th>
              <th className="px-4 py-2 text-left">Stocks</th>
              <th className="px-4 py-2 text-left">Invested At</th>
              <th className="px-4 py-2 text-left">Exited At</th>
              <th className="px-4 py-2 text-left">User</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment) => (
              <tr
                key={investment.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-2">{investment.project.title}</td>
                <td className="px-4 py-2">{investment.stocksAmount}</td>
                <td className="px-4 py-2">
                  {new Date(investment.investedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {investment.exitedAt
                    ? new Date(investment.exitedAt).toLocaleDateString()
                    : ''}
                </td>
                <td className="px-4 py-2">{investment.user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
