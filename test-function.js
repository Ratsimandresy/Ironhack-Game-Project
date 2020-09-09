function maxVal(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// Find the closest point to the circle within the rectangle
// Assumes axis alignment! ie rect must not be rotated
let closestX = maxVal(circle.X, rectangle.x, rectangle.x + rectangle.width);
let closestY = maxVal(circle.Y, rectangle.y, rectangle.y + rectangle.height);

// Calculate the distance between the circle's center and this closest point
let distanceX = circle.X - closestX;
let distanceY = circle.Y - closestY;

// If the distance is less than the circle's radius, an intersection occurs
let distanceSquared = distanceX * distanceX + distanceY * distanceY;
return distanceSquared < circle.Radius * circle.Radius;

// expensive alternative:
function intersects(circle, rect) {
  let circleDistance = {
    x: Math.abs(circle.x - rect.x),
    y: Math.abs(circle.y - rect.y),
  };
  if (circleDistance.x > rect.width / 2 + circle.r) {
    return false;
  }
  if (circleDistance.y > rect.height / 2 + circle.r) {
    return false;
  }

  if (circleDistance.x <= rect.width / 2) {
    return true;
  }
  if (circleDistance.y <= rect.height / 2) {
    return true;
  }

  cornerDistanceSq =
    Math.sqr(circleDistance.x - rect.width / 2) +
    Math.sqr(circleDistance.y - rect.height / 2);

  return cornerDistanceSq <= Math.sqr(circle.r);
}
