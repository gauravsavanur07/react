let knightPosition = [0, 0];
let observer = null;

export const emitChange = () => observer(knightPosition);
export const observe = newObserver => {
  if (observer) throw new Error('ты втираешь мне какую-то дичь');

  observer = newObserver;
  emitChange();
};

export function moveKnight(x, y) {
  knightPosition = [x, y];
  emitChange();
}

export function canMoveKnight(toX, toY) {
  const [x, y] = knightPosition;
  const dx = toX - x;
  const dy = toY - y;

  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
         (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
export const observeRandom = receive =>
  setInterval(() => receive([rand(0, 8), rand(0, 8)]), 500);
