import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/Master');
  // Optionally, you can return null or a fallback here, but redirect will handle it.
  return null;
}
