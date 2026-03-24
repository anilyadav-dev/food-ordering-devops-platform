import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';
import { registerUser } from '../../api/authService';
import { setCredentials } from '../../features/auth/authSlice';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [status, setStatus] = useState({
    loading: false,
    message: '',
    error: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', error: '' });

    try {
      const user = await registerUser(formData);
      dispatch(setCredentials(user));
      setStatus({
        loading: false,
        message: 'Registration successful!',
        error: '',
      });
      navigate('/');
    } catch (err) {
      setStatus({
        loading: false,
        message: '',
        error: err.response?.data?.message || 'Registration failed',
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <p className="eyebrow">Create Account</p>
          <h2>Register</h2>
          <p className="auth-text">
            Create your account to access menu, cart, and order features.
          </p>
        </div>

        <div className="auth-right">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="btn btn-primary full-width"
              type="submit"
              disabled={status.loading}
            >
              {status.loading ? 'Registering...' : 'Register'}
            </button>

            <FeedbackMessage message={status.message} />
            <FeedbackMessage message={status.error} type="error" />

            <p className="inline-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
