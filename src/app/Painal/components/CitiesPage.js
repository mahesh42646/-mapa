'use client';
import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import axios from 'axios';

export default function CitiesPage() {
  const { user } = useAuth();
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios.get(`https://mapadacultura.com/city-api/city-by-admin/${user.email}`)
        .then(response => {
          setCityData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching city data:', error);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!cityData) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <h3>No city data found</h3>
          <p>You don't have any city assigned to your profile yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">City Details</h4>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5>City Information</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <span className="fw-bold">City Name:</span>
                      <span>{cityData.cityName}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span className="fw-bold">City Admin:</span>
                      <span>{cityData.cityAdmin || user.email}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span className="fw-bold">City Status:</span>
                      <span>{cityData.cityStatus || 'Status: Pending'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 