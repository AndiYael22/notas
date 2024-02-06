import React, { useState } from 'react';
import "../css/register.css";
import Snowfall from '../components/snow';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();


const goToLogin = async () => {
  if (validateFields()) {
    try {
      const response = await fetch('http://localhost:3001/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });
      
      
      if (response.ok) {
        navigate('/login');
      } else {
        alert('Error en el registro.');
      }
      
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }
};

  

  const validateFields = () => {
    if (!username.trim() || !password.trim() || !email.trim()) {
      alert('Por favor, complete todos los campos.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Ingrese un correo electrónico válido.');
      return false;
    }

    return true;
  };

  return (
    <div className="register-container">
      <Snowfall />
      <div className='contenedor1'>
        <h2>Registro</h2>
        <label className='label1'>Usuario</label>
        <input className='login1' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label className='label1'>Contraseña</label>
        <input className='login1' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label className='label1'>Correo</label>
        <input className='login1' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

        <br></br>
        <div>
          <button className='boton11' onClick={goToLogin}>Registrarse</button>
        </div>
      </div>
    
    </div>
  );
};

export default Register;
