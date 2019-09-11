let xOff = 0.0;
let yOff = 1.0;
let moveSpeed = 0.005;
let mouseSpeed = 0;
let g;
let h;
let i;
const slowDown = 30; // in frames
const maxSpeed = 30;

function setup() {
  createCanvas(640, 640);
  // noCursor();
  g = new hunter();
  h = new prey();
  i = new coin();
}
function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}
function draw() {

  background(204);
  let x = noise(xOff) * width;
  let y = noise(yOff) * height;
  // xOff += moveSpeed;
  // yOff += moveSpeed;
  const distX = x - mouseX;
  const distY = y - mouseY;
  const distance = Math.sqrt(distX * distX + distY + distY);
  const redness = clamp(map(distance, 0, Math.sqrt(width * width + height * height) / 2, 255, 0), 0, 255);

  // console.log(distX, distY, distance, redness);

  stroke(redness, 0, 0);
  fill(255);
  rect(x - 5, y - 5, 10, 10)
  line(x, 0, x, height);
  line(0, y, width, y);




  const deltaMouseX = winMouseX - pwinMouseX;
  const deltaMouseY = winMouseY - pwinMouseY;
  const speed = Math.sqrt(deltaMouseX * deltaMouseX + deltaMouseY * deltaMouseY);

  mouseSpeed = clamp((mouseSpeed * slowDown + speed) / (slowDown + 1), 0, maxSpeed);


  if (isNaN(mouseSpeed)) {
    mouseSpeed = 0;
    console.log(deltaMouseX, deltaMouseY, speed, "NAN");
  }
  else {
    console.log(mouseSpeed);
  }

  const blueness = map(mouseSpeed, 0, maxSpeed, 255, 0);

  stroke(0);
  fill(blueness, blueness, 255);

  ellipse(mouseX, mouseY, 10, 10);
  moveSpeed = moveSpeed + .000001;
  if (x == mouseX) { noLoop(); }
}
