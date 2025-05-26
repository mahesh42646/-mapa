'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/Master/context/AuthContext';
import axios from 'axios';
import AddCityPage from './AddCity';
import Header from '../components/Header';

export default function Dashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [cities, setCities] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [editCityId, setEditCityId] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);

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

    // Check URL hash on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;

            if (hash.includes('edit=')) {
                const cityId = hash.split('edit=')[1].split('&')[0];
                if (cityId) {
                    setEditCityId(cityId);
                    setShowModal(true);
                }
            } else if (hash.includes('action=addcity')) {
                setEditCityId(null);
                setShowModal(true);
            }
        }
    }, []);

    // Update URL hash when modal state changes
    useEffect(() => {
        const currentHash = window.location.hash;
        const baseHash = currentHash.includes('activetab=') ?
            currentHash.split('&')[0] : 'activetab=cities';

        if (showModal) {
            if (editCityId) {
                window.location.hash = `${baseHash}&edit=${editCityId}`;
            } else {
                window.location.hash = `${baseHash}&action=addcity`;
            }
        } else {
            // Remove edit/action parameters but keep activetab
            if (currentHash.includes('&')) {
                window.location.hash = baseHash;
            }
        }
    }, [showModal, editCityId]);

    useEffect(() => {
        if (user) {
            fetchCities();
        }
    }, [user]);

    const fetchCities = async () => {
        try {
            const response = await axios.get('https://mapadacultura.com/city-api/city');
            setCities(response.data);
            setFilteredCities(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    useEffect(() => {
        let result = cities;

        if (searchTerm) {
            result = result.filter(city =>
                city.cityName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (activeTab === 'active') {
            result = result.filter(city => city.cityStatus === 'Ativo');
        } else if (activeTab === 'inactive') {
            result = result.filter(city => city.cityStatus === 'Inativo');
        }

        setFilteredCities(result);
    }, [searchTerm, activeTab, cities]);

    const handleModalClose = (shouldRefresh = false) => {
        setShowModal(false);
        setEditCityId(null);
        if (shouldRefresh) {
            fetchCities();
        }
    };

    if (loading) return null;
    if (!user) return null;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCities.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCities.length / itemsPerPage);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()} ${date.getHours() >= 12 ? 'pm' : 'am'}`;
    };

    return (
        <div className='CitiesList border container p-4'>
           

            <div className='d-flex justify-content-between mb-4'>
                <div className="h4">
                    Cities
                </div>
                <button className='btn mt-2 text-gray  border px-4 rounded-3'
                    style={{ background: '#635BFF', color: '#fff' }}
                    onClick={() => { setEditCityId(null); setShowModal(true); }}
                >
                    + New City
                </button>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3 ">
                <div className="nav nav-tabs">
                    <button className={`nav-link  ${activeTab === 'all' ? 'active fw-bold border-bottom-green' : ''}`}
                        onClick={() => setActiveTab('all')}>
                        All <span className="ms-1">{cities.length}</span>
                    </button>
                    <button className={`nav-link ${activeTab === 'active' ? 'active fw-bold border-bottom-green' : ''}`}
                        onClick={() => setActiveTab('active')}>
                        Actives <span className="ms-1">{cities.filter(city => city.cityStatus === 'Ativo').length}</span>
                    </button>
                    <button className={`nav-link ${activeTab === 'inactive' ? 'active fw-bold  border-bottom-green' : ''}`}
                        onClick={() => setActiveTab('inactive')}>
                        Inactive <span className="ms-1">{cities.filter(city => city.cityStatus === 'Inativo').length}</span>
                    </button>
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search city by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ minWidth: 280, width: 450 }}
                    />
                </div>
            </div>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr className="bg-light ">
                            <th>City Name</th>
                            <th>State</th>
                            <th>Created in</th>
                            <th>Status</th>
                            <th>City Panel</th>
                            <th>Public Link</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {currentItems.map((city, idx) => (
                            <tr key={city._id} className='align-middle'>
                                <td className="d-flex align-items-center py-3 text-secondary">
                                    {city.avatar ? (
                                        <img
                                            src={`https://mapadacultura.com/city-api${city.avatar}`}
                                            alt={city.cityName}
                                            className="rounded-circle me-2"
                                            style={{ width: "40px", height: "40px" }}
                                        />
                                    ) : (
                                        <img
                                            src={`./images/citi-icon.png`}
                                            alt={city.cityName}
                                            className="rounded-circle border border-gray-300 me-2"
                                            style={{ width: "40px", height: "40px" }}
                                        />
                                    )}
                                    {city.cityName}
                                </td>
                                <td className='text-secondary'>{city.city}</td>
                                <td className='text-secondary'>{formatDate(city.createdAt)}</td>
                                <td>
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        // background: city.cityStatus === 'Inativo' ? '#FFEAEA' : '#E6FCF0',
                                        // color: city.cityStatus === 'Inativo' ? '#FF3B30' : '#13C38B',
                                        border: '1.5px solid gray',
                                        background: '#ffffff',
                                        color: '#000000',
                                        borderRadius: '8px',
                                        padding: '4px 14px',
                                        fontWeight: 500,
                                        fontSize: '15px',
                                    }}>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 20,
                                            height: 20,
                                            background: city.cityStatus === 'Inativo' ? '#FF3B30' : '#13C38B',
                                            color: '#fff',
                                            borderRadius: '50%',
                                            marginRight: 6,
                                            fontSize: 14,
                                        }}>
                                            {city.cityStatus === 'Inativo' ? (
                                                <i className="bi bi-x-lg"></i>
                                            ) : (
                                                <i className="bi bi-check-lg"></i>
                                            )}
                                        </span>
                                        {city.cityStatus}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ position: 'relative', display: 'inline-block' }}>
                                        <button style={{
                                            display: 'inline-flex',
                                            border: '1.5px solid gray',
                                            background: '#ffffff',
                                            color: '#000000',
                                            borderRadius: '8px',
                                            padding: '4px 14px',
                                            fontWeight: 500,
                                            fontSize: '15px',
                                            position: 'relative',
                                        }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 22,
                                                height: 22,
                                                background: '#6F3FF5',
                                                color: '#fff',
                                                borderRadius: '50%',
                                                marginRight: 6,
                                                fontSize: 16,
                                            }}>
                                                <i className="bi bi-person-circle"></i>
                                            </span>
                                            Access Panel
                                        </button>
                                       
                                    </div>
                                </td>
                                <td>
                                    <div style={{ position: 'relative', display: 'inline-block' }}>
                                        <button style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            border: '1.5px solid gray',
                                            background: '#ffffff',
                                            color: '#000000',
                                            borderRadius: '8px',
                                            padding: '4px 14px',
                                            fontWeight: 500,
                                            fontSize: '15px',
                                            position: 'relative',
                                        }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 22,
                                                height: 22,
                                                background: '#13C38B',
                                                color: '#fff',
                                                borderRadius: '50%',
                                                marginRight: 6,
                                                fontSize: 16,
                                            }}>
                                                <i className="bi bi-globe"></i>
                                            </span>
                                            Open
                                        </button>
                                       
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex gap-2 align-items-center" style={{ position: 'relative' }}>
                                        <div style={{ position: 'relative' }}>
                                            <button
                                                className="btn btn-outline-secondary btn-sm rounded-circle"
                                                style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}
                                                onClick={() => { setEditCityId(city._id); setShowModal(true); }}
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            
                                        </div>
                                        <div style={{ position: 'relative' }}>
                                            <button
                                                className="btn btn-outline-secondary btn-sm rounded-circle"
                                                style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}
                                            >
                                                <i className="bi bi-three-dots-vertical"></i>
                                            </button>
                                            
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="ms-auto d-flex align-items-center" style={{ justifyContent: 'flex-end' }}>
                    <span>Linhas por página: </span>
                    <select
                        className="form-select form-select-sm d-inline-block border-0 w-auto ms-1 me-4"
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
                
                <div>
                    {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCities.length)} de {filteredCities.length}
                    <button
                        className="btn btn-sm btn-link"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        <i class="bi bi-chevron-left"></i>
                    </button>
                    <button
                        className="btn btn-sm btn-link"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>

            {showModal && (
                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        background: 'rgba(0,0,0,0.5)',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 1050,
                        overflowY: 'auto'
                    }}
                >

                    <div
                        className="modal-dialog modal-fullscreen"
                        style={{ margin: 0, maxWidth: '100vw', height: '100vh' }}
                    >

                        <div className="modal-content" style={{ minHeight: '100vh' }}>

                            <div className="modal-body">

                                <div className="modal-header p-5">

                                </div>
                                <AddCityPage
                                    cityId={editCityId}
                                    onClose={handleModalClose}
                                />
                                
                            </div>
                            
                            <footer className="bg-dark text-white  d-flex justify-content-between p-3 mt-auto" style={{ bottom: 0, width: '100%' }}>
                                <p>&copy; 2025 MAPA</p>
                                <p>Design & Develop by DevCactus</p>
                            </footer>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
