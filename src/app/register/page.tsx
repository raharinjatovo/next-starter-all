'use client'; // Required for using client-side React features like state and event handlers

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // For redirecting after successful registration

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name: name || undefined, password }), // Send name only if provided
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Registration successful! Redirecting to login...');
      // Optionally, redirect to login page or home page
      setTimeout(() => {
        router.push('/api/auth/signin'); // Or any other page e.g. /login
      }, 2000);
    } else {
      setMessage(data.message || 'Registration failed.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name (Optional):</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
