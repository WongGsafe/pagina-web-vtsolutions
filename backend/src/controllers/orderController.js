const Order = require('../models/Order');
<<<<<<< HEAD
const User = require('../models/User');
const Product = require('../models/Product');
=======
const Cart  = require('../models/Cart');

const ONE_HOUR_MS = 60 * 60 * 1000;
>>>>>>> 6247164 (Avance final - Programación Web Avanzada)

// Crear orden
const createOrder = async (req, res) => {
  try {
    const { user, products, total, status } = req.body;

<<<<<<< HEAD
    if (!user || !products || !Array.isArray(products) || products.length === 0 || total == null) {
      return res.status(400).json({
        ok: false,
        message: 'Debe enviar user, products y total'
      });
    }
=======
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: 'El carrito está vacío' });
>>>>>>> 6247164 (Avance final - Programación Web Avanzada)

    const userExists = await User.findById(user);

<<<<<<< HEAD
    if (!userExists) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado'
      });
    }

    for (const item of products) {
      const productExists = await Product.findById(item.product);

      if (!productExists) {
        return res.status(404).json({
          ok: false,
          message: `Producto no encontrado: ${item.product}`
        });
      }
    }

    const newOrder = new Order({
      user,
      products,
      total,
      status: status || 'pendiente'
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({
      ok: true,
      message: 'Orden creada correctamente',
      data: savedOrder
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al crear orden',
      error: error.message
    });
=======
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = await Order.create({ user: userId, items, total, shippingAddress: shippingAddress || '' });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error creando orden', error: err.message });
>>>>>>> 6247164 (Avance final - Programación Web Avanzada)
  }
};

// Obtener órdenes por usuario
const getOrdersByUserId = async (req, res) => {
  try {
<<<<<<< HEAD
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate('user')
      .populate('products.product');

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No se encontraron órdenes para este usuario'
      });
    }

    return res.status(200).json({
      ok: true,
      data: orders
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener órdenes',
      error: error.message
    });
=======
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo órdenes', error: err.message });
>>>>>>> 6247164 (Avance final - Programación Web Avanzada)
  }
};

// Actualizar orden
const updateOrder = async (req, res) => {
  try {
<<<<<<< HEAD
    const { id } = req.params;
    const { products, total, status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        ok: false,
        message: 'Orden no encontrada'
      });
    }

    if (products) {
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
          ok: false,
          message: 'Products debe ser un arreglo válido'
        });
      }

      for (const item of products) {
        const productExists = await Product.findById(item.product);

        if (!productExists) {
          return res.status(404).json({
            ok: false,
            message: `Producto no encontrado: ${item.product}`
          });
        }
      }

      order.products = products;
    }

    if (total != null) {
      order.total = total;
    }

    if (status) {
      order.status = status;
    }

    const updatedOrder = await order.save();

    return res.status(200).json({
      ok: true,
      message: 'Orden actualizada correctamente',
      data: updatedOrder
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al actualizar orden',
      error: error.message
    });
=======
    const order = await Order.findById(req.params.orderId).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo orden', error: err.message });
>>>>>>> 6247164 (Avance final - Programación Web Avanzada)
  }
};

// Eliminar orden
const deleteOrder = async (req, res) => {
  try {
<<<<<<< HEAD
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        ok: false,
        message: 'Orden no encontrada'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Orden eliminada correctamente',
      data: deletedOrder
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al eliminar orden',
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getOrdersByUserId,
  updateOrder,
  deleteOrder
};
=======
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error actualizando estado', error: err.message });
  }
};

// ─── NUEVO: PUT /api/orders/:orderId ─────────────────────────────────────────
// Sobrescribe los items de una orden (solo si no fue editada y está dentro de 1 hora)
const updateOrderItems = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { items } = req.body;  // array de {product, name, price, quantity}

    if (!items || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: 'Se requieren items válidos' });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });

    // Validación: solo editable una vez
    if (order.edited)
      return res.status(403).json({ message: 'Esta orden ya fue editada anteriormente' });

    // Validación: solo dentro de 1 hora
    const elapsed = Date.now() - new Date(order.createdAt).getTime();
    if (elapsed > ONE_HOUR_MS)
      return res.status(403).json({ message: 'El tiempo para editar esta orden ha expirado (1 hora)' });

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const updated = await Order.findByIdAndUpdate(
      orderId,
      { items, total, edited: true },
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error actualizando orden', error: err.message });
  }
};

// ─── NUEVO: DELETE /api/orders/:orderId ─────────────────────────────────────
// Elimina una orden completa (solo si no fue editada y está dentro de 1 hora)
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });

    // Validación: solo editable una vez
    if (order.edited)
      return res.status(403).json({ message: 'Esta orden ya fue editada, no puede eliminarse' });

    // Validación: solo dentro de 1 hora
    const elapsed = Date.now() - new Date(order.createdAt).getTime();
    if (elapsed > ONE_HOUR_MS)
      return res.status(403).json({ message: 'El tiempo para eliminar esta orden ha expirado (1 hora)' });

    await Order.findByIdAndDelete(orderId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error eliminando orden', error: err.message });
  }
};

module.exports = { createOrder, getOrdersByUser, getOrderById, updateOrderStatus, updateOrderItems, deleteOrder };
>>>>>>> 6247164 (Avance final - Programación Web Avanzada)
