'use client';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/painalDashboard';
import CitiesPage from './components/CitiesPage';
import CulturalAgents from './components/CulturalAgents';
import CulturalSpaces from './components/CulturalSpaces';
import CulturalProjects from './components/CulturalProjects';
import Staff from './components/Staff';
import Bids from './components/Bids';
import Proposals from './components/Proposals';
import { AuthProvider } from './components/context/AuthContext';
import '../Master/master.css';

export default function PainalPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <>
    <AuthProvider>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ marginTop: '100px', minHeight: '80dvh' }}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'cities' && <CitiesPage />}
        {activeTab === 'agents' && <CulturalAgents />}
        {activeTab === 'spaces' && <CulturalSpaces />}
        {activeTab === 'projects' && <CulturalProjects />}
        {activeTab === 'staff' && <Staff />}
        {activeTab === 'bids' && <Bids />}
        {activeTab === 'proposals' && <Proposals />}
      </main>
      <Footer />
      </AuthProvider>
    </>
  );
}
