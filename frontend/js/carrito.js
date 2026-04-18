document.addEventListener('DOMContentLoaded', () => {
    const carritoBody = document.getElementById('carritoBody');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function renderCarrito() {
        if (!carritoBody) return;

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