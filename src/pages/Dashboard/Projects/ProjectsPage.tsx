import { useEffect, useState } from 'react';
import { getProjects } from '../../../api/resources/projectApi';
import type { Project } from '../../../api/models/Project';
import CreateProjectModal from './CreateProjectModal';

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
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Project List</h1>
      <div className="mb-4 flex justify-end">
        <CreateProjectModal />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Stocks</th>
              <th className="px-4 py-2 text-left">Stock Price</th>
              <th className="px-4 py-2 text-left">Currency</th>
              <th className="px-4 py-2 text-left">Start Date</th>
              <th className="px-4 py-2 text-left">End Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-2">{project.title}</td>
                <td className="px-4 py-2">{project.description}</td>
                <td className="px-4 py-2">{project.totalStocks}</td>
                <td className="px-4 py-2">{project.stockPrice}</td>
                <td className="px-4 py-2">{project.currency}</td>
                <td className="px-4 py-2">
                  {new Date(project.startDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(project.endDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold ${
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
