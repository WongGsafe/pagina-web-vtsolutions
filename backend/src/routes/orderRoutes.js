const express = require('express');
const {
  createOrder,
<<<<<<< HEAD
  getOrdersByUserId,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

const router = express.Router();

// Crear orden
router.post('/', createOrder);
=======
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  updateOrderItems,
  deleteOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/',                       createOrder);
router.get('/:userId',                 getOrdersByUser);
router.get('/detail/:orderId',         getOrderById);
router.put('/:orderId/status', protect, updateOrderStatus);
router.put('/:orderId',                updateOrderItems);   // ← NUEVO: editar items
router.delete('/:orderId',             deleteOrder);        // ← NUEVO: eliminar orden
>>>>>>> 6247164 (Avance final - Programación Web Avanzada)

// Obtener órdenes por usuario
router.get('/:userId', getOrdersByUserId);

// Actualizar orden
router.put('/:id', updateOrder);

// Eliminar orden
router.delete('/:id', deleteOrder);

module.exports = router;