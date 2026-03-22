require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
