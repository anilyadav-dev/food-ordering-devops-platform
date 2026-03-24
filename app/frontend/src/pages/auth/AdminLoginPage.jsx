import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';
import { loginAdmin } from '../../features/auth/authSlice';

function AdminLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginAdmin(formData));

    if (loginAdmin.fulfilled.match(resultAction)) {
      navigate('/admin');
    }
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
              disabled={loading}
            >
              {loading ? 'Checking...' : 'Login as Admin'}
            </button>

            <FeedbackMessage message={error} type="error" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
