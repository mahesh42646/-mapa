'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';

// CNPJ validation function
function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(0)) return false;

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != digits.charAt(1)) return false;

    return true;
}

// Hardcoded city list
const HARDCODED_CITIES = [
    "São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Goiânia",
    "Belém", "Porto Alegre", "Guarulhos", "Campinas", "São Luís", "São Gonçalo", "Maceió", "Duque de Caxias", "Natal", "Teresina",
    "Campo Grande", "São Bernardo do Campo", "Nova Iguaçu", "João Pessoa", "São José dos Campos", "Santo André", "Ribeirão Preto",
    "Jaboatão dos Guararapes", "Osasco", "Uberlândia", "Contagem", "Sorocaba", "Aracaju", "Feira de Santana", "Cuiabá", "Joinville",
    "Aparecida de Goiânia", "Londrina", "Juiz de Fora", "Ananindeua", "Niterói", "Belford Roxo", "Campos dos Goytacazes", "Serra",
    "Caxias do Sul", "Macapá", "Florianópolis", "Vila Velha", "Mauá", "São João de Meriti", "Mogi das Cruzes", "Betim", "Santos",
    "Diadema", "Maringá", "Campina Grande", "Olinda", "Carapicuíba", "Piracicaba", "Bauru", "Montes Claros", "Canoas", "Boa Vista",
    "Franca", "Ponta Grossa", "Blumenau", "Petrolina", "Paulista", "Vitória", "Caucaia", "Santa Maria", "Itaquaquecetuba", "São José do Rio Preto",
    "Jundiaí", "Mossoró", "Caxias", "Suzano", "Camaçari", "Governador Valadares", "Rio Branco", "Ilhéus", "Itabuna", "Sete Lagoas",
    "Barueri", "Várzea Grande", "Volta Redonda", "Foz do Iguaçu", "Petrópolis", "Divinópolis", "Santa Luzia", "Gravataí", "Taubaté",
    "Palmas", "Limeira", "Timon", "Santarém", "Marabá", "Imperatriz", "Itaboraí", "Americana", "Novo Hamburgo", "Araraquara", "Rio Verde",
    "Dourados", "Colombo", "Indaiatuba", "Itapevi", "Alvorada", "Cascavel", "Parnamirim", "Jacareí", "Cotia", "Itajaí", "Marília",
    "Teresópolis", "Viamão", "Arapiraca", "Rondonópolis", "Abaetetuba", "Rio Grande", "Passo Fundo", "Cabo de Santo Agostinho", "Itapecerica da Serra",
    "Cabo Frio", "Patos de Minas", "Poços de Caldas", "Teófilo Otoni", "Barra Mansa", "Itu", "Bragança Paulista", "Ourinhos", "Barbacena"
    // ...add more as needed
];

export default function AddCityPage({ cityId: propCityId, onClose }) {
    const searchParams = useSearchParams();
    const cityId = propCityId || (searchParams && searchParams.get('id'));
    const router = useRouter();

    // Add this style at the top of your component
    const placeholderStyle = {
        "::placeholder": {
            color: "#adb5bd"
        }
    };

    const [form, setForm] = useState({
        cityName: '',
        cnpj: '',
        nameOfPersonInCharge: '',
        whatsapp: '',
        city: '',
        email: '',
        password: '',
        cityStatus: 'Ativo',
    });
    const [avatar, setAvatar] = useState(null);
    const [existingAvatar, setExistingAvatar] = useState('');
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Validation states
    const [cnpjError, setCnpjError] = useState('');
    const [whatsappError, setWhatsappError] = useState('');
    const [cityNameError, setCityNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [cnpjUniqueError, setCnpjUniqueError] = useState('');

    const [allCitiesInDB, setAllCitiesInDB] = useState([]);
    const [citySearch, setCitySearch] = useState('');
    const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
    const cityDropdownRef = useRef(null);

    // Fetch city data if editing
    useEffect(() => {
        if (cityId) {
            setIsEditing(true);
            fetchCityDetails();
        }
    }, [cityId]);

    const fetchCityDetails = async () => {
        try {
            const response = await axios.get(`https://mapadacultura.com/city-api/city/${cityId}`);
            const cityData = response.data;
            setForm({
                cityName: cityData.cityName || '',
                cnpj: cityData.cnpj || '',
                nameOfPersonInCharge: cityData.nameOfPersonInCharge || '',
                whatsapp: cityData.whatsapp || '',
                city: cityData.city || '',
                email: cityData.email || '',
                password: cityData.password || '',
                cityStatus: cityData.cityStatus || 'Ativo',
            });
            if (cityData.avatar) {
                setExistingAvatar(`https://mapadacultura.com/city-api${cityData.avatar}`);
            }
        } catch (error) {
            console.error('Error fetching city details:', error);
            setMessage('Error loading city data');
        }
    };

    // Fetch all cities from DB (on mount)
    useEffect(() => {
        const fetchAllCities = async () => {
            try {
                const response = await axios.get('https://mapadacultura.com/city-api/city');
                setAllCitiesInDB(response.data || []);
            } catch (error) {
                setAllCitiesInDB([]);
            }
        };
        fetchAllCities();
    }, []);

    // Get used city names from DB
    const usedCityNames = allCitiesInDB.map(c => c.city);

    // Filter hardcoded cities: not used in DB and matches search
    const filteredCityOptions = citySearch.length >= 2
        ? HARDCODED_CITIES
            .filter(city =>
                !usedCityNames.includes(city) &&
                city.toLowerCase().includes(citySearch.toLowerCase())
            )
        : [];

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
                setCityDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Format CNPJ as user types
    const formatCNPJ = (value) => {
        value = value.replace(/\D/g, '');
        if (value.length <= 2) {
            return value;
        } else if (value.length <= 5) {
            return value.replace(/^(\d{2})(\d+)/, '$1.$2');
        } else if (value.length <= 8) {
            return value.replace(/^(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
        } else if (value.length <= 12) {
            return value.replace(/^(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
        } else {
            return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, '$1.$2.$3/$4-$5').substring(0, 18);
        }
    };

    // Format WhatsApp number as user types
    const formatWhatsapp = (value) => {
        value = value.replace(/\D/g, '');
        if (value.length <= 10) {
            return value;
        } else {
            return value.substring(0, 10);
        }
    };

    // Check if city name already exists
    const checkCityNameExists = async (name) => {
        try {
            const response = await axios.get('https://mapadacultura.com/city-api/city');
            const cities = response.data;
            const exists = cities.some(city =>
                city.cityName.toLowerCase() === name.toLowerCase() &&
                (!isEditing || city._id !== cityId)
            );
            return exists;
        } catch (error) {
            console.error('Error checking city name:', error);
            return false;
        }
    };

    // Check if email already exists
    const checkEmailExists = async (email) => {
        try {
            const response = await axios.get('https://mapadacultura.com/city-api/city');
            const cities = response.data;
            const exists = cities.some(city =>
                city.email.toLowerCase() === email.toLowerCase() &&
                (!isEditing || city._id !== cityId)
            );
            return exists;
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };

    // Check if CNPJ already exists
    const checkCnpjExists = async (cnpj) => {
        try {
            const response = await axios.get('https://mapadacultura.com/city-api/city');
            const cities = response.data;
            const exists = cities.some(city =>
                city.cnpj.replace(/[^\d]+/g, '') === cnpj.replace(/[^\d]+/g, '') &&
                (!isEditing || city._id !== cityId)
            );
            return exists;
        } catch (error) {
            console.error('Error checking CNPJ:', error);
            return false;
        }
    };

    // Handle text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cnpj') {
            const formattedCNPJ = formatCNPJ(value);
            setForm((prev) => ({ ...prev, [name]: formattedCNPJ }));
            setCnpjError('');
        } else if (name === 'whatsapp') {
            const formattedWhatsapp = formatWhatsapp(value);
            setForm((prev) => ({ ...prev, [name]: formattedWhatsapp }));
            setWhatsappError('');
        } else if (name === 'cityName') {
            setForm((prev) => ({ ...prev, [name]: value }));
            setCityNameError('');
        } else if (name === 'email') {
            setForm((prev) => ({ ...prev, [name]: value }));
            setEmailError('');
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Handle blur events for validation
    const handleBlur = async (e) => {
        const { name, value } = e.target;

        if (name === 'cityName' && value) {
            const exists = await checkCityNameExists(value);
            if (exists) {
                setCityNameError('City name already exists');
            }
        } else if (name === 'email' && value) {
            const exists = await checkEmailExists(value);
            if (exists) {
                setEmailError('Email already exists');
            }
        } else if (name === 'whatsapp' && value) {
            if (value.length !== 10) {
                setWhatsappError('WhatsApp must be 10 digits');
            }
        } else if (name === 'cnpj' && value) {
            if (!validateCNPJ(value)) {
                setCnpjError('Please enter a valid CNPJ');
            } else {
                const exists = await checkCnpjExists(value);
                if (exists) {
                    setCnpjUniqueError('CNPJ already exists');
                } else {
                    setCnpjUniqueError('');
                }
            }
        }
    };

    // Handle file input
    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    // Validate form before submission
    const validateForm = async () => {
        let isValid = true;

        // Validate CNPJ
        if (!validateCNPJ(form.cnpj)) {
            setCnpjError('Please enter a valid CNPJ');
            isValid = false;
        }

        // Validate WhatsApp
        if (form.whatsapp.length !== 10) {
            setWhatsappError('WhatsApp must be 10 digits');
            isValid = false;
        }

        // Validate city name uniqueness
        const cityNameExists = await checkCityNameExists(form.cityName);
        if (cityNameExists) {
            setCityNameError('City name already exists');
            isValid = false;
        }

        // Validate email uniqueness
        const emailExists = await checkEmailExists(form.email);
        if (emailExists) {
            setEmailError('Email already exists');
            isValid = false;
        }

        // Validate CNPJ uniqueness
        const cnpjExists = await checkCnpjExists(form.cnpj);
        if (cnpjExists) {
            setCnpjUniqueError('CNPJ already exists');
            isValid = false;
        } else {
            setCnpjUniqueError('');
        }

        return isValid;
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsValidating(true);
        const isValid = await validateForm();
        setIsValidating(false);

        if (!isValid) return;

        try {
            const data = new FormData();
            // Append form data
            Object.keys(form).forEach((key) => {
                data.append(key, form[key]);
            });
            // Append avatar if provided
            if (avatar) {
                data.append('avatar', avatar);
            }

            let res;
            if (isEditing) {
                res = await axios.put(`https://mapadacultura.com/city-api/city/${cityId}`, data);
                setMessage('City updated successfully!');
                if (onClose) onClose(true);
            } else {
                res = await axios.post('https://mapadacultura.com/city-api/city', data);
                setMessage('City created successfully!');
                setForm({
                    cityName: '',
                    cnpj: '',
                    nameOfPersonInCharge: '',
                    whatsapp: '',
                    city: '',
                    email: '',
                    password: '',
                    cityStatus: 'Ativo',
                });
                setAvatar(null);
                if (onClose) onClose(true);
            }
        } catch (err) {
            setMessage(isEditing ? 'Error updating city' : 'Error creating city');
        }
    };

    return (
        <>
            {/* Add a style block for placeholder styling */}
            <style jsx>{`
                ::placeholder {
                    color: #adb5bd !important;
                    opacity: 0.6;
                    
                }
            `}</style>

            <div className="container my-5">
                <h3>{isEditing ? 'Edit City' : 'Create City'}</h3>
                {message && <div className="alert alert-info">{message}</div>}

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row">
                        {/* City Name */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">City Name*</label>
                            <input
                                type="text"
                                className={`form-control ${cityNameError ? 'is-invalid' : ''}`}
                                name="cityName"
                                required
                                value={form.cityName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter city name"
                            />
                            {cityNameError && <div className="invalid-feedback">{cityNameError}</div>}
                        </div>

                        {/* CNPJ */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">CNPJ*</label>
                            <input
                                type="text"
                                className={`form-control ${cnpjError || cnpjUniqueError ? 'is-invalid' : ''}`}
                                name="cnpj"
                                required
                                value={form.cnpj}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="XX.XXX.XXX/XXXX-XX"
                            />
                            {cnpjError && <div className="invalid-feedback">{cnpjError}</div>}
                            {cnpjUniqueError && <div className="invalid-feedback">{cnpjUniqueError}</div>}
                        </div>
                    </div>

                    {/* Name of the person in charge */}
                    <div className="mb-3">
                        <label className="form-label">Name of the person in charge*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nameOfPersonInCharge"
                            required
                            value={form.nameOfPersonInCharge}
                            onChange={handleChange}
                            placeholder="Enter name of person in charge"
                        />
                    </div>

                    {/* WhatsApp / City / Email / Password */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">WhatsApp* (10 digits)</label>
                            <input
                                type="text"
                                className={`form-control ${whatsappError ? 'is-invalid' : ''}`}
                                name="whatsapp"
                                required
                                value={form.whatsapp}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter 10-digit WhatsApp number"
                            />
                            {whatsappError && <div className="invalid-feedback">{whatsappError}</div>}
                        </div>
                        <div className="col-md-6 mb-3" ref={cityDropdownRef}>
                            <label className="form-label">City*</label>
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    required
                                    autoComplete="off"
                                    value={form.city}
                                    placeholder="Type to search city"
                                    onFocus={() => setCityDropdownOpen(true)}
                                    onChange={e => {
                                        setForm(prev => ({ ...prev, city: e.target.value }));
                                        setCitySearch(e.target.value);
                                        setCityDropdownOpen(true);
                                    }}
                                />
                                {cityDropdownOpen && citySearch.length >= 2 && (
                                    <div className="dropdown-menu show w-100" style={{ maxHeight: 200, overflowY: 'auto', zIndex: 10 }}>
                                        {filteredCityOptions.length > 0 ? (
                                            filteredCityOptions.map(option => (
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    key={option}
                                                    onClick={() => {
                                                        setForm(prev => ({ ...prev, city: option }));
                                                        setCitySearch(option);
                                                        setCityDropdownOpen(false);
                                                    }}
                                                >
                                                    {option}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="dropdown-item text-muted">No cities found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email*</label>
                            <input
                                type="email"
                                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter email address"
                            />
                            {emailError && <div className="invalid-feedback">{emailError}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Password*</label>
                            <input type="password" className="form-control" name="password" required value={form.password} onChange={handleChange} placeholder="Enter password" />
                        </div>
                    </div>

                    {/* City Status (only show when editing) */}
                    {isEditing && (
                        <div className="mb-3">
                            <label className="form-label">City Status</label>
                            <select
                                className="form-select"
                                name="cityStatus"
                                value={form.cityStatus}
                                onChange={handleChange}
                            >
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </select>
                        </div>
                    )}

                    {/* Avatar - Only show when editing */}
                    {/* {isEditing && ( */}
                        <div className="mb-3">
                            <div className="d-flex align-items-center gap-3 p-2">
                                <div className='rounded-circle d-flex justify-content-center align-items-center overflow-hidden'
                                    style={{
                                        width: "100px", height: "100px", border: "1px dashed #ccc", backgroundColor: "#f8f9fa"
                                    }}  >
                                    {avatar ? (
                                        <img src={URL.createObjectURL(avatar)} alt="Avatar preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : existingAvatar ? (
                                        <img src={existingAvatar} alt="Existing avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : (
                                        <span className="text-muted"><i className="bi bi-camera h3"></i></span>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    className="form-control d-none"
                                    id="avatarInput"
                                    onChange={handleFileChange}
                                    accept=".jpg,.jpeg,.png" />
                                <div>
                                    <div className="form-label">Avatar</div>
                                    <button type="button" className="btn border" onClick={() => document.getElementById('avatarInput').click()} >
                                        Select Avatar  </button>
                                    <small className="text-muted mt-1 d-block">Min 400×400px, PNG or JPEG</small>
                                </div>
                            </div>
                        </div>
                    {/* )} */}

                    <div className='d-flex justify-content-end'>
                        <div className="d-flex my-auto gap-3">
                            <button type="button" className="btn btn-secondary"
                                onClick={() => onClose && onClose(false)}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isValidating}
                            >
                                {isValidating ? 'Validating...' : (isEditing ? 'Update city' : 'Create city')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
