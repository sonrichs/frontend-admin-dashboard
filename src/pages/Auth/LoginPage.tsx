import { useState } from 'react';
import { useNavigate } from 'react-router';
import { setToken } from '../../utils/token';
import { login } from '../../api/resources/login';
import type { FormEvent } from 'react';
import type { JwtResponse } from '../../api/models/jwtResponse';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    setError(null);
    try {
      const response: JwtResponse = await login(email, password);
      setToken(response.access_token);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-2xl mb-4">Login</h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 hover:cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
}
