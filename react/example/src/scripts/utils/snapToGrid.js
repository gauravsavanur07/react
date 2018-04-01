export default function (x, y, cellSize = 10) {
  const snappedX = Math.round(x / cellSize) * cellSize;
  const snappedY = Math.round(y / cellSize) * cellSize;

  return [snappedX, snappedY];
}
