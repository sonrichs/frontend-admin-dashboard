import { Link } from 'react-router';

export default function Sidebar() {
  return (
    <aside className="max-w-64 min-h-screen bg-gray-900 shadow rounded-lg p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">
        Admin Panel
      </h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="block py-2 px-4 rounded hover:bg-gray-800 text-gray-200 font-medium text-left transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="block py-2 px-4 rounded hover:bg-gray-800 text-gray-200 font-medium text-left transition"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="block py-2 px-4 rounded hover:bg-gray-800 text-gray-200 font-medium text-left transition"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/investments"
              className="block py-2 px-4 rounded hover:bg-gray-800 text-gray-200 font-medium text-left transition"
            >
              Investments
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
