import { useEffect, useState } from 'react';
import { getInvestments } from '../../api/resources/investmentApi';
import type { Investment } from '../../api/models/Investment';

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Investments List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Project</th>
              <th className="py-2 px-4 text-left">Stocks</th>
              <th className="py-2 px-4 text-left">Invested At</th>
              <th className="py-2 px-4 text-left">Exited At</th>
              <th className="py-2 px-4 text-left">User</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment) => (
              <tr key={investment.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{investment.project.title}</td>
                <td className="py-2 px-4">{investment.stocksAmount}</td>
                <td className="py-2 px-4">
                  {new Date(investment.investedAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">
                  {new Date(investment.exitedAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">{investment.user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
