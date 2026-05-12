import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const payrollData = [
  { month: 'Jan', total: 125000 },
  { month: 'Feb', total: 128000 },
  { month: 'Mar', total: 132000 },
  { month: 'Apr', total: 130000 },
  { month: 'May', total: 135000 },
  { month: 'Jun', total: 138000 },
];

const initialEmployees = [
  { id: 1, name: 'Aarthi Reddy', role: 'Software Engineer', department: 'Engineering', salary: 95000, bonus: 5000, tax: 22000, status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Rahul Sharma', role: 'Product Manager', department: 'Product', salary: 110000, bonus: 8000, tax: 26000, status: 'active', joinDate: '2022-06-01' },
  { id: 3, name: 'Priya Patel', role: 'UI/UX Designer', department: 'Design', salary: 85000, bonus: 4000, tax: 19000, status: 'active', joinDate: '2023-03-20' },
  { id: 4, name: 'David Johnson', role: 'Data Analyst', department: 'Analytics', salary: 90000, bonus: 4500, tax: 21000, status: 'active', joinDate: '2022-11-10' },
  { id: 5, name: 'Sarah Williams', role: 'DevOps Engineer', department: 'Engineering', salary: 100000, bonus: 6000, tax: 23000, status: 'inactive', joinDate: '2021-08-05' },
  { id: 6, name: 'Mike Chen', role: 'Backend Developer', department: 'Engineering', salary: 98000, bonus: 5500, tax: 22500, status: 'active', joinDate: '2023-07-12' },
];

const Payroll: React.FC = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState('all');
  const [newEmployee, setNewEmployee] = useState({
    name: '', role: '', department: '', salary: '', bonus: '', tax: '', joinDate: ''
  });

  const departments = ['all', 'Engineering', 'Product', 'Design', 'Analytics'];

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase());
    const matchDept = selectedDept === 'all' || e.department === selectedDept;
    return matchSearch && matchDept;
  });

  const totalPayroll = employees.reduce((sum, e) => sum + e.salary + e.bonus, 0);
  const totalTax = employees.reduce((sum, e) => sum + e.tax, 0);
  const activeCount = employees.filter(e => e.status === 'active').length;

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.role || !newEmployee.salary) return;
    const emp = {
      id: employees.length + 1,
      name: newEmployee.name,
      role: newEmployee.role,
      department: newEmployee.department || 'Engineering',
      salary: Number(newEmployee.salary),
      bonus: Number(newEmployee.bonus) || 0,
      tax: Number(newEmployee.tax) || 0,
      status: 'active',
      joinDate: newEmployee.joinDate || new Date().toISOString().split('T')[0],
    };
    setEmployees([...employees, emp]);
    setNewEmployee({ name: '', role: '', department: '', salary: '', bonus: '', tax: '', joinDate: '' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Employee Payroll</h2>
          <p className="text-slate-400 text-sm mt-1">Manage employee salaries and payments</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Add Employee
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Monthly Payroll</p>
          <p className="text-white text-2xl font-bold mt-2">${totalPayroll.toLocaleString()}</p>
          <p className="text-emerald-400 text-sm mt-1">↑ 3.2% from last month</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Tax Deductions</p>
          <p className="text-white text-2xl font-bold mt-2">${totalTax.toLocaleString()}</p>
          <p className="text-slate-400 text-sm mt-1">Across all employees</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-slate-400 text-sm">Active Employees</p>
          <p className="text-white text-2xl font-bold mt-2">{activeCount}</p>
          <p className="text-slate-400 text-sm mt-1">Out of {employees.length} total</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Payroll Trend (6 Months)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={payrollData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
            <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-slate-800 text-white text-sm rounded-lg px-4 py-2 border border-slate-700 focus:outline-none focus:border-blue-500 flex-1 min-w-48"
        />
        <select
          value={selectedDept}
          onChange={e => setSelectedDept(e.target.value)}
          className="bg-slate-800 text-white text-sm rounded-lg px-4 py-2 border border-slate-700 focus:outline-none focus:border-blue-500"
        >
          {departments.map(d => (
            <option key={d} value={d}>{d === 'all' ? 'All Departments' : d}</option>
          ))}
        </select>
      </div>

      {/* Employee Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Employee</th>
              <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Department</th>
              <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Join Date</th>
              <th className="text-left text-slate-400 text-xs font-medium px-6 py-3">Status</th>
              <th className="text-right text-slate-400 text-xs font-medium px-6 py-3">Salary</th>
              <th className="text-right text-slate-400 text-xs font-medium px-6 py-3">Bonus</th>
              <th className="text-right text-slate-400 text-xs font-medium px-6 py-3">Tax</th>
              <th className="text-right text-slate-400 text-xs font-medium px-6 py-3">Net Pay</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {filtered.map(e => (
              <tr key={e.id} className="hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {e.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{e.name}</p>
                      <p className="text-slate-400 text-xs">{e.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm">{e.department}</td>
                <td className="px-6 py-4 text-slate-400 text-sm">{e.joinDate}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    e.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {e.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-white text-sm">${e.salary.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-emerald-400 text-sm">+${e.bonus.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-red-400 text-sm">-${e.tax.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-blue-400 text-sm font-bold">
                  ${(e.salary + e.bonus - e.tax).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 w-full max-w-md mx-4">
            <h3 className="text-white font-semibold text-lg mb-4">Add New Employee</h3>
            <div className="space-y-3">
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Doe' },
                { label: 'Role', key: 'role', type: 'text', placeholder: 'Software Engineer' },
                { label: 'Department', key: 'department', type: 'text', placeholder: 'Engineering' },
                { label: 'Annual Salary ($)', key: 'salary', type: 'number', placeholder: '90000' },
                { label: 'Bonus ($)', key: 'bonus', type: 'number', placeholder: '5000' },
                { label: 'Tax ($)', key: 'tax', type: 'number', placeholder: '20000' },
                { label: 'Join Date', key: 'joinDate', type: 'date', placeholder: '' },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-slate-400 text-xs mb-1 block">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={(newEmployee as any)[field.key]}
                    onChange={e => setNewEmployee({ ...newEmployee, [field.key]: e.target.value })}
                    className="w-full bg-slate-700 text-white text-sm rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEmployee}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;