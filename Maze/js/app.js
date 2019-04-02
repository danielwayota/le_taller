const W = 800
const H = 800


const cells = []

const mazeW = 32
const mazeH = 32

const stack = []

const pixelSize = 16


// ----------------------------------------
function setup() {
  const canvas = createCanvas(W, H)
  canvas.parent('#canvasHolder')

  for (let y = 0; y < mazeH; y++) {
    const row = []
    for (let x = 0; x < mazeW; x++) {
      row.push(new Cell(x, y))
    }
    cells.push(row)
  }

  const rx = Math.round(Math.random() * mazeW)
  const ry = Math.round(Math.random() * mazeH)

  const first = cells[ry][rx]
  first.visited = true

  stack.push(first)
}

// ----------------------------------------
function draw() {
  background(0)

  while (stack.length > 0) {
    let current = stack[stack.length - 1]

    let valid = false
    let checks = 0

    while (!valid && checks < 10) {
      checks++
      let direction = Math.round(Math.random() * 4)

      switch (direction) {
        // WEST
        case 0:
        if (current.x > 0) {
          let next = cells[current.y][current.x - 1]

          if (!next.visited) {
            current.west = false
            next.east = false

            next.visited = true
            stack.push(next)
            valid = true
          }
        }
        break;

        // NORTH
        case 1:
        if (current.y > 0) {
          let next = cells[current.y - 1][current.x]

          if (!next.visited) {
            current.north = false
            next.south = false

            next.visited = true
            stack.push(next)
            valid = true
          }
        }
        break;

        case 2: // EAST
        if (current.x < (mazeW - 1)) {
          let next = cells[current.y][current.x + 1]

          if (!next.visited) {
            current.east = false
            next.west = false

            next.visited = true
            stack.push(next)
            valid = true
          }
        }
        break;

        case 3: // SOUTH
        if (current.y < (mazeH - 1)) {
          let next = cells[current.y + 1][current.x]

          if (!next.visited) {
            current.south = false
            next.north = false

            next.visited = true
            stack.push(next)
            valid = true
          }
        }
        break;
      }
    }

    if (!valid) {
      stack.pop()
    }
  }

  for (let y = 0; y < mazeH; y++) {
    for (let x = 0; x < mazeW; x++) {
      cells[y][x].draw(pixelSize)
    }
  }

  for (let s = 0; s < stack.length; s++) {
    const el = stack[s]

    noStroke()
    fill('#EA7317')

    ellipse(
      el.x * pixelSize + (pixelSize / 2),
      el.y * pixelSize + (pixelSize / 2),
      pixelSize / 2,
      pixelSize / 2
    )
  }
}
