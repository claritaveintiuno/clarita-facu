// Guardar o quitar tachado en localStorage
function mostrarInfo(elemento) {
  const nombre = elemento.innerText;
  elemento.classList.toggle("tachado");

  if (elemento.classList.contains("tachado")) {
    localStorage.setItem(nombre, "tachado");
  } else {
    localStorage.removeItem(nombre);
  }

  actualizarHabilitadas();
}

// Al cargar la página, aplicar el estado guardado
window.onload = function () {
  const materias = document.querySelectorAll(".materia");
  materias.forEach(materia => {
    const nombre = materia.innerText;
    if (localStorage.getItem(nombre) === "tachado") {
      materia.classList.add("tachado");
    }
  });

  actualizarHabilitadas();
};

// Habilitar solo materias después de una tachada
function actualizarHabilitadas() {
  const bloques = document.querySelectorAll(".materias");
  
  bloques.forEach(bloque => {
    const materias = bloque.querySelectorAll(".materia");
    let habilitar = true;

    materias.forEach(materia => {
      if (!materia.classList.contains("tachado") && habilitar) {
        materia.classList.remove("deshabilitada");
        habilitar = false;
      } else if (!materia.classList.contains("tachado")) {
        materia.classList.add("deshabilitada");
      }
    });
  });
}
