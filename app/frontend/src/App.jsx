import AdminRoute from './components/AdminRoute';
import AppShell from './components/AppShell';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import CartPage from './pages/shop/CartPage';
import HomePage from './pages/shop/HomePage';
import MenuPage from './pages/shop/MenuPage';
import OrderHistoryPage from './pages/shop/OrderHistoryPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <AppShell>
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
    </AppShell>
  );
}

export default App;
