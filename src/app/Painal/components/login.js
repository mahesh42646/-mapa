'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import axios from 'axios';

export default function Login() {
    const router = useRouter();
    const { setUser, user, loading } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [msg, setMsg] = useState('');

    // Redirect if already logged in
    useEffect(() => {
        if (!loading && user) {
            router.push('/Painal');
        }
    }, [user, loading, router]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use the city login endpoint from city.js
            const res = await axios.post('http://localhost:5004/city/login', form);
            
            // Fetch full city data to get all fields
            const cityRes = await axios.get(`http://localhost:5004/city/${res.data._id}`);
            
            // Set user state with all city data
            setUser({ 
                email: res.data.email, 
                role: 'cityAdmin', 
                name: res.data.nameOfPersonInCharge,
                cityName: res.data.cityName,
                cityId: res.data._id,
                avatar: res.data.avatar,
                createdByName: cityRes.data.createdByName,
                cityStatus: cityRes.data.cityStatus,
                fullCityData: cityRes.data
            });
            
            router.push('/Painal');
        } catch (err) {
            setMsg('Invalid credentials');
        }
    };

    // Don't render anything while checking authentication
    if (loading) return null;

    // If already logged in, don't render (redirect will happen)
    if (user) return null;

    return (
        <div className="p-0 d-flex " style={{ height:"88dvh" }}>
            <div className="row p-0 w-100 align-items-center">
               <div className='col-8 d-flex'>
               <div className="col-md-10 text-start mx-auto p-5 ">
                    <h2>Welcome to Mapa Cultural - City Admin</h2>
                    <p className="text-secondary">Descubra, Explore e Conecte-se com a Cultura Local.</p>
                    <small>Prefeituras de todo o país usam nosso sistema para valorizar e conectar a cultura local.</small>
                    <div className="d-flex gap-3 mt-3">
                        {Array(6).fill(0).map((_, i) => (
                            <img key={i} src="./images/AWS.png" width={50} alt="aws" />
                        ))}
                    </div>
                </div>
               </div>
                <div className="col-md-4 bg-light d-flex h-100 p-5">
                   <div className='m-auto w-100'>
                   <h4 className="mb-4">City Admin Log in</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Email address</label>
                            <input type="email" name="email" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" onChange={handleChange} required />
                        </div>
                        {msg && <p className="text-danger">{msg}</p>}
                        <button className="btn btn-primary w-100">Log in</button>
                    </form>
                    <p className="mt-3 text-end"><a href="#">Forgot password?</a></p>
                   </div>
                </div>
            </div>
        </div>
    );
} 