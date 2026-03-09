document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    
    if (!registroForm) {
        console.error('Formulario no encontrado');
        return;
    }

    // Función para crear mensajes de validación
    function crearMensaje(inputId) {
        const input = document.getElementById(inputId);
        const mensaje = document.createElement('div');
        mensaje.className = 'mensaje-validacion';
        mensaje.style.cssText = 'font-size: 0.85rem; margin-top: 5px; min-height: 20px; display: none;';
        input.parentNode.appendChild(mensaje);
        return mensaje;
    }

    // Crear mensajes para cada campo
    const mensajes = {
        nombre: crearMensaje('nombre'),
        correo: crearMensaje('correo'),
        password: crearMensaje('password'),
        confirm: crearMensaje('confirmPassword')
    };

    // Validaciones en tiempo real
    document.getElementById('nombre').addEventListener('input', function() {
        validarCampo('nombre', [
            { condicion: this.value.trim().length < 3, mensaje: '❌ Mínimo 3 caracteres' },
            { condicion: !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.value.trim()), mensaje: '❌ Solo letras' }
        ], '✅ Nombre válido');
    });

    document.getElementById('correo').addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validarCampo('correo', [
            { condicion: !emailRegex.test(this.value.trim()), mensaje: '❌ Correo inválido' }
        ], '✅ Correo válido');
    });

    document.getElementById('password').addEventListener('input', function() {
        validarCampo('password', [
            { condicion: this.value.length < 6, mensaje: '❌ Mínimo 6 caracteres' },
            { condicion: !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(this.value), mensaje: '❌ Debe tener mayúscula, minúscula y número' }
        ], '✅ Contraseña segura');
        
        // Si hay algo en confirmación, validarlo también
        if (document.getElementById('confirmPassword').value) {
            validarConfirmacion();
        }
    });

    document.getElementById('confirmPassword').addEventListener('input', validarConfirmacion);

    // Función específica para validar confirmación
    function validarConfirmacion() {
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirmPassword').value;
        const mensajeDiv = mensajes.confirm;
        
        if (confirm === '') {
            document.getElementById('confirmPassword').classList.remove('is-invalid', 'is-valid');
            mensajeDiv.style.display = 'none';
            return;
        }
        
        // Verificar si la contraseña es válida primero
        const passwordValida = password.length >= 6 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password);
        
        if (!passwordValida) {
            document.getElementById('confirmPassword').classList.add('is-invalid');
            document.getElementById('confirmPassword').classList.remove('is-valid');
            mensajeDiv.style.display = 'block';
            mensajeDiv.innerHTML = '❌ Primero ingresa una contraseña válida';
            mensajeDiv.style.color = '#dc3545';
        } else if (confirm !== password) {
            document.getElementById('confirmPassword').classList.add('is-invalid');
            document.getElementById('confirmPassword').classList.remove('is-valid');
            mensajeDiv.style.display = 'block';
            mensajeDiv.innerHTML = '❌ Las contraseñas no coinciden';
            mensajeDiv.style.color = '#dc3545';
        } else {
            document.getElementById('confirmPassword').classList.add('is-valid');
            document.getElementById('confirmPassword').classList.remove('is-invalid');
            mensajeDiv.style.display = 'block';
            mensajeDiv.innerHTML = '✅ Las contraseñas coinciden';
            mensajeDiv.style.color = '#28a745';
        }
    }

    // Función genérica de validación para otros campos
    function validarCampo(campoId, reglas, mensajeExito) {
        const input = document.getElementById(campoId);
        const valor = campoId === 'nombre' || campoId === 'correo' ? input.value.trim() : input.value;
        const mensajeDiv = mensajes[campoId];
        
        if (valor === '') {
            input.classList.remove('is-invalid', 'is-valid');
            mensajeDiv.style.display = 'none';
            return;
        }
        
        for (let regla of reglas) {
            if (regla.condicion) {
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
                mensajeDiv.style.display = 'block';
                mensajeDiv.innerHTML = regla.mensaje;
                mensajeDiv.style.color = '#dc3545';
                return;
            }
        }
        
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        mensajeDiv.style.display = 'block';
        mensajeDiv.innerHTML = mensajeExito;
        mensajeDiv.style.color = '#28a745';
    }

    // Validación al enviar
    registroForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Forzar validaciones
        document.getElementById('nombre').dispatchEvent(new Event('input'));
        document.getElementById('correo').dispatchEvent(new Event('input'));
        document.getElementById('password').dispatchEvent(new Event('input'));
        validarConfirmacion(); // Llamar directamente a la función de confirmación
        
        // Verificar si todo es válido
        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirmPassword').value;
        
        const nombreValido = nombre.length >= 3 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
        const passwordValido = password.length >= 6 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password);
        const confirmValido = password === confirm && passwordValido;
        
        if (nombreValido && correoValido && passwordValido && confirmValido) {
            alert('✅ ¡Registro exitoso!');
            registroForm.reset();
            ['nombre', 'correo', 'password', 'confirmPassword'].forEach(id => {
                document.getElementById(id).classList.remove('is-invalid', 'is-valid');
                if (id === 'confirmPassword') {
                    mensajes.confirm.style.display = 'none';
                } else {
                    mensajes[id].style.display = 'none';
                }
            });
            setTimeout(() => window.location.href = 'Login.html', 1500);
        } else {
            let errores = [];
            if (!nombreValido) errores.push('• Nombre inválido (mínimo 3 letras)');
            if (!correoValido) errores.push('• Correo inválido');
            if (!passwordValido) errores.push('• Contraseña inválida (mínimo 6, mayúscula, minúscula, número)');
            if (!confirmValido) errores.push('• Las contraseñas no coinciden');
            alert('❌ Errores:\n' + errores.join('\n'));
        }
    });
});