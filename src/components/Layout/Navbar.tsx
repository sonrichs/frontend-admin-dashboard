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
    <header className="flex justify-between bg-white p-4 shadow">
      <span>Admin Dashboard</span>
      <button
        className="rounded hover:cursor-pointer hover:bg-emerald-50"
        onClick={handleLogout}
      >
        <img
          src="/logout-icon.svg"
          alt="Logout"
          className="mr-1 inline-block size-5"
        />
      </button>
    </header>
  );
}
