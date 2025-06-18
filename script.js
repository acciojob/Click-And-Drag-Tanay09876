const container = document.getElementById('container');
const cubes = document.querySelectorAll('.cube');

const containerRect = container.getBoundingClientRect();
const cubeSize = 80; 
const padding = 20;
const gap = 20;

// Arrange cubes in grid positions
cubes.forEach((cube, index) => {
  const cols = 4;
  const row = Math.floor(index / cols);
  const col = index % cols;
  const left = padding + col * (cubeSize + gap);
  const top = padding + row * (cubeSize + gap);

  cube.style.left = `${left}px`;
  cube.style.top = `${top}px`;
});

let selectedCube = null;
let offsetX, offsetY;

cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});

function onMouseMove(e) {
  if (!selectedCube) return;

  const x = e.clientX - containerRect.left - offsetX;
  const y = e.clientY - containerRect.top - offsetY;

  const maxX = container.clientWidth - cubeSize;
  const maxY = container.clientHeight - cubeSize;

  const boundedX = Math.min(Math.max(0, x), maxX);
  const boundedY = Math.min(Math.max(0, y), maxY);

  selectedCube.style.left = `${boundedX}px`;
  selectedCube.style.top = `${boundedY}px`;
}

function onMouseUp() {
  if (!selectedCube) return;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  selectedCube = null;
}
