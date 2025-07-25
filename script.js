const correlatividades = {
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

// ✅ Al hacer clic en una materia
function mostrarInfo(elemento) {
  if (elemento.classList.contains("deshabilitada")) return;

  const nombre = elemento.innerText;
  elemento.classList.toggle("tachado");

  if (elemento.classList.contains("tachado")) {
    localStorage.setItem(nombre, "tachado");
  } else {
    localStorage.removeItem(nombre);
  }

  actualizarHabilitadas();
}

// ✅ Al cargar la página
window.onload = function () {
  const materias = document.querySelectorAll(".materia");

  // Primero restauramos las tachadas
  materias.forEach(materia => {
    const nombre = materia.innerText;
    if (localStorage.getItem(nombre) === "tachado") {
      materia.classList.add("tachado");
    }
  });

  // Luego actualizamos las materias habilitadas
  actualizarHabilitadas();
};

// ✅ Actualiza la habilitación según correlatividades
function actualizarHabilitadas() {
  const materias = document.querySelectorAll(".materia");

  materias.forEach(materia => {
    const nombre = materia.innerText;
    const requisitos = correlatividades[nombre];

    if (!requisitos || requisitos.length === 0) {
      materia.classList.remove("deshabilitada");
    } else {
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
