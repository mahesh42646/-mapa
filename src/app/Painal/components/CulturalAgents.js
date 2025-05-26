'use client';
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import './CulturalAgents.css';

export default function CulturalAgents() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data based on the image
  const mockAgents = [
    {
      id: 1,
      name: 'Carson Darrin',
      nickname: 'Carson',
      type: 'MEI',
      telephone: '(83) 9 9999-9999',
      verified: true,
      status: 'Ativo',
      image: '/images/placeholder-Avatar.png',
      avatarBg: '',
    },
    {
      id: 2,
      name: 'Fran Perez',
      nickname: 'Fran',
      type: 'Pessoa Jurídica Sem Fins Lucrativos',
      telephone: '(83) 9 9999-9999',
      verified: false,
      status: 'Ativo',
      image: '/images/placeholder-Avatar.png',
      avatarBg: '',
    },
    {
      id: 3,
      name: 'Rushikesh Darkunde',
      nickname: 'Rushi',
      type: 'Pessoa Física',
      telephone: '(83) 9 9999-9999',
      verified: true,
      status: 'Ativo',
      image: '',
      avatarBg: '#E5E7EB',
      initials: 'R',
    },
    {
      id: 4,
      name: 'Mahesh',
      nickname: 'Mahesh',
      type: 'Pessoa Jurídica Com Fins Lucrativos',
      telephone: '(83) 9 9999-9999',
      verified: true,
      status: 'Ativo',
      image: '',
      avatarBg: '#FFF7E6',
      initials: 'M',
    },
    {
      id: 5,
      name: 'Jie Yan Song',
      nickname: 'Yan',
      type: 'Coletivo sem CNPJ',
      telephone: '(83) 9 9999-9999',
      verified: false,
      status: 'Ativo',
      image: '',
      avatarBg: '#FFF7E6',
      initials: 'Y',
    }
  ];

  const tabBtnHover = {
    background: '#F5F6FA',
    cursor: 'pointer'
  };

  const filteredAgents = mockAgents.filter(agent => {
    const term = searchTerm.toLowerCase();
    return (
      agent.name.toLowerCase().includes(term) ||
      agent.nickname.toLowerCase().includes(term) ||
      agent.type.toLowerCase().includes(term) ||
      agent.telephone.toLowerCase().includes(term) ||
      (agent.verified ? 'yes' : 'no').includes(term) ||
      agent.status.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container py-4">
 <div className='d-flex justify-content-between mb-4'>
                <div className="h4">
                List of Cultural Agents
                </div>
                {/* <button className='btn mt-2 text-gray  border px-4 rounded-3'
                    style={{ background: '#635BFF', color: '#fff' }}
                    onClick={() => { setEditCityId(null); setShowModal(true); }}
                >
                    + New City
                </button> */}
            </div>      <div className="mb-3"></div>
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
              All <span className="tab-badge">485</span>
            </button>
            <button
              className={`tab-btn${activeTab === 'actives' ? ' active' : ''} ${activeTab !== 'actives' ? 'text-secondary' : ''}`}
              onMouseEnter={() => setHoveredTab('actives')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab('actives')}
            >
              Actives <span className="tab-badge">482</span>
            </button>
            <button
              className={`tab-btn${activeTab === 'inactives' ? ' active' : ''} ${activeTab !== 'inactives' ? 'text-secondary' : ''}`}
              onMouseEnter={() => setHoveredTab('inactives')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => setActiveTab('inactives')}
            >
              Inactives <span className="tab-badge">3</span>
            </button>
          </div>
          <div style={{ width: 400 }}>
            <input
              type="text"
              className="form-control rounded px-4"
              placeholder="Search for Cultural Agent by name, CPF or CNPJ..."
              style={{ border: '1.5px solid #E5E7EB', fontSize: 15 }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {/* Table */}
        <div className="table-responsive mt-2">
          <table className=" w-100  mb-0" style={{ overflow: 'hidden' }}>
            <thead style={{ background: '#F5F6FA' }}>
              <tr style={{ color: '#6B7280', fontWeight: 600, fontSize: 15 }}>
                <th style={{ border: 'none', padding: '16px 12px' }}>Name</th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Agent type <i className="bi bi-chevron-down"></i></th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Telephone</th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Verified</th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Status</th>
                <th style={{ border: 'none', padding: '16px 12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.map((agent, idx) => (
                <tr key={agent.id} style={{ background: idx % 2 === 1 ? '#FAFAFB' : '#fff', borderRadius: 12 }}>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>
                    <div className="d-flex align-items-center">
                      {agent.image ? (
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="rounded-circle me-3 border"
                          width="40"
                          height="40"
                          style={{ objectFit: 'cover', background: agent.avatarBg || 'transparent', border: '2px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
                        />
                      ) : (
                        <div className="rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, background: agent.avatarBg, color: '#888', fontWeight: 700, fontSize: 18, border: '2px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                          {agent.initials || '?'}
                        </div>
                      )}
                      <div>
                        <div className="fw-bold" style={{ fontSize: 15 }}>{agent.name}</div>
                        <div className="text-muted" style={{ fontSize: 13 }}>{agent.nickname}</div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle" style={{ fontSize: 14, color: '#6B7280', padding: '14px 12px' }}>{agent.type}</td>
                  <td className="align-middle" style={{ fontSize: 14, color: '#6B7280', padding: '14px 12px' }}>{agent.telephone}</td>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>
                    <span className={`d-inline-flex align-items-center px-3 py-1 rounded fw-semibold`} style={{   fontSize: 14, border: '1.5px solid rgb(180, 181, 184)', gap: 6 }}>
                      <i className={`bi ${agent.verified ? 'bi-patch-check-fill' : 'bi-patch-exclamation-fill'}`} style={{ fontSize: 16, color: agent.verified ? '#7C3AED' : '#FFB020' }}></i>
                      {agent.verified ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>
                    <span className="d-inline-flex align-items-center px-3 py-1 rounded fw-semibold" style={{  fontSize: 14, border: '1.5px solid rgb(180, 181, 184)', gap: 6 }}>
                      <i className="bi-patch-check-fill" style={{ fontSize: 16, color: '#13C38B' }}></i>
                      Ativo
                    </span>
                  </td>
                  <td className="align-middle" style={{ padding: '14px 12px' }}>
                    <div className="d-flex align-items-center gap-2 position-relative">
                      <button className="btn btn-light p-0 d-flex align-items-center justify-content-center rounded-circle " style={{ width: 36, height: 36,  background: '#ffff' }}>
                        <i className="bi bi-globe" style={{ color: '#13C38B', fontSize: 18 }}></i>
                      </button>
                      <button className="btn btn-light p-0 d-flex align-items-center justify-content-center rounded-circle " style={{ width: 36, height: 36,  background: '#ffff' }}>
                        <i className="bi bi-pencil" style={{ color: '#6B7280', fontSize: 18 }}></i>
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
            <span style={{ color: '#6B7280', fontSize: 14 }}>Linhas por página</span>
            <select className="form-select me-3 form-select-sm d-inline-block ms-2" style={{ width: 70, fontSize: 14, background: '#F5F6FA', border: '1.5px solid #E5E7EB', borderRadius: 8 }}>
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