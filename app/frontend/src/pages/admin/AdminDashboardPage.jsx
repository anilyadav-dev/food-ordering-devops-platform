import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FeedbackMessage from '../../components/FeedbackMessage';
import PageHeader from '../../components/PageHeader';
import {
  clearMenuFeedback,
  createMenu,
  editMenu,
  fetchMenu,
  removeMenu,
} from '../../features/menu/menuSlice';

const initialForm = {
  name: '',
  price: '',
  description: '',
  category: '',
  image: '',
};

function AdminDashboardPage() {
  const dispatch = useDispatch();
  const { items, loading, actionLoading, error, successMessage } = useSelector(
    (state) => state.menu
  );
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState('');

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearMenuFeedback());

    const payload = {
      ...formData,
      price: Number(formData.price),
    };

    const resultAction = editingId
      ? await dispatch(editMenu({ id: editingId, payload }))
      : await dispatch(createMenu(payload));

    if (
      editMenu.fulfilled.match(resultAction) ||
      createMenu.fulfilled.match(resultAction)
    ) {
      resetForm();
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
    dispatch(clearMenuFeedback());
  };

  const handleDelete = async (id) => {
    const resultAction = await dispatch(removeMenu(id));

    if (removeMenu.fulfilled.match(resultAction) && editingId === id) {
      resetForm();
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
              disabled={actionLoading}
            >
              {actionLoading
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

          <FeedbackMessage message={successMessage} />
          <FeedbackMessage message={error} type="error" />
        </form>
      </div>

      <div className="page-card">
        <PageHeader
          eyebrow="Current Menu"
          title="Manage Existing Food Items"
          badge={`${items.length} Items`}
        />

        {loading ? (
          <p className="auth-text">Loading menu items...</p>
        ) : (
          <div className="menu-grid">
            {items.map((item) => (
              <div key={item._id} className="menu-card">
                <div className="menu-card-top">
                  <div className="menu-icon">🍱</div>
                  <span className="menu-category">
                    {item.category || 'Food'}
                  </span>
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
        )}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
