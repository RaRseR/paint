const canvas = document.getElementById('canvas');
canvas.height = window.innerHeight - 100;
canvas.width = window.innerWidth;

const ctx = canvas.getContext('2d');

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let prevX = null;
let prevY = null;

ctx.lineWidth = 1;

let isDraw = false;

canvas.addEventListener('mousedown', () => (isDraw = true));

canvas.addEventListener('mouseup', () => (isDraw = false));

canvas.addEventListener('mousemove', draw);

document.getElementById('send').addEventListener('click', send);
document.getElementById('clear').addEventListener('click', clear);
document.getElementById('lineColor').addEventListener('input', changeLineColor);
document.getElementById('lineWidth').addEventListener('input', changeLineWidth);

function draw(event) {
  if (prevX == null || prevY == null || !isDraw) {
    prevX = event.clientX;
    prevY = event.clientY;
    return;
  }

  let currentX = event.clientX;
  let currentY = event.clientY;

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  prevX = currentX;
  prevY = currentY;
}

async function send() {
  const data = canvas.toDataURL('imag/png');

  await fetch("/send-img", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function changeLineColor(event) {
  ctx.strokeStyle = event.target.value;
}

function changeLineWidth(event) {
  ctx.lineWidth = event.target.value;
}