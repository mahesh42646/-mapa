'use client';
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import './CulturalAgents.css';

export default function Proposals() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('todos');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [protocolTerm, setProtocolTerm] = useState('');
  
  // Mock data based on the image
  const mockProposals = [
    {
      id: 1,
      protocolNo: '102040',
      name: 'ENILSON DA SILVA',
      cnpj: '46713168000145',
      active: 'Pendente',
      proposal: 'Pending',
      selection: 'Pending',
      qualification: 'Pending'
    }
  ];

  const filteredProposals = mockProposals.filter(proposal => {
    const term = searchTerm.toLowerCase();
    const protocol = protocolTerm.toLowerCase();
    return (
      (proposal.protocolNo.toLowerCase().includes(protocol)) &&
      (
        proposal.name.toLowerCase().includes(term) ||
        proposal.cnpj.toLowerCase().includes(term) ||
        proposal.active.toLowerCase().includes(term) ||
        proposal.proposal.toLowerCase().includes(term) ||
        proposal.selection.toLowerCase().includes(term) ||
        proposal.qualification.toLowerCase().includes(term)
      )
    );
  });

  return (
    <div className="container py-4">
      <h1 className="mb-3">List of bidding proposals</h1>
      
      <div className="mb-4">
        <button className="btn ">
          <i className="bi bi-arrow-left me-2"></i> Voltar
        </button>
      </div>
      
      <h2 className="mb-4">Avaliação do projeto</h2>
      <div className='mb-3'></div>
      <div className="p-3" style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 18, boxShadow: '0 4px 24px 0 rgba(44, 62, 80, 0.08)' }}>
        {/* Filter controls and Tabs */}
        <div className="d-flex flex-wrap align-items-center mb-2 gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Protocol No."
            style={{ width: 120, border: '1.5px solid #E5E7EB', fontSize: 15 }}
            value={protocolTerm}
            onChange={e => setProtocolTerm(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar edital por nome"
            style={{ width: 320, border: '1.5px solid #E5E7EB', fontSize: 15 }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="d-flex gap-2 ms-auto">
            <button
              className={`tab-btn${activeTab === 'active' ? ' active' : ''} ${activeTab !== 'active' ? 'text-secondary' : ''}`}
              onMouseEnter={() => setHoveredTab('active')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab('active')}
            >
              Active <span className="tab-badge">04</span>
            </button>
            <button
              className={`tab-btn${activeTab === 'proposal' ? ' active' : ''} ${activeTab !== 'proposal' ? 'text-secondary' : ''}`}
              onMouseEnter={() => setHoveredTab('proposal')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab('proposal')}
            >
              Proposal <span className="tab-badge">0</span>
            </button>
            <button
              className={`tab-btn${activeTab === 'selection' ? ' active' : ''} ${activeTab !== 'selection' ? 'text-secondary' : ''}`}
              onMouseEnter={() => setHoveredTab('selection')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab('selection')}
            >
              Selection <span className="tab-badge">0</span>
            </button>
            <button
              className={`tab-btn${activeTab === 'qualification' ? ' active' : ''} ${activeTab !== 'qualification' ? 'text-secondary' : ''}`}
              onMouseEnter={() => setHoveredTab('qualification')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab('qualification')}
            >
              Qualification <span className="tab-badge">0</span>
            </button>
            <button
              className={`tab-btn${activeTab === 'todos' ? ' active' : ''} ${activeTab !== 'todos' ? 'text-secondary' : ''}`}
              onMouseEnter={() => setHoveredTab('todos')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab('todos')}
            >
              Todos <span className="tab-badge">04</span>
            </button>
          </div>
        </div>
        {/* Table */}
        <div className="table-responsive mt-4">
          <table className="w-100 mb-0" style={{ overflow: 'hidden' }}>
            <thead style={{ background: '#F5F6FA' }}>
              <tr style={{ color: '#6B7280', fontWeight: 600, fontSize: 15 }}>
                <th style={{ border: 'none', padding: '16px 12px' }}>Protocol No.</th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Proposal</th>
                <th style={{ border: 'none', padding: '16px 12px' }}></th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Active</th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Proposal</th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Selection</th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Qualification</th>
                <th style={{ border: 'none', padding: '16px 12px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredProposals.map((proposal, idx) => (
                <tr key={proposal.id} style={{ background: idx % 2 === 1 ? '#FAFAFB' : '#fff', borderRadius: 12 }}>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>{proposal.protocolNo}</td>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>
                    <div className="fw-bold" style={{ fontSize: 15 }}>{proposal.name}</div>
                    <div className="text-muted" style={{ fontSize: 13 }}>CNPJ: {proposal.cnpj}</div>
                  </td>
                  <td  style={{ padding: '14px 12px' }}></td>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>{proposal.active}</td>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>{proposal.proposal}</td>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>{proposal.selection}</td>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>{proposal.qualification}</td>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>
                    <button className="btn btn-light px-4 py-2 rounded-3" style={{ border: '1.5px solid #B0B3B9',  fontSize: 15 }}>
                      <i className="bi bi-pencil me-2"></i> Evaluate proposal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="d-flex justify-content-end align-items-center px-2 py-3 mt-1" style={{ borderTop: '1.5px solid #F0F1F3', borderRadius: '0 0 16px 16px', background: '#fff' }}>
          <div>
            <span style={{ color: '#6B7280', fontSize: 14 }}>Lines per page</span>
            <select className="me-3 form-select form-select-sm d-inline-block ms-2" style={{ width: 70, fontSize: 14, background: '#F5F6FA', border: '1.5px solid #E5E7EB', borderRadius: 8 }}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span style={{ color: '#6B7280', fontSize: 14 }}>1 de 485</span>
            <button className="btn btn-light p-0 d-flex align-items-center justify-content-center rounded-circle border" style={{ width: 32, height: 32, border: '1.5px solid #E5E7EB' }}>
              <i className="bi bi-chevron-left" style={{ fontSize: 18, color: '#7C3AED' }}></i>
            </button>
            <button className="btn btn-light p-0 d-flex align-items-center justify-content-center rounded-circle border" style={{ width: 32, height: 32, border: '1.5px solid #E5E7EB' }}>
              <i className="bi bi-chevron-right" style={{ fontSize: 18, color: '#7C3AED' }}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 