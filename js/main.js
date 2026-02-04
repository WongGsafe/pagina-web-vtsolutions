// Placeholder para futuras interacciones
console.log("VT Solutions landing page cargada correctamente");

//Seleccionar el formulario
const form = document.getElementById("form-contacto");

//Seleccionar los inputs
const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const mensajeInput = document.getElementById("mensaje");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // evita recargar la página

  const nombre = nombreInput.value.trim(); // quitar espacios
  const email = emailInput.value.trim();
  const mensaje = mensajeInput.value.trim();

  // Validación del nombre
  if(nombre.length < 3){
      alert("El nombre debe ser mayor a 3 caracteres");
      nombreInput.focus();
      return;
  }

  // Validación del correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
      alert("Ingrese un correo válido");
      emailInput.focus();
      return;
  }

  // Validación del mensaje
  if(mensaje.length < 10){
      alert("El mensaje debe tener al menos 10 caracteres");
      mensajeInput.focus();
      return;
  }

  // Si todo está bien
  alert("¡Formulario enviado correctamente!");
  form.reset(); // opcional: limpia el formulario
});