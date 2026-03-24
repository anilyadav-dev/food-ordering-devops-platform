import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';
import { loginAdmin } from '../../api/authService';
import { setCredentials } from '../../features/auth/authSlice';

function AdminLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '' });

    try {
      const user = await loginAdmin(formData);
      dispatch(setCredentials(user));
      navigate('/admin');
    } catch (err) {
      setStatus({
        loading: false,
        error: err.response?.data?.message || 'Admin login failed',
      });
      return;
    }

    setStatus({ loading: false, error: '' });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left dark-panel">
          <p className="eyebrow">Administrator Access</p>
          <h2>Admin Login</h2>
          <p className="auth-text">
            Only accounts with backend admin access can sign in here.
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
              disabled={status.loading}
            >
              {status.loading ? 'Checking...' : 'Login as Admin'}
            </button>

            <FeedbackMessage message={status.error} type="error" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
