const buffer1 = []
const buffer2 = []

const w = 128
const h = 128

let rectW = 0
let rectH = 0

function setup() {
  const canvas = createCanvas(800, 800)
  canvas.parent('#canvasHolder')

  for (let j = 0; j < h; j++) {
    const row1 = []
    const row2 = []

    for (let i = 0; i < w; i++) {
      row1.push(Math.random() > 0.55 ? 1 : 0)
      row2.push(0)
    }

    buffer1.push(row1)
    buffer2.push(row2)
  }

  rectW = width / w
  rectH = height / h

  // setInterval(cave, 500)
  for (let i = 0; i < 16; i++) {
    cave()
  }
}

function cave() {
  // Generar la siguiente generacion a partir de la anterior
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      if (((i === 0) || (i === w - 1)) || ((j === 0) || (j === h - 1))) {
        buffer2[j][i] = 1
      } else {
        let count = buffer1[j][i]

        // Vertical
        count += buffer1[j-1][i]
        count += buffer1[j+1][i]
        // Horizontal
        count += buffer1[j][i-1]
        count += buffer1[j][i+1]

        // Diagonals
        count += buffer1[j-1][i-1]
        count += buffer1[j+1][i+1]
        count += buffer1[j+1][i-1]
        count += buffer1[j-1][i+1]

        if (count < 4) {
          buffer2[j][i] = 0
        } else if (count > 4) {
          buffer2[j][i] = 1
        }
      }
    }
  }

  // Copiar la nueva generacion al buffer principal
  // Borrar el buffer secundario
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      buffer1[j][i] = buffer2[j][i]
      buffer2[j][i] = 0
    }
  }

}

function gameOfLife() {
  // Generar la siguiente generacion a partir de la anterior
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      if (((i === 0) || (i === w - 1)) || ((j === 0) || (j === h - 1))) {
        // Nada
      } else {
        let count = 0

        // Vertical
        count += buffer1[j-1][i]
        count += buffer1[j+1][i]
        // Horizontal
        count += buffer1[j][i-1]
        count += buffer1[j][i+1]

        // Diagonals
        count += buffer1[j-1][i-1]
        count += buffer1[j+1][i+1]
        count += buffer1[j+1][i-1]
        count += buffer1[j-1][i+1]

        if (count === 3) {
          buffer2[j][i] = 1
        } else if (count === 2 || count === 3) {
          buffer2[j][i] = buffer1[j][i]
        } else {
          buffer2[j][i] = 0
        }
      }
    }
  }

  // Copiar la nueva generacion al buffer principal
  // Borrar el buffer secundario
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      buffer1[j][i] = buffer2[j][i]
      buffer2[j][i] = 0
    }
  }

}

function draw() {
  background(0)

  noStroke()
  fill(255)
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      if (buffer1[j][i] !== 0) {
        rect(i * rectW, j * rectH, rectW, rectH)
      }
    }
  }
}