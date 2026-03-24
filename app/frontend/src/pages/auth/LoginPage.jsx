import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';
import { loginUser } from '../../api/authService';
import { setCredentials } from '../../features/auth/authSlice';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      const user = await loginUser(formData);
      dispatch(setCredentials(user));
      setStatus({ loading: false, message: 'Login successful!', error: '' });
      navigate('/');
    } catch (err) {
      setStatus({
        loading: false,
        message: '',
        error: err.response?.data?.message || 'Login failed',
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <p className="eyebrow">Welcome Back</p>
          <h2>Login</h2>
          <p className="auth-text">
            Sign in to browse the menu, manage your cart, and place orders.
          </p>
        </div>

        <div className="auth-right">
          <form className="auth-form" onSubmit={handleSubmit}>
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
              {status.loading ? 'Logging in...' : 'Login'}
            </button>

            <FeedbackMessage message={status.message} />
            <FeedbackMessage message={status.error} type="error" />

            <p className="inline-link">
              Don’t have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
