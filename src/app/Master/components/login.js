'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/Master/context/AuthContext';
import axios from 'axios';

export default function Login() {
    const router = useRouter();
    const { setUser, user, loading } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [msg, setMsg] = useState('');

    // Redirect if already logged in
    useEffect(() => {
        if (!loading && user) {
            router.push('/');
        }
    }, [user, loading, router]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://mapadacultura.com/api/login', form);
            setUser({ email: res.data.email, role: res.data.role, name: res.data.name });
            router.push('/');
        } catch (err) {
            setMsg('Invalid credentials');
        }
    };

    // Don't render anything while checking authentication
    if (loading) return null;

    // If already logged in, don't render (redirect will happen)
    if (user) return null;

    return (
        <div className="d-flex" style={{ height: "100dvh" }}>
            <div className="bg-light flex-grow-1 d-flex align-items-center">
                <div className="col-md-10 text-start mx-auto p-5">
                    <h2>Welcome to Mapa Cultural</h2>
                    <p className="text-secondary">Descubra, Explore e Conecte-se com a Cultura Local.</p>
                    <small>Prefeituras de todo o país usam nosso sistema para valorizar e conectar a cultura local.</small>
                    <div className="d-flex gap-3 mt-3">
                        {Array(6).fill(0).map((_, i) => (
                            <img key={i} src="./images/AWS.png" width={50} alt="aws" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-md-4 d-flex p-5" style={{ minWidth: "400px" }}>
                <div className='m-auto w-100'>
                    <h4 className="mb-4">Log in</h4>
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
                        <button className="btn btn-purple w-100" style={{ backgroundColor: '#635BFF', borderColor: '#4E36F5', color: 'white' }}>Log in</button>
                    </form>
                    <p className="mt-3 text-end"><a href="#">Forgot password?</a></p>
                </div>
            </div>
        </div>
    );
}
