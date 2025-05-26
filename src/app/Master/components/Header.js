'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/Master/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaBars, FaBell, FaCog, FaHome, FaUsers, FaMapMarkerAlt, FaProjectDiagram, FaUserTie, FaUserPlus, FaCity } from 'react-icons/fa';
import dynamic from 'next/dynamic';
const Login = dynamic(() => import('./login'), { ssr: false }); // Import login dynamically to avoid hydration issues

export default function Header({ activeTab, setActiveTab }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;
  const router = useRouter();
  const profileMenuRef = useRef(null);
  const { loading } = useAuth();

  // Fetch user profile photo
  useEffect(() => {
    if (user?.email) {
      axios.get(`https://mapadacultura.com/api/user/${user.email}`)
        .then(response => {
          if (response.data.profilePhoto) {
            setProfilePhoto(`https://mapadacultura.com/api${response.data.profilePhoto}`);
          }
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [user]);

  // Update URL hash when active tab changes
  useEffect(() => {
    if (activeTab) {
      window.location.hash = `activetab=${activeTab}`;
    }
  }, [activeTab]);

  // Check URL hash on component mount
  useEffect(() => {
    const checkUrlHash = () => {
      const hash = window.location.hash;
      if (hash.includes('activetab=')) {
        const tab = hash.split('activetab=')[1].split('&')[0];
        if (tab && (tab === 'dashboard' || tab === 'cities')) {
          setActiveTab(tab);
        }
      }
    };

    checkUrlHash();
    window.addEventListener('hashchange', checkUrlHash);
    
    return () => {
      window.removeEventListener('hashchange', checkUrlHash);
    };
  }, [setActiveTab]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);


  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };

  const defaultAvatar = '/images/placeholder-Avatar.png';
  const userAvatar = profilePhoto || defaultAvatar;

  // Helper function to determine what links to show based on user role
  const isAdmin = user?.role === 'admin' || user?.role === 'superAdmin';
  const isCityAdmin = user?.role === 'cityAdmin';
  const isCulturalAgent = user?.role === 'culturalAgent';

  // Show fullscreen login modal if not logged in and not loading
  if (!loading && !user) {
    return (
      <div
        style={{
          position: 'fixed',
          zIndex: 2000,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(255,255,255,1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '100vw', height: '100vh' }}>
          <Login />
        </div>
      </div>
    );
  }

  return (
    <header className="bg-dark text-black pt-2 shadow-sm" style={{ zIndex: 10000, top: 0, position: 'fixed', width: '100vw',  }}>
      <div className="container p-2">
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo and Menu Toggle */}
          <div className="d-flex align-items-center">
            <button className="btn text-white d-md-none me-2" onClick={toggleSidebar}>
              <FaBars size={20} />
            </button>
            <Link href="/" className="text-decoration-none">
              <div className="d-flex align-items-center">
                <img src="./images/GestorCulturalLogo.png" alt="GestorCultural" width="100%" height="40" className="" />

              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}

          {/* User Profile and Notifications */}
          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              <button className="btn text-white p-0">
                <FaBell size={20} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  1
                </span>
              </button>
            </div>
            <div className="position-relative" ref={profileMenuRef}>
              <button
                className="btn p-0 rounded-circle overflow-hidden"
                onClick={toggleProfileMenu}
                style={{ width: '40px', height: '40px' }}
              >
                <img
                  src={userAvatar}
                  alt="Profile"
                  className="img-fluid"
                />
              </button>
              {showProfileMenu && (
                <div className="position-absolute end-0 mt-2 py-2 shadow-lg bg-white rounded text-dark" style={{ minWidth: '270px', zIndex: 1000 }}>
                  <div className="px-3 py-2 border-bottom">
                    <h6 className="mb-0">{user?.name || 'User'}</h6>
                    <small className="text-muted">{user?.email || ''}</small>
                    <p className="text-muted">{user?.role || ''}</p>
                  </div>
                  <Link href="/profile" className="dropdown-item px-3 py-2">
                    View Profile
                  </Link>
                  <Link href="/change-password" className="dropdown-item px-3 py-2">
                    Change Password
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item px-3 py-2 text-danger">
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button className="btn text-white ms-3">
              <FaCog size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className=' p-0 bg-white  '>
        <nav className="d-none container p-0  d-md-flex">
          <ul className="nav">
            {/* Dashboard - visible to all */}
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-dark ${activeTab === 'dashboard' ? 'active fw-bold' : ''}`}
                style={{ textDecoration: 'none' }}
                onClick={() => setActiveTab('dashboard')}
              >
                <FaHome className="me-1" /> Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-dark ${activeTab === 'cities' ? 'active fw-bold' : ''}`}
                style={{ textDecoration: 'none' }}
                onClick={() => setActiveTab('cities')}
              >
                <FaCity className="me-1" /> Cities
              </button>
            </li>
          </ul>
        </nav>

      </div>

      {/* Mobile Sidebar */}
      <div className={`position-fixed top-0 start-0 h-100 bg-white text-dark p-3 ${showSidebar ? 'show' : 'hide'}`}
        style={{
          width: '250px',
          zIndex: 1050,
          transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Menu</h5>
          <button className="btn text-dark" onClick={toggleSidebar}>
            &times;
          </button>
        </div>
        <ul className="nav flex-column">
          {/* Dashboard - visible to all */}
          <li className="nav-item">
            <Link href="/" className="nav-link text-dark py-2">
              <FaHome className="me-2" /> Dashboard
            </Link>
          </li>
          
          {/* City - visible to admins and cityAdmin */}
          {(isAdmin || isCityAdmin) && (
            <li className="nav-item">
              <Link href="/city" className="nav-link text-dark py-2">
                <FaCity className="me-2" /> City
              </Link>
            </li>
          )}
          
          {/* Create User - visible only to admins */}
          {isAdmin && (
            <li className="nav-item">
              <Link href="/create-user" className="nav-link text-dark py-2">
                <FaUserPlus className="me-2" /> Create User
              </Link>
            </li>
          )}
          
          {/* Cultural Agents - visible to admins and culturalAgent */}
          {(isAdmin || isCulturalAgent) && (
            <li className="nav-item">
              <Link href="/cultural-agents" className="nav-link text-dark py-2">
                <FaUsers className="me-2" /> Cultural Agents
              </Link>
            </li>
          )}
          
          {/* Cultural Spaces - visible to admins and culturalAgent */}
          {(isAdmin || isCulturalAgent) && (
            <li className="nav-item">
              <Link href="/cultural-spaces" className="nav-link text-dark py-2">
                <FaMapMarkerAlt className="me-2" /> Cultural Spaces
              </Link>
            </li>
          )}
          
          {/* Cultural Projects - visible to admins and culturalAgent */}
          {(isAdmin || isCulturalAgent) && (
            <li className="nav-item">
              <Link href="/cultural-projects" className="nav-link text-dark py-2">
                <FaProjectDiagram className="me-2" /> Cultural Projects
              </Link>
            </li>
          )}
          
          {/* Professionals - visible only to admins */}
          {isAdmin && (
            <li className="nav-item">
              <Link href="/professionals" className="nav-link text-dark py-2">
                <FaUserTie className="me-2" /> Professionals
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Overlay when sidebar is open - only visible when sidebar is open */}
      {showSidebar && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
          style={{ zIndex: 1040, opacity: 0.5 }}
          onClick={toggleSidebar}>
        </div>
      )}
    </header>
  );
}
