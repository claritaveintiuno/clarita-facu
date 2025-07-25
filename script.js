function mostrarInfo(elemento) {
  // Alterna la clase "tachado" al hacer clic
  if (elemento.classList.contains("tachado")) {
    elemento.classList.remove("tachado");
  } else {
    elemento.classList.add("tachado");
  }
}
