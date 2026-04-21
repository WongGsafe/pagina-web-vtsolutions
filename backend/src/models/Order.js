const mongoose = require('mongoose');

<<<<<<< HEAD
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number
    }
  ],
  total: Number,
=======
const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
>>>>>>> 6247164 (Avance final - Programación Web Avanzada)
  status: {
    type: String,
    default: 'pendiente'
<<<<<<< HEAD
  }
=======
  },
  shippingAddress: { type: String, default: '' },
  edited: { type: Boolean, default: false }   // ← NUEVO: control de edición única
>>>>>>> 6247164 (Avance final - Programación Web Avanzada)
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);