import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { setCredentials } from '../features/auth/authSlice';
import { isAdminEmail } from '../utils/auth';

function AdminLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/api/users/login', formData);
      if (!isAdminEmail(res.data.email)) {
        setError(
          "This frontend treats emails containing 'admin' as admin accounts. Your backend still needs real admin role support."
        );
        return;
      }

      dispatch(
        setCredentials({
          ...res.data,
          isAdmin: true,
        })
      );
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left dark-panel">
          <p className="eyebrow">Administrator Access</p>
          <h2>Admin Login</h2>
          <p className="auth-text">
            Log in with an email containing “admin” to access the admin UI.
          </p>
        </div>

        <div className="auth-right">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Admin Email</label>
              <input
                name="email"
                type="email"
                placeholder="admin@example.com"
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
              className="btn btn-dark full-width"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Checking...' : 'Login as Admin'}
            </button>

            {error && <p className="error-text">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
