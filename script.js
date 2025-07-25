function mostrarInfo(elemento, materia) {
  console.log("Click detectado en: " + materia);
  let info = {
    "ANATOMÍA DESCRIPTIVA Y TOPOGRÁFICA I": "Estudia la estructura del cuerpo humano.",
    "BIOQUÍMICA": "Analiza procesos químicos en seres vivos.",
    "NUTRICIÓN NORMAL": "Conceptos básicos sobre alimentación saludable.",
    "EDUCACIÓN PARA LA SALUD": "Promueve hábitos saludables en la población.",
    "INTRODUCCIÓN AL PENSAMIENTO CIENTÍFICO I": "Primeros pasos en el método científico.",
    "BIOFÍSICA": "Aplica física a los sistemas biológicos.",
    "PSICOSOCIALES": "Estudia factores psicológicos y sociales en la salud.",
    "EMBRIOLOGÍA Y DESARROLLO": "Estudia el desarrollo del ser humano desde la concepción.",
    "NUTRICIÓN DEL NIÑO Y ADOLESCENTE SANO": "Necesidades nutricionales durante el crecimiento."
  };

  // Mostrar la descripción
  document.getElementById('info').innerText = info[materia] || "Materia sin descripción aún.";

  // Tachar o destachar
  elemento.classList.toggle("tachado");
}
