import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/userAuth';

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between">
      <span>Admin Dashboard</span>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 hover:cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
}
