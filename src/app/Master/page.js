'use client';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/masterDashboard';
import CitiesPage from './components/CitiesPage';
import { AuthProvider } from './context/AuthContext';
import './master.css';

export default function MasterPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <>
    <AuthProvider>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ marginTop: '100px', minHeight: '80dvh' }}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'cities' && (   <CitiesPage />  )}
      </main>
      <Footer />
      </AuthProvider>
    </>
  );
}