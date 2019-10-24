const W = 800
const H = 800

let n = 1
let c = 5

let angle = 137.5 * (Math.PI / 180)

// ----------------------------------------
function setup() {
  const canvas = createCanvas(W, H)
  canvas.parent('#canvasHolder')

  background(0)
  noStroke()

  colorMode(HSB)
}
// ----------------------------------------
function draw() {
  translate(width / 2, height / 2)

  let phi = n * angle
  let r = c * Math.sqrt(n)

  let x = r * Math.cos(phi)
  let y = r * Math.sin(phi)

  fill(((phi - r) / 10) % 255, 255, 255)
  ellipse(x, y, 8, 8)


  n++
}
