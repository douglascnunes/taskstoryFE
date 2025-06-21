export function getColorFromAngle(angle) {
  if (angle > 900) {
    const gray = angle - 900;
    return `hsl(0, 0%, ${gray}%)`; // tons de cinza
  } else {
    return `hsl(${angle}, 50%, 50%)`; // cor HSL com saturação e luminosidade fixas
  }
};