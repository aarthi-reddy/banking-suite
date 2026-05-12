import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

const monthlyData = [
  { month: 'Jan', income: 8500, expenses: 6200, savings: 2300 },
  { month: 'Feb', income: 8500, expenses: 5800, savings: 2700 },
  { month: 'Mar', income: 9200, expenses: 6500, savings: 2700 },
  { month: 'Apr', income: 8800, expenses: 7100, savings: 1700 },
  { month: 'May', income: 9900, expenses: 6800, savings: 3100 },
  { month: 'Jun', income: 10200, expenses: 7200, savings: 3000 },
];

const initialCategories = [
  { id: 1, name: 'Housing', budget: 2000, spent: 1800, icon: '🏠', color: '#3b82f6' },
  { id: 2, name: 'Food & Dining', budget: 800, spent: 650, icon: '🍔', color: '#8b5cf6' },
  { id: 3, name: 'Transportation', budget: 500, spent: 420, icon: '🚗', color: '#10b981' },
  { id: 4, name: 'Healthcare', budget: 300, spent: 180, icon: '🏥', color: '#f59e0b' },
  { id: 5, name: 'Entertainment', budget: 400, spent: 520, icon: '🎬', color: '#ef4444' },
  { id: 6, name: 'Savings', budget: 1500, spent: 1500, icon: '💰', color: '#06b6d4' },
];

const Budget: React.FC = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', budget: '', icon: '💳' });
  const [monthlyIncome, setMonthlyIncome] = useState(9900);

  const totalBudget = categories.reduce((s, c) => s + c.budget, 0);
  const totalSpent = categories.reduce((s, c) => s + c.spent, 0);
  const remaining = monthlyIncome - totalSpent;
  const savingsRate = ((remaining / monthlyIncome) * 100).toFixed(1);

  const pieData = categories.map(c => ({ name: c.name, value: c.spent }));

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.budget) return;
    const cat = {
      id: categories.length + 1,
      name: newCategory.name,
      budget: Number(newCategory.budget),
      spent: 0,
      icon: newCategory.icon,
      color: COLORS[categories.length % COLORS.length],
    };
    setCategories([...categories, cat]);
    setNewCategory({ name: '', budget: '', icon: '💳' });
    setShowModal(false);
  };

  const handleSpentChange = (id: number, value: string) => {
    setCategories(categories.map(c =>
      c.id === id ? { ...c, spent: Number(value) } : c
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Budget Tracker</h2>
          <p className="text-slate-400 text-sm mt-1">Monitor and control your spending</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Add Category
        </button>
      </div>

      {/* Income Input */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-slate-400 text-sm">Monthly Income</p>
            <p className="text-white text-3xl font-bold mt-1">${monthlyIncome.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-slate-400 text-sm">Update Income:</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={e => setMonthlyIncome(Number(e.target.value))}
              className="bg-slate-700 text-white text-sm rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500 w-36"
            />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Budget</p>
          <p className="text-white text-2xl font-bold mt-2">${totalBudget.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Spent</p>
          <p className="text-red-400 text-2xl font-bold mt-2">${totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Remaining</p>
          <p className={`text-2xl font-bold mt-2 ${remaining >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ${remaining.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Savings Rate</p>
          <p className={`text-2xl font-bold mt-2 ${Number(savingsRate) >= 20 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {savingsRate}%
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Income vs Expenses Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
              <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Budget Categories</h3>
        <div className="space-y-4">
          {categories.map(c => {
            const percentage = Math.min((c.spent / c.budget) * 100, 100);
            const isOver = c.spent > c.budget;
            return (
              <div key={c.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.icon}</span>
                    <span className="text-white text-sm font-medium">{c.name}</span>
                    {isOver && (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">Over Budget!</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-xs">Spent:</span>
                    <input
                      type="number"
                      value={c.spent}
                      onChange={e => handleSpentChange(c.id, e.target.value)}
                      className="bg-slate-700 text-white text-xs rounded px-2 py-1 border border-slate-600 focus:outline-none focus:border-blue-500 w-24"
                    />
                    <span className="text-slate-400 text-xs">/ ${c.budget.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: isOver ? '#ef4444' : c.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 w-full max-w-sm mx-4">
            <h3 className="text-white font-semibold text-lg mb-4">Add Budget Category</h3>
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Shopping"
                  value={newCategory.name}
                  onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full bg-slate-700 text-white text-sm rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Monthly Budget ($)</label>
                <input
                  type="number"
                  placeholder="500"
                  value={newCategory.budget}
                  onChange={e => setNewCategory({ ...newCategory, budget: e.target.value })}
                  className="w-full bg-slate-700 text-white text-sm rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Icon (emoji)</label>
                <input
                  type="text"
                  placeholder="💳"
                  value={newCategory.icon}
                  onChange={e => setNewCategory({ ...newCategory, icon: e.target.value })}
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
                onClick={handleAddCategory}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
