'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';
import axios from 'axios';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profilePhoto, setProfilePhoto] = useState('');

  useEffect(() => {
    // Initialize Bootstrap JS when component mounts
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  useEffect(() => {
    if (user?.avatar) {
      setProfilePhoto(`http://localhost:5004${user.avatar}`);
    }
  }, [user]);

  if (loading) return null;
  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <h3>Login to access this</h3>
      </div>
    );
  }

  // Format the name to show FirstName MiddleInitial
  const formatName = (fullName) => {
    if (!fullName) return 'User';

    const nameParts = fullName.split(' ');
    if (nameParts.length === 1) return nameParts[0];

    // First name + middle initial
    return `${nameParts[0]} ${nameParts[1].charAt(0)}`;
  };

  return (
    <>
      <div className='Dashboard container d-lg-flex py-4'>
        <div className='d-lg-flex gap-3 pe-lg-3 col-lg-8'>
          <div className='p-4 w-100 rounded-3 shadow bg-lite-green'>
            <div className='w-100 d-flex'>
              <div className='col-8'>
                <div className='text-green-600' style={{ fontSize: "28px", fontWeight: "800" }}>
                  Bem vindo de volta 👋
                  <div className="mb-0">{formatName(user.name)}.</div>
                </div>
                <p className='pt-4 text-green-600'>Gerenciar sua cidade cultural nunca foi tão fácil!</p>
              </div>
              <div className='col-4 d-flex'>
                <img src='./images/dashboard-vector.png' alt="dashboard" className="w-100 m-auto ps-2" />
              </div>
            </div>
          </div>
        </div>
        
        <div className='py-4 px-3 rounded-3 shadow bg-gray-50 col-lg-4 d-flex flex-column'>
          <div className='w-100 d-flex'>
            <div className='p-3 rounded-circle' style={{ height: "100px", width: "100px" }}>
              <img src={profilePhoto || './images/citi-icon.png'} alt='City' className='shadow w-100 rounded-circle p-2' />
            </div>
            <div className='col-9 h-100 d-flex'>
              <div className='my-auto px-4'>
                <h5>My City</h5>
                <h2>{user.cityName || 'Loading...'}</h2>
              </div>
            </div>
          </div>
          <div className='w-100 d-flex border-top'>
            <div className='px-4 pt-3'>
              <i className="bi bi-person-fill text-primary pe-2"></i> 
              Created by: {user.createdByName || 'Admin'}
            </div>
            <div className='px-4 pt-3'>
              <i className="bi bi-check-circle text-success pe-2"></i>
              {user.cityStatus || 'Ativo'}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics and Chart Section */}
      <div className="container mt-4 mb-4">
        <div className="row g-4">
          {/* Stat Cards */}
          <div className="col-md-4">
            <div className="bg-white rounded-4 shadow p-4 position-relative h-100" style={{ minHeight: 170 }}>
              <div className="d-flex align-items-center mb-2">
                <span style={{ background: '#F5F6FA', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                  <i className="bi bi-person" style={{ fontSize: 22, color: '#7C3AED' }}></i>
                </span>
                <span style={{ fontWeight: 600, fontSize: 16 }}>Cultural Agents</span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>1.200</div>
              <hr style={{ margin: '10px 0 8px 0', borderColor: '#D1D5DB' }} />
              <div className="d-flex justify-content-between align-items-center" style={{ fontSize: 15 }}>
                <span style={{ color: '#13C38B', fontWeight: 500 }}>
                  <i className="bi bi-arrow-up-right" style={{ fontSize: 16, color: '#13C38B', marginRight: 4, verticalAlign: 'middle' }}></i>
                  1,190 Actives
                </span>
                <span style={{ color: '#FF3B30', fontWeight: 500 }}>
                  <i className="bi bi-arrow-down-right" style={{ fontSize: 16, color: '#FF3B30', marginRight: 4, verticalAlign: 'middle' }}></i>
                  10 Inactive
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white rounded-4 shadow p-4 position-relative h-100" style={{ minHeight: 170 }}>
              <div className="d-flex align-items-center mb-2">
                <span style={{ background: '#F5F6FA', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                  <i className="bi bi-bank" style={{ fontSize: 22, color: '#7C3AED' }}></i>
                </span>
                <span style={{ fontWeight: 600, fontSize: 16 }}>Cultural Spaces</span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>35</div>
              <hr style={{ margin: '10px 0 8px 0', borderColor: '#D1D5DB' }} />
              <div className="d-flex justify-content-between align-items-center" style={{ fontSize: 15 }}>
                <span style={{ color: '#13C38B', fontWeight: 500 }}>
                  <i className="bi bi-arrow-up-right" style={{ fontSize: 16, color: '#13C38B', marginRight: 4, verticalAlign: 'middle' }}></i>
                  35 Actives
                </span>
                <span style={{ color: '#FF3B30', fontWeight: 500 }}>
                  <i className="bi bi-arrow-down-right" style={{ fontSize: 16, color: '#FF3B30', marginRight: 4, verticalAlign: 'middle' }}></i>
                  0 Inactive
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white rounded-4 shadow p-4 position-relative h-100" style={{ minHeight: 170 }}>
              <div className="d-flex align-items-center mb-2">
                <span style={{ background: '#F5F6FA', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                  <i className="bi bi-briefcase" style={{ fontSize: 22, color: '#7C3AED' }}></i>
                </span>
                <span style={{ fontWeight: 600, fontSize: 16 }}>Cultural Projects</span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>425</div>
              <hr style={{ margin: '10px 0 8px 0', borderColor: '#D1D5DB' }} />
              <div className="d-flex justify-content-between align-items-center" style={{ fontSize: 15 }}>
                <span style={{ color: '#13C38B', fontWeight: 500 }}>
                  <i className="bi bi-arrow-up-right" style={{ fontSize: 16, color: '#13C38B', marginRight: 4, verticalAlign: 'middle' }}></i>
                  421 Actives
                </span>
                <span style={{ color: '#FFB020', fontWeight: 500 }}>
                  <i className="bi bi-arrow-down-right" style={{ fontSize: 16, color: '#FFB020', marginRight: 4, verticalAlign: 'middle' }}></i>
                  04 Pending
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart and Bids Row */}
        <div className="row g-4 mt-2">
          <div className="col-md-8">
            <div className="bg-white rounded-4 shadow p-4 h-100" style={{ background: '#F8F9FB', minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="d-flex align-items-start mb-2">
                <span style={{ background: '#F5F6FA', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                  <i className="bi bi-graph-up" style={{ fontSize: 18, color: '#7C3AED' }}></i>
                </span>
                <span style={{ fontWeight: 600, fontSize: 16, marginTop: 2 }}>Graphic</span>
                <span className="ms-auto"><i className="bi bi-three-dots-vertical"></i></span>
              </div>
              <div className="d-flex flex-row align-items-stretch" style={{ minHeight: 180 }}>
                <div className="d-flex flex-column justify-content-center align-items-start" style={{ minWidth: 120, paddingTop: 24, paddingBottom: 24 }}>
                  <span style={{ color: '#13C38B', fontWeight: 700, fontSize: 32, lineHeight: 1 }}>+28%</span>
                  <span style={{ color: '#B0B3B9', fontSize: 15, marginTop: 2 }}>Performance...</span>
                </div>
                <div style={{ width: 1, background: '#F0F1F3', margin: '0 24px' }}></div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ width: '100%', height: 140, display: 'flex', alignItems: 'end', gap: 8, marginBottom: 8 }}>
                    {[60, 80, 55, 70, 90, 110, 100, 120, 95, 110, 120, 85].map((h, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: 16, height: h, background: '#7C3AED', borderRadius: 6 }}></div>
                        <div style={{ fontSize: 11, color: '#B0B3B9', marginTop: 2 }}>{['Jan','Feb','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][i]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex align-items-center gap-4 mt-2" style={{ fontSize: 13, marginLeft: 8 }}>
                    <span style={{ color: '#7C3AED', display: 'flex', alignItems: 'center' }}>
                      <span style={{ width: 18, height: 3, background: '#7C3AED', borderRadius: 2, display: 'inline-block', marginRight: 6 }}></span>
                      Sent
                    </span>
                    <span style={{ color: '#7C3AED', display: 'flex', alignItems: 'center' }}>
                      <span style={{ width: 18, height: 3, background: '#7C3AED', borderRadius: 2, display: 'inline-block', marginRight: 6 }}></span>
                      Registrations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-white p-4 position-relative h-100 d-flex flex-column justify-content-between rounded-4 shadow" style={{ minHeight: 260 }}>
              <div className="d-flex align-items-center mb-3">
                <span style={{ background: '#F5F6FA', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                  <i className="bi bi-calendar-event" style={{ fontSize: 18, color: '#7C3AED' }}></i>
                </span>
                <span style={{ fontWeight: 600, fontSize: 16 }}>Bids</span>
                <span className="ms-auto"><i className="bi bi-three-dots-vertical"></i></span>
              </div>
              <div className="mb-2">
                <div className="d-flex align-items-center justify-content-between" style={{ fontSize: 15, borderBottom: '1px solid #F0F1F3', paddingBottom: 10, marginBottom: 6 }}>
                  <div className="d-flex align-items-center">
                    <span style={{ background: '#F5F6FA', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                      <i className="bi bi-calendar-event" style={{ fontSize: 14, color: '#7C3AED' }}></i>
                    </span>
                    <span>Actives</span>
                  </div>
                  <span style={{ color: '#13C38B', fontWeight: 600 }}>13</span>
                  <span><i className="bi bi-three-dots-vertical" style={{ color: '#B0B3B9', fontSize: 18 }}></i></span>
                </div>
                <div className="d-flex align-items-center justify-content-between" style={{ fontSize: 15, borderBottom: '1px solid #F0F1F3', paddingBottom: 10, marginBottom: 6 }}>
                  <div className="d-flex align-items-center">
                    <span style={{ background: '#F5F6FA', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                      <i className="bi bi-calendar-event" style={{ fontSize: 14, color: '#7C3AED' }}></i>
                    </span>
                    <span>Closed</span>
                  </div>
                  <span style={{ color: '#7C3AED', fontWeight: 600 }}>3</span>
                  <span><i className="bi bi-three-dots-vertical" style={{ color: '#B0B3B9', fontSize: 18 }}></i></span>
                </div>
                <div className="d-flex align-items-center justify-content-between" style={{ fontSize: 15 }}>
                  <div className="d-flex align-items-center">
                    <span style={{ background: '#F5F6FA', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                      <i className="bi bi-calendar-event" style={{ fontSize: 14, color: '#7C3AED' }}></i>
                    </span>
                    <span>Pending</span>
                  </div>
                  <span style={{ color: '#FFB020', fontWeight: 600 }}>0</span>
                  <span><i className="bi bi-three-dots-vertical" style={{ color: '#B0B3B9', fontSize: 18 }}></i></span>
                </div>
              </div>
              <hr style={{ margin: '16px 0 8px 0', borderColor: '#F0F1F3' }} />
              <div className="d-flex align-items-center justify-content-between mt-auto pt-2">
                <a href="#" style={{ color: '#7C3AED', fontWeight: 600, fontSize: 15, textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }} onMouseOver={e => e.target.style.color = '#5B21B6'} onMouseOut={e => e.target.style.color = '#7C3AED'}>
                  View more details <i className="bi bi-arrow-right ms-2" style={{ fontSize: 16 }}></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}