import React from 'react';
import { Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Transaction Dashboard', icon: '💳' },
  { id: 'payroll', label: 'Employee Payroll', icon: '👥' },
  { id: 'loans', label: 'Loan Management', icon: '🏦' },
  { id: 'budget', label: 'Budget Tracker', icon: '💰' },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            B
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">BankSuite</h1>
            <p className="text-slate-400 text-xs">Finance Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id as Page)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
              currentPage === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-700">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div>
            <p className="text-white text-sm font-medium">Aarthi Reddy</p>
            <p className="text-slate-400 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;