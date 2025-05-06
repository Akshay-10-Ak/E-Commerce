// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './loginpage.css';

// const Login = () => {
//   // 👉 Pre-filled email and password (change as per your test credentials)
//   const [email, setEmail] = useState('akshay10@gmail.com');
//   const [password, setPassword] = useState('akshay10');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
//       if (res.data.success) {
//         localStorage.setItem('token', res.data.token);
//         alert('Login successful');
//         navigate('/admin'); // redirect to admin page
//       } else {
//         alert(res.data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Login failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="admin-form">
//       <h2>Login</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit" className="submit-btn">Login</button>
//     </form>
//   );
// };

// export default Login;








import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginpage.css';

const Login = () => {
  const [email, setEmail] = useState('akshay10@gmail.com');
  const [password, setPassword] = useState('akshay10');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    const validEmail = 'akshay10@gmail.com';
    const validPassword = 'akshay10';

    if (email === validEmail && password === validPassword) {
      localStorage.setItem('token', 'dummy-auth-token'); // simulate login
      alert('Login successful');
      navigate('/admin'); // redirect to admin page
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" className="submit-btn">Login</button>
    </form>
  );
};

export default Login;
