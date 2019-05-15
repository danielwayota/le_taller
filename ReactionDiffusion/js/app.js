/**
 * Reaction diffusion docs: http://karlsims.com/rd.html
 */

const main = []
const next = []

function setup() {
  const canvas = createCanvas(200, 200)
  canvas.parent('#canvasHolder')

  for (let i = 0; i < width*height; i++) {
    main.push({ a: 1, b: 0})
    next.push({ a: 1, b: 0})
  }

  // Seed
  seed(50, 50, 10, main)
  seed(100, 100, 10, main)
  seed(150, 150, 10, main)
}
/**
 * Fills a quad 
 *
 * @param {Number} x
 * @param {Number} y 
 * @param {Number} size 
 * @param {Array} buffer 
 */
function seed(x, y, size, buffer) {
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      const index = i + (j * width)
      buffer[index].b = 1
    }
  }
}

// 'Magic' constants. Change this to modify the algorithm behavior
const da = 1.0
const db = 0.5
const f = .055
const k = .062

/**
 * The Laplacian is performed with a 3x3 convolution with center weight -1, adjacent neighbors .2, and diagonals .05.
 *
 * @param {Number} x 
 * @param {Number} y 
 * @param {Array} buffer 
 */
function laplace(x, y, buffer) {
  const weights = [
    [0.05, 0.2, 0.05],
    [ 0.2,  -1,  0.2],
    [0.05, 0.2, 0.05],
  ]

  let laplaceSum = { a: 0, b: 0 }

  weights.forEach((row, i) => {
    row.forEach((w, j) => {
      const _x = x + (i - 1)
      const _y = y + (j - 1)

      const index = _x + (_y * width)

      laplaceSum.a += buffer[index].a * w
      laplaceSum.b += buffer[index].b * w
    })
  })

  return laplaceSum
}

let currentFrame = 0
let drawingFrame = 10

function draw() {
  // Do the magic 8 times per frame.
  for (let z = 0; z < 8; z++) {

    // Loop the 'pixels' avoiding the borders.
    for (let x = 1; x < width-1; x++) {
      for (let y = 1; y < height-1; y++) {
        const i = x + (y * width)
  
        const A = main[i].a
        const B = main[i].b
  
        // Reaction-Diffusion formula
        const L = laplace(x, y, main)
        next[i] = {
          a: A +
            (da * L.a) -
            (A * (B*B)) +
            f * (1 - A),
          b: B +
            (db * L.b) +
            (A * (B*B)) -
            (k + f) * B
        }
      }
    }

    // Swap
    for (let i = 0; i < width*height; i++) {
      main[i] = {...next[i]}
    }
  }


  if ((currentFrame % drawingFrame) === 0) {
    // Draw to screen
    loadPixels()
    for (let i = 0; i < width*height; i++) {
      const { a, b } = main[i]
      const index = i * 4
      pixels[index + 0] = b * 255
      pixels[index + 1] = b * 255
      pixels[index + 2] = b * 255
      pixels[index + 3] = 255
    }
    updatePixels()
    currentFrame -= drawingFrame
  }
  currentFrame++
}
