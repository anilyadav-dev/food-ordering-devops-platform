import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function HomePage() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <section className="hero-card">
      <div className="hero-copy">
        <p className="eyebrow">Food Ordering App Version 1.1</p>
        <h1>Designed full-stack frontend for DevOps platform</h1>
        <p className="hero-text">
          Browse menu items, manage your cart, place orders, review order
          history, and manage food items from the admin dashboard.
        </p>

        {userInfo ? (
          <p className="success-text">
            Logged in as: {userInfo.name} ({userInfo.email})
          </p>
        ) : (
          <p className="auth-text">
            Please log in to explore the full customer experience.
          </p>
        )}

        <div className="hero-actions">
          {!userInfo ? (
            <>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Register
              </Link>
              <Link to="/admin-login" className="btn btn-dark">
                Login as Admin
              </Link>
            </>
          ) : userInfo.isAdmin ? (
            <Link to="/admin" className="btn btn-dark">
              Go to Admin Dashboard
            </Link>
          ) : (
            <>
              <Link to="/menu" className="btn btn-primary">
                View Menu
              </Link>
              <Link to="/cart" className="btn btn-secondary">
                Open Cart
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="hero-panel">
        <div className="hero-stat">
          <span className="hero-stat-number">Auth</span>
          <span className="hero-stat-label">Login / Register / Logout</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-number">Cart</span>
          <span className="hero-stat-label">Increase / Decrease / Remove</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-number">Admin</span>
          <span className="hero-stat-label">Add / Edit / Delete Menu</span>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
