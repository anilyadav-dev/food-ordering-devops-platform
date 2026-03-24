import { useEffect, useState } from 'react';
import FeedbackMessage from '../../components/FeedbackMessage';
import PageHeader from '../../components/PageHeader';
import {
  createMenuItem,
  deleteMenuItem,
  fetchMenuItems,
  updateMenuItem,
} from '../../api/menuService';

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
  const [status, setStatus] = useState({
    loading: false,
    message: '',
    error: '',
  });

  const loadMenu = async () => {
    try {
      const items = await fetchMenuItems();
      setMenuItems(items);
    } catch (err) {
      setStatus((current) => ({
        ...current,
        error: 'Failed to load menu items',
      }));
    }
  };

  useEffect(() => {
    loadMenu();
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
    setStatus({ loading: true, message: '', error: '' });

    const payload = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      if (editingId) {
        await updateMenuItem(editingId, payload);
      } else {
        await createMenuItem(payload);
      }

      const wasEditing = Boolean(editingId);
      resetForm();
      await loadMenu();
      setStatus({
        loading: false,
        message: wasEditing
          ? 'Menu item updated successfully!'
          : 'Food item added successfully!',
        error: '',
      });
    } catch (err) {
      setStatus({
        loading: false,
        message: '',
        error: err.response?.data?.message || 'Failed to save menu item',
      });
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
    setStatus((current) => ({ ...current, message: '', error: '' }));
  };

  const handleDelete = async (id) => {
    try {
      await deleteMenuItem(id);
      if (editingId === id) {
        resetForm();
      }
      await loadMenu();
      setStatus({
        loading: false,
        message: 'Menu item deleted successfully!',
        error: '',
      });
    } catch (err) {
      setStatus({
        loading: false,
        message: '',
        error: err.response?.data?.message || 'Failed to delete menu item',
      });
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="page-card">
        <PageHeader
          eyebrow="Admin Dashboard"
          title={editingId ? 'Edit Food Item' : 'Add Food Item'}
          description="Manage menu items: add food, food image URL, edit menu, and delete menu."
          badge="Admin Control"
        />

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
              disabled={status.loading}
            >
              {status.loading
                ? 'Saving...'
                : editingId
                  ? 'Update Food'
                  : 'Add Food'}
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

          <FeedbackMessage message={status.message} />
          <FeedbackMessage message={status.error} type="error" />
        </form>
      </div>

      <div className="page-card">
        <PageHeader
          eyebrow="Current Menu"
          title="Manage Existing Food Items"
          badge={`${menuItems.length} Items`}
        />

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
