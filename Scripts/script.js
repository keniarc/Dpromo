function moveImage(section) {
  const img = document.getElementById('floating-img');
  switch(section) {
    case 'inicio':
      img.style.left = '15%';
      break;
    case 'especialidad':
      img.style.left = '35%';
      break;
    case 'proyectos':
      img.style.left = '55%';
      break;
    case 'contacto':
      img.style.left = '75%';
      break;
  }
}

function explode(button) {
  button.classList.add('explode');
  setTimeout(() => {
    button.style.visibility = 'hidden';
  }, 500);
}
