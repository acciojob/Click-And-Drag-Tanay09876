// Your code here.
const container = document.getElementById('container');
const cubes = document.querySelectorAll('.cube');

let offsetX, offsetY, isDragging = false, activeCube = null;


const gridSize = 100 + 4; 
cubes.forEach((cube, i) => {
  const row = Math.floor(i / 5);
  const col = i % 5;
  cube.style.left = `${col * gridSize}px`;
  cube.style.top = `${row * gridSize}px`;
});

// Drag logic
cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    activeCube = cube;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    cube.style.zIndex = 1000; 
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !activeCube) return;

  const containerRect = container.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Boundaries
  x = Math.max(0, Math.min(container.clientWidth - activeCube.offsetWidth, x));
  y = Math.max(0, Math.min(container.clientHeight - activeCube.offsetHeight, y));

  activeCube.style.left = `${x}px`;
  activeCube.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
  if (activeCube) activeCube.style.zIndex = 1;
  isDragging = false;
  activeCube = null;
});
