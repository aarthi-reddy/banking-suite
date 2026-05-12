import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const loanChartData = [
  { month: 'Jan', disbursed: 120000, repaid: 85000 },
  { month: 'Feb', disbursed: 150000, repaid: 95000 },
  { month: 'Mar', disbursed: 130000, repaid: 110000 },
  { month: 'Apr', disbursed: 170000, repaid: 120000 },
  { month: 'May', disbursed: 160000, repaid: 130000 },
  { month: 'Jun', disbursed: 190000, repaid: 145000 },
];

const initialLoans = [
  { id: 'LN001', applicant: 'Aarthi Reddy', type: 'Home Loan', amount: 250000, interest: 6.5, tenure: 20, paid: 45000, status: 'active', date: '2024-01-15' },
  { id: 'LN002', applicant: 'Rahul Sharma', type: 'Car Loan', amount: 35000, interest: 8.2, tenure: 5, paid: 12000, status: 'active', date: '2024-03-10' },
  { id: 'LN003', applicant: 'Priya Patel', type: 'Personal Loan', amount: 15000, interest: 10.5, tenure: 3, paid: 15000, status: 'completed', date: '2023-06-01' },
  { id: 'LN004', applicant: 'David Johnson', type: 'Education Loan', amount: 50000, interest: 7.0, tenure: 10, paid: 8000, status: 'active', date: '2024-05-20' },
  { id: 'LN005', applicant: 'Sarah Williams', type: 'Business Loan', amount: 100000, interest: 9.0, tenure: 7, paid: 0, status: 'pending', date: '2026-05-01' },
  { id: 'LN006', applicant: 'Mike Chen', type: 'Home Loan', amount: 320000, interest: 6.8, tenure: 25, paid: 0, status: 'rejected', date: '2026-04-15' },
];

const loanTypes = ['Home Loan', 'Car Loan', 'Personal Loan', 'Education Loan', 'Business Loan'];

const Loans: React.FC = () => {
  const [loans, setLoans] = useState(initialLoans);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [newLoan, setNewLoan] = useState({
    applicant: '', type: 'Home Loan', amount: '', interest: '', tenure: '',
  });

  const filtered = loans.filter(l => {
    const matchFilter = filter === 'all' || l.status === filter;
    const matchSearch = l.applicant.toLowerCase().includes(search.toLowerCase()) ||
      l.type.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalDisbursed = loans.reduce((s, l) => s + l.amount, 0);
  const totalRepaid = loans.reduce((s, l) => s + l.paid, 0);
  const activeLoans = loans.filter(l => l.status === 'active').length;
  const pendingLoans = loans.filter(l => l.status === 'pending').length;

  const handleAddLoan = () => {
    if (!newLoan.applicant || !newLoan.amount) return;
    const loan = {
      id: `LN00${loans.length + 1}`,
      applicant: newLoan.applicant,
      type: newLoan.type,
      amount: Number(newLoan.amount),
      interest: Number(newLoan.interest) || 7.0,
      tenure: Number(newLoan.tenure) || 5,
      paid: 0,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    setLoans([...loans, loan]);
    setNewLoan({ applicant: '', type: 'Home Loan', amount: '', interest: '', tenure: '' });
    setShowModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      case 'pending': return 'bg-amber-500/20 text-amber-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Loan Management</h2>
          <p className="text-slate-400 text-sm mt-1">Track and manage all loan applications</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + New Loan
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Disbursed</p>
          <p className="text-white text-2xl font-bold mt-2">${totalDisbursed.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Repaid</p>
          <p className="text-emerald-400 text-2xl font-bold mt-2">${totalRepaid.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Active Loans</p>
          <p className="text-blue-400 text-2xl font-bold mt-2">{activeLoans}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Pending Approval</p>
          <p className="text-amber-400 text-2xl font-bold mt-2">{pendingLoans}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Disbursed vs Repaid (6 Months)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={loanChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
            <Bar dataKey="disbursed" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Disbursed" />
            <Bar dataKey="repaid" fill="#10b981" radius={[4, 4, 0, 0]} name="Repaid" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search loans..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-slate-800 text-white text-sm rounded-lg px-4 py-2 border border-slate-700 focus:outline-none focus:border-blue-500 flex-1 min-w-48"
        />
        {['all', 'active', 'pending', 'completed', 'rejected'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === s ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Loans Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Loan ID</th>
              <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Applicant</th>
              <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Type</th>
              <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Interest</th>
              <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Tenure</th>
              <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Status</th>
              <th className="text-right text-slate-400 text-xs font-medium px-6 py-3">Amount</th>
              <th className="text-right text-slate-400 text-xs font-medium px-6 py-3">Paid</th>
              <th className="text-right text-slate-400 text-xs font-medium px-6 py-3">Remaining</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {filtered.map(l => (
              <tr key={l.id} className="hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4 text-blue-400 text-sm font-mono">{l.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {l.applicant.charAt(0)}
                    </div>
                    <span className="text-white text-sm">{l.applicant}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm">{l.type}</td>
                <td className="px-6 py-4 text-slate-400 text-sm">{l.interest}%</td>
                <td className="px-6 py-4 text-slate-400 text-sm">{l.tenure} yrs</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(l.status)}`}>
                    {l.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-white text-sm">${l.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-emerald-400 text-sm">${l.paid.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-red-400 text-sm font-bold">
                  ${(l.amount - l.paid).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Loan Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 w-full max-w-md mx-4">
            <h3 className="text-white font-semibold text-lg mb-4">New Loan Application</h3>
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Applicant Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={newLoan.applicant}
                  onChange={e => setNewLoan({ ...newLoan, applicant: e.target.value })}
                  className="w-full bg-slate-700 text-white text-sm rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Loan Type</label>
                <select
                  value={newLoan.type}
                  onChange={e => setNewLoan({ ...newLoan, type: e.target.value })}
                  className="w-full bg-slate-700 text-white text-sm rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                >
                  {loanTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Amount ($)</label>
                <input
                  type="number"
                  placeholder="100000"
                  value={newLoan.amount}
                  onChange={e => setNewLoan({ ...newLoan, amount: e.target.value })}
                  className="w-full bg-slate-700 text-white text-sm rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Interest Rate (%)</label>
                <input
                  type="number"
                  placeholder="7.5"
                  value={newLoan.interest}
                  onChange={e => setNewLoan({ ...newLoan, interest: e.target.value })}
                  className="w-full bg-slate-700 text-white text-sm rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Tenure (Years)</label>
                <input
                  type="number"
                  placeholder="10"
                  value={newLoan.tenure}
                  onChange={e => setNewLoan({ ...newLoan, tenure: e.target.value })}
                  className="w-full bg-slate-700 text-white text-sm rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLoan}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;