import React, { useState } from 'react';
import './App.css';

// Pages
import Dashboard from './components/Dashboard';
import Payroll from './components/Payroll';
import Loans from './components/Loans';
import Budget from './components/Budget';
import Sidebar from './components/Sidebar';

export type Page = 'dashboard' | 'payroll' | 'loans' | 'budget';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'payroll': return <Payroll />;
      case 'loans': return <Loans />;
      case 'budget': return <Budget />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 overflow-y-auto p-6">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;