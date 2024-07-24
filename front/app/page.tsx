'use client'

import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  return (
    <div>
      <h1>Home</h1>
      <input value={'Login 🔒'} type="button" onClick={() => router.push('/login')} />
      <input value={'Register 📝'} type="button" onClick={() => router.push('/register')} />
    </div>
  );
}
