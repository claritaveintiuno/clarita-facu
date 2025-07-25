// 🔗 Mapa de correlatividades
const correlatividades = {
  "FISIOLOGÍA": [
    "Anatomía Descriptiva y Topográfica I",
    "Bioquímica",
    "Biofísica",
    "Embriología y Desarrollo"
  ],
  "TÉCNICAS Y MANEJO DE ALIMENTOS": [
    "Bioquímica",
    "Nutrición Normal",
    "Biofísica"
  ],
  "PSICOLOGÍA SOCIAL E INSTITUCIONAL": [
    "Educación para la Salud",
    "Psicosociales",
    "Embriología y Desarrollo"
  ],
  "EPIDEMIOLOGÍA": [
    "Introducción al Pensamiento Científico I"
  ],
  "BROMATOLOGÍA Y TECNOLOGÍA DE LOS ALIMENTOS": [
    "Bioquímica",
    "Nutrición Normal"
  ],
  "ATENCIÓN PRIMARIA DE LA SALUD": [
    "Nutrición Normal",
    "Educación para la Salud",
    "Introducción al Pensamiento Científico I",
    "Psicosociales",
    "Embriología y Desarrollo",
    "Nutrición del Niño y Adolescente Sano"
  ],
  "ADMINISTRACIÓN, ORGANIZACIÓN Y GESTIÓN DE SERVICIOS": [
    "PSICOLOGÍA SOCIAL E INSTITUCIONAL"
  ]
};

// ✅ Al hacer clic en una materia
function mostrarInfo(elemento, nombre = null) {
  if (elemento.classList.contains("deshabilitada")) return;

  // Usa el nombre pasado o el texto del elemento
  nombre = nombre || elemento.innerText;
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

  // Restaurar tachado desde localStorage
  materias.forEach(materia => {
    const nombre = materia.innerText;
    if (localStorage.getItem(nombre) === "tachado") {
      materia.classList.add("tachado");
    }
  });

  actualizarHabilitadas(); // Verifica habilitación después de restaurar
};

// ✅ Habilita o deshabilita materias según sus requisitos
function actualizarHabilitadas() {
  const materias = document.querySelectorAll(".materia");

  materias.forEach(materia => {
    const nombre = materia.innerText;
    const requisitos = correlatividades[nombre.toUpperCase()] || correlatividades[nombre];

    if (!requisitos || requisitos.length === 0) {
      materia.classList.remove("deshabilitada");
    } else {
      const habilitada = requisitos.every(req => localStorage.getItem(req) === "tachado");

      if (habilitada) {
        materia.classList.remove("deshabilitada");
      } else {
        materia.classList.add("deshabilitada");
      }
    }
  });
}
