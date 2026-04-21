document.addEventListener('DOMContentLoaded', () => {
    const carritoBody = document.getElementById('carritoBody');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

<<<<<<< HEAD
    function renderCarrito() {
        if (!carritoBody) return;
=======
    tbody.innerHTML = items.map(item => {
      const p   = item.product;
      const sub = (p.price * item.quantity).toFixed(2);
      return `
        <tr>
          <td>
            <div class="d-flex gap-3 align-items-center">
              <img src="${p.image || `https://picsum.photos/seed/${p._id}/60/60`}"
                   width="50" height="50" style="object-fit:cover;border-radius:8px;"
                   onerror="this.src='https://picsum.photos/seed/${p._id}/60/60'">
              <div>
                <div class="fw-semibold">${p.name}</div>
                <button "onclick="removeItem('${p._id}')">Eliminar</button>
              </div>
            </div>
          </td>
          <td class="text-center">
            <input type="number" class="form-control form-control-sm text-center qty-input"
                   value="${item.quantity}" min="1" style="width:70px;margin:auto;"
                   data-pid="${p._id}" onchange="updateQty('${p._id}', this.value)">
          </td>
          <td class="text-end">$${parseFloat(p.price).toFixed(2)}</td>
          <td class="text-end fw-semibold">$${sub}</td>
        </tr>`;
    }).join('');
>>>>>>> 6247164 (Avance final - Programación Web Avanzada)

        if (carrito.length === 0) {
            carritoBody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">Tu carrito está vacío</td>
                </tr>
            `;
            subtotalEl.textContent = '0.00';
            totalEl.textContent = '0.00';
            return;
        }

        carritoBody.innerHTML = carrito.map((producto, index) => `
            <tr>
                <td>
                    <div class="d-flex align-items-center gap-3">
                        <img src="${producto.image}" alt="${producto.name}" width="70" height="70" style="object-fit: cover;">
                        <span>${producto.name}</span>
                    </div>
                </td>
                <td>$${producto.price}</td>
                <td>
                    <input 
                        type="number" 
                        min="1" 
                        value="${producto.quantity}" 
                        data-index="${index}" 
                        class="form-control cantidad-input"
                        style="width: 90px;">
                </td>
                <td>
                    <button class="btn btn-danger btn-sm eliminar-btn" data-index="${index}">Eliminar</button>
                </td>
            </tr>
        `).join('');

        const subtotal = carrito.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        subtotalEl.textContent = subtotal.toFixed(2);
        totalEl.textContent = subtotal.toFixed(2);

        document.querySelectorAll('.cantidad-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = Number(e.target.dataset.index);
                const nuevaCantidad = Number(e.target.value);

                if (nuevaCantidad < 1) {
                    e.target.value = 1;
                    carrito[index].quantity = 1;
                } else {
                    carrito[index].quantity = nuevaCantidad;
                }

                guardarCarrito();
                renderCarrito();
            });
        });

        document.querySelectorAll('.eliminar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = Number(e.target.dataset.index);
                carrito.splice(index, 1);
                guardarCarrito();
                renderCarrito();
            });
        });
    }

    renderCarrito();
});