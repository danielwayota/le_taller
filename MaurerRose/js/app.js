const W = 800
const H = 800

const HW = W / 2
const HH = H / 2


let angle = 0

let n = 6
let d = 71

let points = []

let nTextbox = null
let dTextbox = null
let resetBtn = null

// ----------------------------------------
function setup() {
  const canvas = createCanvas(W, H)
  canvas.parent('#canvasHolder')

  nTextbox = document.getElementById('n')
  dTextbox = document.getElementById('d')
  resetBtn = document.getElementById('start')

  resetBtn.onclick = start

  start()
}

// ----------------------------------------
function start() {
  n = Number(nTextbox.value)
  d = Number(dTextbox.value)

  points.length = 0
  angle = 0
  background(0)
}

// ----------------------------------------
function draw() {
  translate(HW, HH)

  if (angle < 360) {

    let k = angle * d * Math.PI / 180

    let hip = Math.sin(n * k)

    let x = (Math.cos(k) * hip)
    let y = (Math.sin(k) * hip) 

    points.push([x, y])

    angle ++
  }

  stroke(255)
  noFill()
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]
    const b = points[i + 1]

    stroke(255 * points[i][0], 255 * points[i][1], 255)

    line(a[0] * HW, a[1] * HW, b[0] * HH, b[1] * HH)
  }
}
