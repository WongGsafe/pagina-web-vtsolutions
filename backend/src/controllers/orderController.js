const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { userId, shippingAddress } = req.body;
    if (!userId) return res.status(400).json({ message: 'userId es requerido' });

    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío' });
    }

    const items = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity
    }));

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({ user: userId, items, total, shippingAddress: shippingAddress || '' });

    // Vaciar carrito tras crear la orden
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creando orden', error: error.message });
  }
};

// GET /api/orders/:userId
const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo órdenes', error: error.message });
  }
};

// GET /api/orders/detail/:orderId
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo orden', error: error.message });
  }
};

// PUT /api/orders/:orderId/status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando estado', error: error.message });
  }
};

module.exports = { createOrder, getOrdersByUser, getOrderById, updateOrderStatus };
