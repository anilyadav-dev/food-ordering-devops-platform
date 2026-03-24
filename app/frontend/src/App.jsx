import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/auth/authSlice';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Food Ordering DevOps Platform</div>

        <nav className="nav-links">
          <Link to="/" className="nav-btn">
            Home
          </Link>

          {!userInfo && (
            <>
              <Link to="/login" className="nav-btn">
                Login
              </Link>
              <Link to="/register" className="nav-btn">
                Register
              </Link>
            </>
          )}

          {userInfo && !userInfo.isAdmin && (
            <>
              <Link to="/menu" className="nav-btn">
                Menu
              </Link>
              <Link to="/cart" className="nav-btn">
                Cart ({totalCartCount})
              </Link>
              <Link to="/order-history" className="nav-btn">
                Order History
              </Link>
            </>
          )}

          {userInfo?.isAdmin && (
            <Link to="/admin" className="nav-btn">
              Admin
            </Link>
          )}

          {userInfo && (
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </header>

      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />

          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <MenuPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-history"
            element={
              <ProtectedRoute>
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
