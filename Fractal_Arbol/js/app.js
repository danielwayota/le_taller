function fractalTree(start, length, branches, arc, baseAngle, step) {
  if (step <= 0) { return }

  const angleStep = arc / branches
  const halfArc = arc / 2

  let angle = baseAngle - halfArc

  for (let i = 0; i <= branches; i++) {
    const end = {
      x: start.x + Math.cos(angle) * length,
      y: start.y + Math.sin(angle) * length,
    }

    line(start.x, start.y, end.x, end.y)

    fractalTree(end, length * 0.8, branches, arc, angle, step - 1)
    angle += angleStep
  }
  
}

function setup() {
  const canvas = createCanvas(640 * 2, 480 * 2)
  canvas.parent('#canvasHolder')
}

let tick = 0

function draw() {
  background(0)
  translate(width / 2, height - 100)

  const arc = (PI / 2) * Math.sin(tick)

  noFill()
  stroke(55, 253, 23)
  fractalTree(
    { x: 0, y: 0 },
    100,
    3,
    (PI / 3), -(PI / 2),
    6
  )

  tick += 0.002
}