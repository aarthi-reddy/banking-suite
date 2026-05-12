import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
const areaData = [
  { month: 'Jan', income: 45000, expenses: 32000 },
  { month: 'Feb', income: 52000, expenses: 38000 },
  { month: 'Mar', income: 48000, expenses: 35000 },
  { month: 'Apr', income: 61000, expenses: 42000 },
  { month: 'May', income: 55000, expenses: 39000 },
  { month: 'Jun', income: 67000, expenses: 45000 },
  { month: 'Jul', income: 72000, expenses: 48000 },
];
const pieData = [
  { name: 'Housing', value: 35 },
  { name: 'Food', value: 20 },
  { name: 'Transport', value: 15 },
  { name: 'Healthcare', value: 10 },
  { name: 'Others', value: 20 },
];
const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
const transactions = [
  { id: 1, name: 'Salary Deposit', type: 'credit', amount: 5200, date: '2026-05-01', category: 'Income', status: 'completed' },
  { id: 2, name: 'Office Rent', type: 'debit', amount: 1800, date: '2026-05-02', category: 'Housing', status: 'completed' },
  { id: 3, name: 'AWS Services', type: 'debit', amount: 340, date: '2026-05-03', category: 'Technology', status: 'completed' },
  { id: 4, name: 'Client Payment', type: 'credit', amount: 3500, date: '2026-05-04', category: 'Income', status: 'pending' },
  { id: 5, name: 'Team Lunch', type: 'debit', amount: 180, date: '2026-05-05', category: 'Food', status: 'completed' },
  { id: 6, name: 'Insurance Premium', type: 'debit', amount: 420, date: '2026-05-06', category: 'Healthcare', status: 'completed' },
  { id: 7, name: 'Freelance Income', type: 'credit', amount: 1200, date: '2026-05-07', category: 'Income', status: 'completed' },
  { id: 8, name: 'Utility Bills', type: 'debit', amount: 290, date: '2026-05-08', category: 'Utilities', status: 'failed' },
];
const StatCard = ({ title, value, change, icon, color }: any) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
    <div className="flex items-center justify-between mb-4">
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-xl`}>{icon}</div>
    </div>
    <p className="text-white text-2xl font-bold mb-1">{value}</p>
    <p className={`text-sm ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
      {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
    </p>
  </div>
);
const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const filtered = transactions.filter(t => {
    const matchesFilter = filter === 'all' || t.type === filter;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Transaction Dashboard</h2>
        <p className="text-slate-400 text-sm mt-1">Monitor all your financial transactions</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Balance" value="$48,250" change={12.5} icon="💰" color="bg-blue-600/20" />
        <StatCard title="Monthly Income" value="$9,900" change={8.2} icon="📈" color="bg-emerald-600/20" />
        <StatCard title="Monthly Expenses" value="$3,030" change={-3.1} icon="📉" color="bg-red-600/20" />
        <StatCard title="Pending" value="$3,500" change={5.0} icon="⏳" color="bg-amber-600/20" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="income" stroke="#3b82f6" fill="url(#income)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="url(#expenses)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-slate-400 text-xs">{item.name}</span>
                </div>
                <span className="text-white text-xs font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-slate-800 rounded-xl border border-slate-700">
        <div className="p-6 border-b border-slate-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h3 className="text-white font-semibold">Recent Transactions</h3>
          <div className="flex gap-3 w-full sm:w-auto">
            <input type="text" placeholder="Search transactions..." value={search} onChange={e => setSearch(e.target.value)} className="bg-slate-700 text-white text-sm rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500 flex-1 sm:w-48" />
            <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-slate-700 text-white text-sm rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500">
              <option value="all">All</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Transaction</th>
                <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Category</th>
                <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Date</th>
                <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Status</th>
                <th className="text-right text-slate-400 text-xs font-medium px-6 py-3">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${t.type === 'credit' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        {t.type === 'credit' ? '↓' : '↑'}
                      </div>
                      <span className="text-white text-sm font-medium">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-slate-400 text-sm">{t.category}</span></td>
                  <td className="px-6 py-4"><span className="text-slate-400 text-sm">{t.date}</span></td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${t.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : t.status === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-sm font-bold ${t.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {t.type === 'credit' ? '+' : '-'}${t.amount.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
