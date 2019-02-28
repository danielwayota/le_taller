function drawFractal(centre, vertexCount, radius, radiusReductor, iteration) {
  if (iteration <= 0) {
    return
  }

  let alpha = 0
  const alphaStep = (PI*2) / vertexCount

  const vertices = []

  beginShape()
  for (let i = 0; i <= vertexCount; i++) {
    const v = {
      x: centre.x + Math.cos(alpha) * radius,
      y: centre.y + Math.sin(alpha) * radius
    }

    alpha += alphaStep
    vertices.push(v)
    vertex(v.x, v.y)
  }
  endShape()

  for(let vert of vertices) {
    drawFractal(vert, vertexCount, radius * radiusReductor, radiusReductor, iteration - 1)
  }
}

function setup() {
  createCanvas(640, 480)

  background(0)
}
let angle = 0
function draw() {
  background(Math.abs(255 * Math.cos(angle)))

  translate(width / 2, height / 2)
  rotate(angle)

  angle += 0.005

  noFill()
  stroke(Math.abs(255 * Math.sin(angle)))
  drawFractal({x: 0, y: 0}, 8, 100, 0.5, 3)
}