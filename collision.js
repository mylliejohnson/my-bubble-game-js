// CIRCLE/RECTANGLE
function circleRect(cx, cy, radius, rx, ry, rw, rh) {
  // temporary variables to set edges for testing
  testX = cx;
  testY = cy;

  // which edge is closest?
  if (cx < rx) testX = rx -5; // test left edge
  else if (cx > rx + rw) testX = rx + (rw - 5); // right edge
  if (cy < ry) testY = ry; // top edge
  else if (cy > ry + rh) testY = ry + (rh -5); // bottom edge

  // get distance from closest edges
  distX = cx - testX;
  distY = cy - testY;
  distance = Math.sqrt(distX * distX + distY * distY);

  // if the distance is less than the radius, collision!
  if (distance <= radius) {
    return true;
  }
  return false;
}
