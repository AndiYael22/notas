import React, { useState } from 'react';
import "../css/login.css"
import Snowfall from '../components/snow';
import { useNavigate } from 'react-router-dom';
//soy una nota

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3001/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      navigate('/notes');
    } else {
      alert('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};
 
  const register = () => {
    navigate('/register');
  };
  

  return (
    
    <div className="login-container">
        <Snowfall />
  
        <div className='contenedor' >
          <h2 >Iniciar Sesión</h2>
          <label className='label'>
            Usuario
            </label>
            <input className='login' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        
          <br></br>
          <label className='label'>
            Contraseña
            </label>
            <input className='login' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <div>
          <button className='boton1'  onClick={handleLogin}>Iniciar Sesión</button>

          <button className='boton1'  onClick={register}>Registrase</button>
          </div>
         
        </div>
   

    </div>
  );
};

export default Login;
