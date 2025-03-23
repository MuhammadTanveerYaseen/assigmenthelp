'use client';

import { useState, useEffect } from 'react';
import { api, User } from '@/lib/api';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.users.getAll();
      setUsers(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdUser = await api.users.create(newUser);
      setUsers([...users, createdUser]);
      setNewUser({ name: '', email: '' });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create user');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.users.delete(id);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete user');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      
      {/* Add User Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        </div>
      </form>

      {/* Users List */}
      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={() => handleDelete(user._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 