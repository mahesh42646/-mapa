'use client';
import { useState } from 'react';
import { useAuth } from './context/AuthContext';

export default function Staff() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock staff data
  const mockStaff = [
    {
      id: 1,
      name: 'Carson Darrin',
      nickname: 'Carson',
      phone: '(83) 9 9999-9999',
      createdAt: '2024-02-06T03:42:00',
      status: 'Ativo',
      image: '/images/placeholder-Avatar.png',
    },
    {
      id: 2,
      name: 'Fran Perez',
      nickname: 'Fran',
      phone: '(83) 9 9999-9999',
      createdAt: '2024-01-31T21:58:00',
      status: 'Ativo',
      image: '/images/placeholder-Avatar.png',
    },
    {
      id: 3,
      name: 'Jie Yan Song',
      nickname: 'Yan',
      phone: '(83) 9 9999-9999',
      createdAt: '2024-01-11T03:23:00',
      status: 'Ativo',
      image: '/images/placeholder-Avatar.png',
    },
    {
      id: 4,
      name: 'Miron Vitold',
      nickname: 'Miron',
      phone: '(83) 9 9999-9999',
      createdAt: '2024-02-03T04:19:00',
      status: 'Ativo',
      image: '/images/placeholder-Avatar.png',
    },
    {
      id: 5,
      name: 'Penjani Ineyn',
      nickname: 'Ineyn',
      phone: '(83) 9 9999-9999',
      createdAt: '2024-01-17T08:42:00',
      status: 'Inativo',
      image: '/images/placeholder-Avatar.png',
    },
    {
      id: 6,
      name: 'Iulia Albu',
      nickname: 'Iulia',
      phone: '(83) 9 9999-9999',
      createdAt: '2024-01-21T17:45:00',
      status: 'Inativo',
      image: '/images/placeholder-Avatar.png',
    },
  ];

  // Filtering
  const filteredStaff = mockStaff.filter(staff => {
    const term = searchTerm.toLowerCase();
    const matchesTab =
      activeTab === 'all' ? true :
      activeTab === 'actives' ? staff.status === 'Ativo' :
      staff.status === 'Inativo';
    return (
      matchesTab &&
      (staff.name.toLowerCase().includes(term) ||
        staff.nickname.toLowerCase().includes(term) ||
        staff.phone.toLowerCase().includes(term))
    );
  });

  // Tab counts
  const allCount = mockStaff.length;
  const activesCount = mockStaff.filter(s => s.status === 'Ativo').length;
  const inactivesCount = mockStaff.filter(s => s.status === 'Inativo').length;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStaff.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="h4">Staff</div>
        <button className="btn" style={{ background: '#7C3AED', color: '#fff', fontWeight: 600, borderRadius: 8 }}>
          + New staff
        </button>
      </div>
      <div className="p-3" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px 0 rgba(44, 62, 80, 0.08)' }}>

      <div className="d-flex align-items-center mb-2 gap-3">
        <div className="d-flex gap-2">
          <button className={`tab-btn${activeTab === 'all' ? ' active' : ''}`} onClick={() => setActiveTab('all')}>All <span className="tab-badge">{allCount}</span></button>
          <button className={`tab-btn${activeTab === 'actives' ? ' active' : ''}`} onClick={() => setActiveTab('actives')}>Actives <span className="tab-badge">{activesCount}</span></button>
          <button className={`tab-btn${activeTab === 'inactives' ? ' active' : ''}`} onClick={() => setActiveTab('inactives')}>Inactive <span className="tab-badge">{inactivesCount}</span></button>
        </div>
        <div className="ms-auto d-flex gap-2">
          <input
            type="text"
            className="form-control"
            style={{ width: 350, minWidth: 350, maxWidth: 350, borderRadius: 8, flexShrink: 0 }}
            placeholder="Staff search by name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-secondary">Limpar filtros</button>
        </div>
      </div>
      <div className="table-responsive mt-2">
        <table className="table align-middle mb-0">
          <thead style={{ background: '#F5F6FA' }}>
            <tr style={{ color: '#6B7280', fontWeight: 600, fontSize: 15 }}>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Criado em</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((staff, idx) => (
              <tr key={staff.id} style={{ background: idx % 2 === 1 ? '#FAFAFB' : '#fff' }}>
                <td>
                  <div className="d-flex align-items-center">
                    <img src={staff.image} alt={staff.name} className="rounded-circle me-3 border" width="40" height="40" style={{ objectFit: 'cover' }} />
                    <div>
                      <div className="fw-bold" style={{ fontSize: 15 }}>{staff.name}</div>
                      <div className="text-muted" style={{ fontSize: 13 }}>{staff.nickname}</div>
                    </div>
                  </div>
                </td>
                <td>{staff.phone}</td>
                <td>{formatDate(staff.createdAt)}</td>
                <td>
                  <span className="d-inline-flex align-items-center px-3 py-1 rounded fw-semibold" style={{ fontSize: 14, border: '1.5px solid rgb(180, 181, 184)', gap: 6, background: staff.status === 'Inativo' ? '' : '', color: staff.status === 'Inativo' ? '#FFB020' : '#13C38B' }}>
                    <i className="bi bi-patch-check-fill" style={{ fontSize: 16 }}></i>
                    {staff.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-light p-0 d-flex align-items-center justify-content-center rounded-circle " style={{ width: 36, height: 36, background: '#fff' }}>
                      <i className="bi bi-pencil" style={{ color: '#6B7280', fontSize: 18 }}></i>
                    </button>
                    <button className="btn btn-light p-0 d-flex align-items-center justify-content-center rounded-circle " style={{ width: 36, height: 36, background: '#fff' }}>
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
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex align-items-center">
          <span>Linhas por página: </span>
          <select
            className="form-select form-select-sm d-inline-block border-0 w-auto ms-1 me-4"
            value={itemsPerPage}
            onChange={e => setItemsPerPage(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div>
          {filteredStaff.length === 0 ? (
            <span>0 de 0</span>
          ) : (
            <>
              {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredStaff.length)} de {filteredStaff.length}
              <button
                className="btn btn-sm btn-link"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                className="btn btn-sm btn-link"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
} 