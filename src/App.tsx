import { Toaster } from 'react-hot-toast';
import AppRouter from './router/AppRouter';

export default function App() {
  return (
    <>
      <Toaster />
      <AppRouter />
    </>
  );
}
