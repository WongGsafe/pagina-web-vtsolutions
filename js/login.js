document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    
    if (!loginForm) {
        console.error('No se encontró el formulario');
        return;
    }

    // Usuario quemado
    const usuarioValido = {
        correo: 'admin@vt.com',
        password: 'Admin123'
    };

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.querySelector('input[type="email"]').value.trim();
        const password = document.querySelector('input[type="password"]').value;
        
        // Validación simple
        if (email === '' || password === '') {
            alert('❌ Todos los campos son obligatorios');
            return;
        }
        
        // Verificar credenciales
        if (email === usuarioValido.correo && password === usuarioValido.password) {
            alert('✅ ¡Bienvenido!');
            // Redirigir a la página principal
            window.location.href = 'principal.html';
        } else {
            alert('❌ Correo o contraseña incorrectos');
        }
    });
});