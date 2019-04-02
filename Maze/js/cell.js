class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.visited = false

    this.west  = true
    this.north = true
    this.east  = true
    this.south = true
  }

  draw(pixelSize) {
    let i = this.x * pixelSize
    let j = this.y * pixelSize

    noStroke()
    if (this.visited) {
      fill('#3DA5D9')
    } else {
      fill('#2364AA')
    }
    rect(i, j, pixelSize, pixelSize)


    stroke(0)
    strokeWeight(2)
    noFill()
    if (this.west) {
      line(i, j, i, j + pixelSize)
    }

    if (this.north) {
      line(i, j, i + pixelSize, j)
    }

    if (this.east) {
      line(i + pixelSize, j, i + pixelSize, j + pixelSize)
    }

    if (this.south) {
      line(i, j + pixelSize, i + pixelSize, j + pixelSize)
    }
  }
}