'use client';
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import './CulturalAgents.css';

export default function Bids() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data based on the image
  const mockBids = [
    {
      id: 1,
      name: 'REDE MUNICIPAL DE PONTOS DE CULTURA DE GUANAMBI-BAHIA',
      value: 'R$ 164.000,00',
      createdIn: '11/11/2024 17:00',
      closedIn: '18/11/2024 17:00',
      extended: true,
      extendedDate: '25/11/2024 17:00',
      status: 'Ativo'
    },
    {
      id: 2,
      name: 'EDITAL DE SUBSÍDIO PARA MANUTENÇÃO DE ESPAÇOS, AMBIENTES E INICIATIVAS ARTÍSTICO-CULTURAIS',
      value: 'R$ 15.687.095,00',
      createdIn: '11/11/2024 17:00',
      closedIn: '18/11/2024 17:00',
      extended: false,
      status: 'Ativo'
    },
    {
      id: 3,
      name: 'EDITAL DA PNAB MUSICAL E DE REISADO',
      value: 'R$ 100.000,00',
      createdIn: '11/11/2024 17:00',
      closedIn: '18/11/2024 17:00',
      extended: true,
      extendedDate: '25/11/2024 17:00',
      status: 'Ativo'
    },
    {
      id: 4,
      name: 'EDITAL CULTURAL MULTILINGUAGEM',
      value: 'R$ 104.000,00',
      createdIn: '11/11/2024 17:00',
      closedIn: '18/11/2024 17:00',
      extended: false,
      status: 'Ativo'
    }
  ];

  const filteredBids = mockBids.filter(bid => {
    const term = searchTerm.toLowerCase();
    return (
      bid.name.toLowerCase().includes(term) ||
      bid.value.toLowerCase().includes(term) ||
      bid.createdIn.toLowerCase().includes(term) ||
      (bid.closedIn && bid.closedIn.toLowerCase().includes(term)) ||
      (bid.extendedDate && bid.extendedDate.toLowerCase().includes(term)) ||
      bid.status.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container py-4">
      <div className='d-flex justify-content-between mb-4'>
        <div className="h4">
          List of bidding processes
        </div>
        <button className='btn mt-2 text-gray border px-4 rounded-3'
          style={{ background: '#635BFF', color: '#fff' }}
          onClick={() => {}}>
          + New Process
        </button>
      </div>
      <div className="mb-3"></div>
      <div className="p-3" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px 0 rgba(44, 62, 80, 0.08)' }}>
        {/* Tabs and Search */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex gap-2">
            <button
              className={`tab-btn${activeTab === 'all' ? ' active' : ''} ${activeTab !== 'all' ? 'text-secondary' : ''}`}
              onMouseEnter={() => setHoveredTab('all')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab('all')}
            >
              All <span className="tab-badge">04</span>
            </button>
            <button
              className={`tab-btn${activeTab === 'actives' ? ' active' : ''} ${activeTab !== 'actives' ? 'text-secondary' : ''}`}
              onMouseEnter={() => setHoveredTab('actives')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab('actives')}
            >
              Actives <span className="tab-badge">04</span>
            </button>
            <button
              className={`tab-btn${activeTab === 'pending' ? ' active' : ''} ${activeTab !== 'pending' ? 'text-secondary' : ''}`}
              onMouseEnter={() => setHoveredTab('pending')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab('pending')}
            >
              Pending <span className="tab-badge">0</span>
            </button>
            <button
              className={`tab-btn${activeTab === 'inactive' ? ' active' : ''} ${activeTab !== 'inactive' ? 'text-secondary' : ''}`}
              onMouseEnter={() => setHoveredTab('inactive')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab('inactive')}
            >
              Inactive <span className="tab-badge">0</span>
            </button>
            <button
              className={`tab-btn${activeTab === 'closed' ? ' active' : ''} ${activeTab !== 'closed' ? 'text-secondary' : ''}`}
              onMouseEnter={() => setHoveredTab('closed')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab('closed')}
            >
              Closed <span className="tab-badge">0</span>
            </button>
          </div>
          <div style={{ width: 400 }}>
            <input
              type="text"
              className="form-control rounded px-4"
              placeholder="Search by process name"
              style={{ border: '1.5px solid #E5E7EB', fontSize: 15 }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* Table */}
        <div className="table-responsive mt-2">
          <table className="w-100 mb-0" style={{ overflow: 'hidden' }}>
            <thead style={{ background: '#F5F6FA' }}>
              <tr style={{ color: '#6B7280', fontWeight: 600, fontSize: 15 }}>
                <th style={{ border: 'none', padding: '16px 12px' }}>Name</th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Created in</th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Closed in</th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Status</th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBids.map((bid, idx) => (
                <tr key={bid.id} style={{ background: idx % 2 === 1 ? '#FAFAFB' : '#fff', borderRadius: 12 }}>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>
                    <div className="fw-bold" style={{ fontSize: 15 }}>{bid.name}</div>
                    <div className="text-muted" style={{ fontSize: 13 }}>Valor do Projeto: {bid.value}</div>
                  </td>
                  <td className="align-middle" style={{ padding: '14px 12px', fontSize: 14 }}>
                    {bid.createdIn}
                  </td>
                  <td className="align-middle" style={{ padding: '14px 12px', fontSize: 14 }}>
                    {bid.extended ? (
                      <>
                        <div className="text-decoration-line-through" style={{ color: '#B0B3B9' }}>{bid.closedIn}</div>
                        <div style={{ color: '#FF3B30', fontWeight: 600 }}>
                          Prorrogado:<br />
                          {bid.extendedDate}
                        </div>
                      </>
                    ) : (
                      bid.closedIn
                    )}
                  </td>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>
                    {bid.status === 'Ativo' && (
                      <span className="d-inline-flex align-items-center px-3 py-1 rounded fw-semibold" style={{ fontSize: 14, border: '1.5px solid #B0B3B9', gap: 6 }}>
                        <i className="bi-patch-check-fill" style={{ fontSize: 16, color: '#13C38B' }}></i>
                        Ativo
                      </span>
                    )}
                  </td>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>
                    <div className="d-flex align-items-center" style={{ gap: 16, position: 'relative' }}>
                      <button className="btn btn-light p-0 d-flex align-items-center justify-content-center rounded-circle" style={{ width: 36, height: 36, background: '#fff' }}>
                        <i className="bi bi-globe" style={{ color: '#7C3AED', fontSize: 18 }}></i>
                      </button>
                      <button className="btn btn-light p-0 d-flex align-items-center justify-content-center rounded-circle" style={{ width: 36, height: 36, background: '#fff' }}>
                        <i className="bi bi-pencil" style={{ color: '#6B7280', fontSize: 18 }}></i>
                      </button>
                      <button className="btn btn-light p-0 d-flex align-items-center justify-content-center rounded-circle" style={{ width: 36, height: 36, background: '#fff' }}>
                        <i className="bi bi-three-dots-vertical" style={{ color: '#6B7280', fontSize: 18 }}></i>
                      </button>
                    </div>
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
            <span style={{ color: '#6B7280', fontSize: 14 }}>1-2 de 2</span>
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