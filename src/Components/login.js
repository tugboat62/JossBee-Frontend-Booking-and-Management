// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    axios.get(`http://localhost:8080/api/v1/profile/login/${email}/${password}`)
      .then(function (response) {
        console.log(response);
        console.log("Successfully Logged in ");
          navigate(`/user/${response.data.id}`); //use this  instead of history.push
      
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
