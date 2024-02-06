import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './pages/login'; 
import Notes from './pages/notes';
import Reg from './pages/register';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<App />} /> 
        </Route>
        <Route path="/notes" element={<Notes />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/login" element={<App />} />
      </Routes>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
