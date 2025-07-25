// 🔗 Mapa de correlatividades: materia => lista de materias que deben estar tachadas antes
const correlatividades = {
  // ⬇ Segundo año
  "FISIOLOGÍA": [
    "ANATOMÍA DESCRIPTIVA Y TOPOGRÁFICA I",
    "BIOQUÍMICA",
    "BIOFÍSICA",
    "EMBRIOLOGÍA Y DESARROLLO"
  ],
  "TÉCNICAS Y MANEJO DE ALIMENTOS": [
    "BIOQUÍMICA",
    "NUTRICIÓN NORMAL",
    "BIOFÍSICA"
  ],
  "PSICOLOGÍA SOCIAL E INSTITUCIONAL": [
    "EDUCACIÓN PARA LA SALUD",
    "PSICOSOCIALES",
    "EMBRIOLOGÍA Y DESARROLLO"
  ],
  "EPIDEMIOLOGÍA": [
    "INTRODUCCIÓN AL PENSAMIENTO CIENTÍFICO I"
  ],
  "BROMATOLOGÍA Y TECNOLOGÍA DE LOS ALIMENTOS": [
    "BIOQUÍMICA",
    "NUTRICIÓN NORMAL"
  ],
  "ATENCIÓN PRIMARIA DE LA SALUD": [
    "NUTRICIÓN NORMAL",
    "EDUCACIÓN PARA LA SALUD",
    "INTRODUCCIÓN AL PENSAMIENTO CIENTÍFICO I",
    "PSICOSOCIALES",
    "EMBRIOLOGÍA Y DESARROLLO",
    "NUTRICIÓN DEL NIÑO Y ADOLESCENTE SANO"
  ],
  "ADMINISTRACIÓN, ORGANIZACIÓN Y GESTIÓN DE SERVICIOS": [
    "PSICOLOGÍA SOCIAL E INSTITUCIONAL"
  ]
};

// ✅ Esta función se llama cuando tocás una materia
// Alterna el tachado y guarda en localStorage
function mostrarInfo(elemento) {
  const nombre = elemento.innerText;
  elemento.classList.toggle("tachado");

  // Guardamos o quitamos en el almacenamiento local
  if (elemento.classList.contains("tachado")) {
    localStorage.setItem(nombre, "tachado");
  } else {
    localStorage.removeItem(nombre);
  }

  actualizarHabilitadas(); // Actualizamos habilitación de materias correlativas
}

// ✅ Esta función se ejecuta cuando se abre la página
// Recupera el progreso guardado y actualiza la interfaz
window.onload = function () {
  const materias = document.querySelectorAll(".materia");
  materias.forEach(materia => {
    const nombre = materia.innerText;
    if (localStorage.getItem(nombre) === "tachado") {
      materia.classList.add("tachado");
    }
  });

  actualizarHabilitadas(); // Habilita o deshabilita según progreso
};

// ✅ Esta función revisa correlatividades y deshabilita las materias que aún no pueden cursarse
function actualizarHabilitadas() {
  const todas = document.querySelectorAll(".materia");

  todas.forEach(materia => {
    const nombre = materia.innerText;
    const requisitos = correlatividades[nombre];

    if (!requisitos || requisitos.length === 0) {
      // Sin requisitos, se habilita siempre
      materia.classList.remove("deshabilitada");
    } else {
      // Revisión de requisitos: todos deben estar tachados
      const habilitada = requisitos.every(req => {
        return localStorage.getItem(req) === "tachado";
      });

      if (habilitada) {
        materia.classList.remove("deshabilitada");
      } else {
        materia.classList.add("deshabilitada");
      }
    }
  });
}
