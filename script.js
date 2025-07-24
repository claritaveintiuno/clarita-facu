function mostrarInfo(elemento, materia) {
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

  document.getElementById('info').innerText = info[materia] || "Materia sin descripción aún.";

  // 🔁 Agrega o quita la clase 'tachado'
  elemento.classList.toggle("tachado");
}
