const W = 640*2
const H = 480*2

const HW = W / 2
const HH = H / 2

// ------------------------------
function setup() {
  const canvas = createCanvas(W, H)
  canvas.parent('#canvasHolder')
}

let angleOffset = 0

const orbits = [
  {
    x: 0, y: 0,
    color: '#F4989C', lineWeight: 2,
    r: 250, rMult: .1,
    a: -10, aMult: -1,
    rings: 3
  },
  {
    x: 0, y: 0,
    color: '#B7CECE', lineWeight: 2,
    r: 320, rMult: .2,
    a: 10, aMult: 2,
    rings: 3
  },
  {
    x: 0, y: 0,
    color: '#725AC1', lineWeight: 2,
    r: 100, rMult: .2,
    a: 10, aMult: 2,
    rings: 3
  }
]
// ------------------------------
function draw() {
  angleOffset += 0.005

  background(0)

  translate(HW, HH)

  noFill()
  for (let i = 0; i < orbits.length; i++) {
    const o = orbits[i]
    stroke(o.color)
    strokeWeight(o.lineWeight)
    orbit(o.x, o.y, o.r, o.rMult, o.a + angleOffset, o.aMult, o.rings)
  }

  stroke(150)
  strokeWeight(1)
  textAlign(CENTER, CENTER)
  textSize(40)
  text("Daniel Wayota", 0, 0)
  textSize(18)
  text("Presents", 0, 32)

}
// ------------------------------
function orbit(x, y, r, rMult, a, aMult, rings) {
  if (rings < 1) { return }

  const d = r*2
  ellipse(x, y, d, d)

  const nx = x + Math.sin(a) * r
  const ny = y + Math.cos(a) * r

  orbit(nx, ny, r * rMult, rMult, a * aMult, aMult, rings - 1)
}