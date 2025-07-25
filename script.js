document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");
  const aprobadas = JSON.parse(localStorage.getItem("materiasAprobadas")) || [];

  // Correlatividades
  const correlatividades = {
    // SEGUNDO AÑO
    "FISIOLOGÍA": ["ANATOMÍA DESCRIPTIVA Y TOPOGRÁFICA I", "BIOFÍSICA"],
   "TÉCNICAS Y MANEJO DE ALIMENTOS": ["BIOQUÍMICA", "NUTRICIÓN NORMAL", "BIOFÍSICA"],
    "PSICOLOGÍA SOCIAL E INSTITUCIONAL": ["PSICOSOCIALES"],
    "EPIDEMIOLOGÍA": ["EDUCACIÓN PARA LA SALUD"],
    "BROMATOLOGÍA Y TECNOLOGÍA DE LOS ALIMENTOS": ["BIOQUÍMICA"],
    "ATENCIÓN PRIMARIA DE LA SALUD": ["EDUCACIÓN PARA LA SALUD"],
    "ADMINISTRACIÓN, ORGANIZACIÓN Y GESTIÓN DE SERVICIOS": ["EDUCACIÓN PARA LA SALUD"],

    // TERCER AÑO
    "TÉCNICA DIETOTERÁPICA": [
      "ANATOMÍA DESCRIPTIVA Y TOPOGRÁFICA I", "BIOQUÍMICA", "NUTRICIÓN NORMAL", "EDUCACIÓN PARA LA SALUD",
      "INTRODUCCIÓN AL PENSAMIENTO CIENTÍFICO I", "BIOFÍSICA", "PSICOSOCIALES", "EMBRIOLOGÍA Y DESARROLLO",
      "NUTRICIÓN DEL NIÑO Y ADOLESCENTE SANO", "FISIOLOGÍA", "TÉCNICAS Y MANEJO DE ALIMENTOS", "BROMATOLOGÍA Y TECNOLOGÍA DE LOS ALIMENTOS"
    ],
    "FISIOPATOLOGÍA Y DIETOTERAPIA DEL ADULTO": [
      "ANATOMÍA DESCRIPTIVA Y TOPOGRÁFICA I", "BIOQUÍMICA", "NUTRICIÓN NORMAL", "EDUCACIÓN PARA LA SALUD",
      "INTRODUCCIÓN AL PENSAMIENTO CIENTÍFICO I", "BIOFÍSICA", "PSICOSOCIALES", "EMBRIOLOGÍA Y DESARROLLO",
      "NUTRICIÓN DEL NIÑO Y ADOLESCENTE SANO", "FISIOLOGÍA", "TÉCNICAS Y MANEJO DE ALIMENTOS", "BROMATOLOGÍA Y TECNOLOGÍA DE LOS ALIMENTOS"
    ],
    "ATENCIÓN COMUNITARIA I": [
      "ANATOMÍA DESCRIPTIVA Y TOPOGRÁFICA I", "BIOQUÍMICA", "NUTRICIÓN NORMAL", "EDUCACIÓN PARA LA SALUD",
      "INTRODUCCIÓN AL PENSAMIENTO CIENTÍFICO I", "BIOFÍSICA", "PSICOSOCIALES", "EMBRIOLOGÍA Y DESARROLLO",
      "NUTRICIÓN DEL NIÑO Y ADOLESCENTE SANO", "FISIOLOGÍA", "TÉCNICAS Y MANEJO DE ALIMENTOS", "BROMATOLOGÍA Y TECNOLOGÍA DE LOS ALIMENTOS"
    ],
    "MICROBIOLOGÍA": [
      "ANATOMÍA DESCRIPTIVA Y TOPOGRÁFICA I", "BIOQUÍMICA", "NUTRICIÓN NORMAL", "EDUCACIÓN PARA LA SALUD",
      "INTRODUCCIÓN AL PENSAMIENTO CIENTÍFICO I", "BIOFÍSICA", "PSICOSOCIALES", "EMBRIOLOGÍA Y DESARROLLO",
      "NUTRICIÓN DEL NIÑO Y ADOLESCENTE SANO", "FISIOLOGÍA", "TÉCNICAS Y MANEJO DE ALIMENTOS", "BROMATOLOGÍA Y TECNOLOGÍA DE LOS ALIMENTOS"
    ],
    "FARMACOLOGÍA GENERAL": [
      "ANATOMÍA DESCRIPTIVA Y TOPOGRÁFICA I", "BIOQUÍMICA", "NUTRICIÓN NORMAL", "EDUCACIÓN PARA LA SALUD",
      "INTRODUCCIÓN AL PENSAMIENTO CIENTÍFICO I", "BIOFÍSICA", "PSICOSOCIALES", "EMBRIOLOGÍA Y DESARROLLO",
      "NUTRICIÓN DEL NIÑO Y ADOLESCENTE SANO", "FISIOLOGÍA"
    ],
    "FISIOPATOLOGÍA Y DIETOTERAPIA DEL NIÑO Y DEL ADOLESCENTE": [
      "ANATOMÍA DESCRIPTIVA Y TOPOGRÁFICA I", "BIOQUÍMICA", "NUTRICIÓN NORMAL", "EDUCACIÓN PARA LA SALUD",
      "INTRODUCCIÓN AL PENSAMIENTO CIENTÍFICO I", "BIOFÍSICA", "PSICOSOCIALES", "EMBRIOLOGÍA Y DESARROLLO",
      "NUTRICIÓN DEL NIÑO Y ADOLESCENTE SANO", "FISIOLOGÍA", "TÉCNICAS Y MANEJO DE ALIMENTOS"
    ],
    "ANTROPOLOGÍA, CULTURA Y NUTRICIÓN": [
      "ANATOMÍA DESCRIPTIVA Y TOPOGRÁFICA I", "BIOQUÍMICA", "NUTRICIÓN NORMAL", "EDUCACIÓN PARA LA SALUD",
      "INTRODUCCIÓN AL PENSAMIENTO CIENTÍFICO I", "BIOFÍSICA", "PSICOSOCIALES", "EMBRIOLOGÍA Y DESARROLLO",
      "NUTRICIÓN DEL NIÑO Y ADOLESCENTE SANO", "PSICOLOGÍA SOCIAL E INSTITUCIONAL", "ATENCIÓN PRIMARIA DE LA SALUD"
    ],
    "TOXICOLOGÍA DE LOS ALIMENTOS": [
      "ANATOMÍA DESCRIPTIVA Y TOPOGRÁFICA I", "BIOQUÍMICA", "NUTRICIÓN NORMAL", "EDUCACIÓN PARA LA SALUD",
      "INTRODUCCIÓN AL PENSAMIENTO CIENTÍFICO I", "BIOFÍSICA", "PSICOSOCIALES", "EMBRIOLOGÍA Y DESARROLLO",
      "NUTRICIÓN DEL NIÑO Y ADOLESCENTE SANO", "TÉCNICAS Y MANEJO DE ALIMENTOS", "BROMATOLOGÍA Y TECNOLOGÍA DE LOS ALIMENTOS"
    ]
  };

  function actualizarEstadoMaterias() {
    materias.forEach(materia => {
      const nombre = materia.textContent.trim().toUpperCase();

      if (aprobadas.includes(nombre)) {
        materia.classList.add("tachado");
        materia.classList.remove("deshabilitada");
        return;
      }

      const requisitos = correlatividades[nombre];
      if (requisitos) {
        const habilitada = requisitos.every(req => aprobadas.includes(req));
        materia.classList.toggle("deshabilitada", !habilitada);
      }
    });
  }

  materias.forEach(materia => {
    materia.addEventListener("click", () => {
      const nombre = materia.textContent.trim().toUpperCase();
      if (materia.classList.contains("deshabilitada")) return;

      materia.classList.toggle("tachado");
      if (materia.classList.contains("tachado")) {
        if (!aprobadas.includes(nombre)) aprobadas.push(nombre);
      } else {
        const index = aprobadas.indexOf(nombre);
        if (index > -1) aprobadas.splice(index, 1);
      }

      localStorage.setItem("materiasAprobadas", JSON.stringify(aprobadas));
      actualizarEstadoMaterias();
    });
  });

  actualizarEstadoMaterias();
});
