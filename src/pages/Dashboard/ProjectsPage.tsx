import { useEffect, useState } from 'react';
import { getProjects } from '../../api/resources/projectApi';
import type { Project } from '../../api/models/Project';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Project List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Stocks</th>
              <th className="py-2 px-4 text-left">Stock Price</th>
              <th className="py-2 px-4 text-left">Currency</th>
              <th className="py-2 px-4 text-left">Start Date</th>
              <th className="py-2 px-4 text-left">End Date</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{project.title}</td>
                <td className="py-2 px-4">{project.description}</td>
                <td className="py-2 px-4">{project.totalStocks}</td>
                <td className="py-2 px-4">{project.stockPrice}</td>
                <td className="py-2 px-4">{project.currency}</td>
                <td className="py-2 px-4">
                  {new Date(project.startDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">
                  {new Date(project.endDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      project.status === 'active'
                        ? 'bg-green-900 text-green-200'
                        : project.status === 'completed'
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {project.status
                      ? project.status.charAt(0).toUpperCase() +
                        project.status.slice(1)
                      : 'Unknown'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
