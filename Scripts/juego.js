const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let pausado = false;

let naveImg = new Image();
naveImg.src = "../IMG/nave.png";

// Cargar aliens
let alienImgs = [];
for (let i = 1; i <= 5; i++) {
  let img = new Image();
  img.src = `../IMG/alien-juego.png`;
  alienImgs.push(img);
}

let etiquetas = [
  { apertura: "<html>", cierre: "</html>" },
  { apertura: "<head>", cierre: "</head>" },
  { apertura: "<body>", cierre: "</body>" },
  { apertura: "<title>", cierre: "</title>" },
  { apertura: "<div>", cierre: "</div>" },
  { apertura: "<h1>", cierre: "</h1>" },
  { apertura: "<p>", cierre: "</p>" },
  { apertura: "<section>", cierre: "</section>" },
  { apertura: "<main>", cierre: "</main>" },
  { apertura: "<footer>", cierre: "</footer>" }
];

let etiquetaActual = etiquetas[Math.floor(Math.random() * etiquetas.length)];
document.getElementById("etiqueta-abierta").textContent = etiquetaActual.apertura;
let puntaje = 0;

let nave = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 60,
  width: 50,
  height: 40,
  velocidad: 7
};

let teclas = {};

let aliens = [];
for (let i = 0; i < 5; i++) {
  aliens.push({
    x: 100 + i * 120,
    y: 50,
    width: 50,
    height: 40,
    imagen: alienImgs[i]
  });
}

let proyectil = null;

function lanzarProyectil() {
  let alienIndex = Math.floor(Math.random() * aliens.length);
  let alien = aliens[alienIndex];
  proyectil = {
    x: alien.x + alien.width / 2 - 50,
    y: alien.y + alien.height,
    width: 100,
    height: 30,
    etiqueta: etiquetaActual.cierre,
    velocidad: 2
  };
}

function cambiarEtiqueta() {
  etiquetaActual = etiquetas[Math.floor(Math.random() * etiquetas.length)];
  document.getElementById("etiqueta-abierta").textContent = etiquetaActual.apertura;
  lanzarProyectil();
}

function dibujarAliens() {
  aliens.forEach(alien => {
    ctx.drawImage(alien.imagen, alien.x, alien.y, alien.width, alien.height);
  });
}

function dibujarNave() {
  ctx.drawImage(naveImg, nave.x, nave.y, nave.width, nave.height);
  ctx.fillStyle = "cyan";
  ctx.font = "16px Courier New";
  ctx.fillText(etiquetaActual.apertura, nave.x - 10, nave.y + nave.height + 20);
}

function dibujarProyectil() {
  if (proyectil) {
    ctx.fillStyle = "red";
    ctx.fillRect(proyectil.x, proyectil.y, proyectil.width, proyectil.height);
    ctx.fillStyle = "white";
    ctx.font = "14px Courier New";
    ctx.fillText(proyectil.etiqueta, proyectil.x + 5, proyectil.y + 20);
  }
}

function moverProyectil() {
  if (proyectil) {
    proyectil.y += proyectil.velocidad;

    if (
      proyectil.y + proyectil.height > nave.y &&
      proyectil.x < nave.x + nave.width &&
      proyectil.x + proyectil.width > nave.x
    ) {
      puntaje += 10;
      document.getElementById("puntaje").textContent = puntaje;
      cambiarEtiqueta();
    }

    if (proyectil.y > canvas.height) {
      puntaje -= 5;
      document.getElementById("puntaje").textContent = puntaje;
      cambiarEtiqueta();
    }
  }
}

function moverNave() {
  if (teclas["ArrowLeft"] && nave.x > 0) nave.x -= nave.velocidad;
  if (teclas["ArrowRight"] && nave.x + nave.width < canvas.width) nave.x += nave.velocidad;
}

function actualizar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarAliens();
  dibujarNave();
  dibujarProyectil();

  if (!pausado) {
    moverNave();
    moverProyectil();
  }

  requestAnimationFrame(actualizar);
}

// Control del teclado
document.addEventListener("keydown", (e) => teclas[e.key] = true);
document.addEventListener("keyup", (e) => teclas[e.key] = false);

// Botón de pausa
const pausarBtn = document.getElementById("pausarBtn");
pausarBtn.addEventListener("click", () => {
  pausado = !pausado;
  pausarBtn.textContent = pausado ? "▶️ Reanudar" : "⏸️ Pausar";
});

// Iniciar juego
lanzarProyectil();
actualizar();
