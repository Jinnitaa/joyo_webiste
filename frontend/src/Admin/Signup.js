import React, { useState } from 'react';
import './Signup.css'; 
const baseURL = process.env.REACT_APP_API_BASE_URL;
function AdminSignup() {
  const [form, setForm] = useState({ username: '', password: '', signupKey: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseURL}/admin/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message || 'Error occurred');
    } catch (error) {
      setMessage('Signup failed: ' + error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Admin Account</h2>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="signupKey"
          placeholder="Signup Key"
          value={form.signupKey}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default AdminSignup;
