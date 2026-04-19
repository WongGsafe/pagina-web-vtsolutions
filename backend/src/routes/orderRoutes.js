const express = require('express');
const { createOrder, getOrdersByUser, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', createOrder);
router.get('/:userId', getOrdersByUser);
router.get('/detail/:orderId', getOrderById);
router.put('/:orderId/status', protect, updateOrderStatus);

module.exports = router;
