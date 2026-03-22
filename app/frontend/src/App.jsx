import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Food Ordering DevOps Platform</div>
        <nav className="nav-links">
          <Link to="/" className="nav-btn">
            Home
          </Link>
          <Link to="/login" className="nav-btn">
            Login
          </Link>
          <Link to="/register" className="nav-btn">
            Register
          </Link>

          {userInfo && (
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </header>

      <main className="page-wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <section className="hero-card">
                <p className="eyebrow">Modern Food Ordering App</p>
                <h1>Frontend for your full-stack DevOps project</h1>
                <p className="hero-text">
                  React + Vite frontend connected to your Node, Express, and
                  MongoDB backend.
                </p>

                {userInfo ? (
                  <p className="success-text">
                    Logged in as: {userInfo.name} ({userInfo.email})
                  </p>
                ) : (
                  <p className="auth-text">You are not logged in yet.</p>
                )}

                <div className="hero-actions">
                  <Link to="/login" className="btn btn-primary">
                    Go to Login
                  </Link>
                  <Link to="/register" className="btn btn-secondary">
                    Create Account
                  </Link>
                </div>
              </section>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
