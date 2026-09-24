import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, Search, ShieldCheck } from 'lucide-react';

export default function UserDirectoryPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/users')
      .then((res) => {
        if (res.data.success) setUsers(res.data.users);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">User & Partner Directory</h1>
          <p className="text-xs text-slate-500">All registered car owners, chauffeurs, and garage operators</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, email, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-5">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4">Platform Role</th>
              <th className="py-3 px-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50/60">
                <td className="py-3.5 px-5 font-bold text-slate-900">{u.name}</td>
                <td className="py-3.5 px-4 text-slate-600">{u.email}</td>
                <td className="py-3.5 px-4 font-mono text-slate-700">{u.phone}</td>
                <td className="py-3.5 px-4 text-slate-500">{u.city}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    u.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : u.role === 'driver'
                      ? 'bg-blue-100 text-blue-800'
                      : u.role === 'provider'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 px-5">
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold px-2 py-0.5 rounded-full">
                    {u.status || 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
