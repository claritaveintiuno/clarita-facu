function mostrarInfo(materia) {
  let texto = '';

  if (materia === 'Matemáticas') {
    texto = 'Esta materia es base para muchas otras.';
  } else if (materia === 'Programación') {
    texto = 'Aquí aprenderás a escribir código.';
  }

  document.getElementById('info').innerText = texto;
}
