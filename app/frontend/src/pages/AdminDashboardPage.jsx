import { useEffect, useState } from 'react';
import api from '../utils/api';

const initialForm = {
  name: '',
  price: '',
  description: '',
  category: '',
  image: '',
};

function AdminDashboardPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchMenu = async () => {
    try {
      const res = await api.get('/api/menu');
      setMenuItems(res.data);
    } catch (err) {
      setError('Failed to load menu items');
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      if (editingId) {
        await api.put(`/api/menu/${editingId}`, payload);
        setMessage('Menu item updated successfully!');
      } else {
        await api.post('/api/menu', payload);
        setMessage('Food item added successfully!');
      }

      resetForm();
      fetchMenu();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name || '',
      price: item.price || '',
      description: item.description || '',
      category: item.category || '',
      image: item.image || '',
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/menu/${id}`);
      setMessage('Menu item deleted successfully!');
      if (editingId === id) resetForm();
      fetchMenu();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete menu item');
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="page-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">Admin Dashboard</p>
            <h2 className="section-title">
              {editingId ? 'Edit Food Item' : 'Add Food Item'}
            </h2>
            <p className="auth-text">
              Manage menu items: add food, food image URL, edit menu, and delete
              menu.
            </p>
          </div>
          <div className="menu-badge">Admin Control</div>
        </div>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Food Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter food name"
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group form-group-wide">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Momo, Drinks"
            />
          </div>

          <div className="form-group">
            <label>Food Image URL</label>
            <input
              name="image"
              type="text"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image URL"
            />
          </div>

          <div className="admin-form-actions">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Saving...' : editingId ? 'Update Food' : 'Add Food'}
            </button>
            {editingId && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>

          {message && <p className="success-text">{message}</p>}
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>

      <div className="page-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">Current Menu</p>
            <h2 className="section-title">Manage Existing Food Items</h2>
          </div>
          <div className="menu-badge">{menuItems.length} Items</div>
        </div>

        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item._id} className="menu-card">
              <div className="menu-card-top">
                <div className="menu-icon">🍱</div>
                <span className="menu-category">{item.category || 'Food'}</span>
              </div>

              <h3 className="menu-title">{item.name}</h3>
              <p className="menu-description">{item.description}</p>
              <p className="tiny-text">
                <strong>Image:</strong> {item.image || 'No image URL'}
              </p>

              <div className="menu-footer">
                <p className="menu-price">${item.price}</p>
                <div className="inline-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
