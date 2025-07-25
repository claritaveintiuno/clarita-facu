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
function mostrarInfo(elemento) {
  if (elemento.classList.contains("deshabilitada")) return; // 🔒 No hacer nada si está bloqueada

  const nombre = elemento.innerText;
  elemento.classList.toggle("tachado");

  if (elemento.classList.contains("tachado")) {
    localStorage.setItem(nombre, "tachado");
  } else {
    localStorage.removeItem(nombre);
  }

  actualizarHabilitadas(); // 🔄 Verificamos si otras materias se desbloquean
}

// ✅ Esta función se ejecuta al cargar la página
window.onload = function () {
  const materias = document.querySelectorAll(".materia");

  // Primero actualizamos qué materias deben estar habilitadas o deshabilitadas
  actualizarHabilitadas();

  // Luego restauramos las tachadas
  materias.forEach(materia => {
    const nombre = materia.innerText;
    if (localStorage.getItem(nombre) === "tachado") {
      materia.classList.add("tachado");
    }
  });

  actualizarHabilitadas(); // Se vuelve a correr por si al restaurar se liberan nuevas materias
};

// ✅ Revisa correlatividades y aplica clases para deshabilitar las materias bloqueadas
function actualizarHabilitadas() {
  const todas = document.querySelectorAll(".materia");

  todas.forEach(materia => {
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
