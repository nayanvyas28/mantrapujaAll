import { redirect } from 'next/navigation';

export default function Home() {
  // Automatically redirect to the dashboard
  // The middleware will handle sending unauthenticated users to /login
  redirect('/dashboard');
}
