class Simulator {
  constructor (frameBuffer) {
    this.frameBuffer = frameBuffer

    // Se usa para actualizar las partículas.
    this.particles = []

    // Se usa para buscar partículas usando su posición.
    this.particleMatrix = []
    for (let x = 0; x < this.frameBuffer.width; x++) {
      this.particleMatrix.push(new Array(this.frameBuffer.height))
    }

    this.frameWidth = this.frameBuffer.width
    this.frameHeight = this.frameBuffer.height
  }

  createParticle(x, y, type) {
    if (x < 0 || x >= this.frameWidth || y < 0 || y >= this.frameHeight) {
      // Estamos fuera del canvas.
      return false
    }
    if (this.particleMatrix[x][y] !== undefined) {
      // Ya hay una partícula en esta posición.
      return false
    }

    const particle = new Particle(x, y, type)

    this.particles.push(particle)
    this.particleMatrix[x][y] = particle

    const pixelIndex = this.pointToIndex(x, y)

    this.frameBuffer.data[pixelIndex + 0] = particle.colour.r
    this.frameBuffer.data[pixelIndex + 1] = particle.colour.g
    this.frameBuffer.data[pixelIndex + 2] = particle.colour.b

    return true
  }

  update() {
    for (const particle of this.particles) {
      const x = particle.x
      const y = particle.y

      if (particle.type == PARTICLE_SAND || particle.type == PARTICLE_WATER) {
        // Abajo
        if (this.tryToMoveParticle(x, y, x, y + 1, particle)) continue
        // Abajo Derecha
        if (this.tryToMoveParticle(x, y, x + 1, y + 1, particle)) continue
        // Abajo Izquierda
        if (this.tryToMoveParticle(x, y, x - 1, y + 1, particle)) continue
      }

      if (particle.type == PARTICLE_WATER) {
        // Derecha
        if (this.tryToMoveParticle(x, y, x + 1, y, particle)) continue
        // Izquierda
        if (this.tryToMoveParticle(x, y, x - 1, y, particle)) continue
      }
    }
  }

  pointToIndex(x, y) {
    const index = (y * this.frameWidth + x) * 4
    return index
  }

  tryToMoveParticle(x, y, xx, yy, particle) {
    const next = this.getParticle(xx, yy)

    if (next === null) {
      return false
    }

    if (next === undefined || particle.density > next.density) {
      this.swapPixel(x, y, xx, yy)

      if (next) {
        next.x = particle.x
        next.y = particle.y
      }

      particle.x = xx
      particle.y = yy

      this.particleMatrix[x][y] = next
      this.particleMatrix[xx][yy] = particle

      return true
    }

    return false
  }

  swapPixel(x1, y1, x2, y2) {
    let i1 = this.pointToIndex(x1, y1)
    let i2 = this.pointToIndex(x2, y2)

    let r = this.frameBuffer.data[i1 + 0]
    let g = this.frameBuffer.data[i1 + 1]
    let b = this.frameBuffer.data[i1 + 2]

    this.frameBuffer.data[i1 + 0] = this.frameBuffer.data[i2 + 0]
    this.frameBuffer.data[i1 + 1] = this.frameBuffer.data[i2 + 1]
    this.frameBuffer.data[i1 + 2] = this.frameBuffer.data[i2 + 2]

    this.frameBuffer.data[i2 + 0] = r
    this.frameBuffer.data[i2 + 1] = g
    this.frameBuffer.data[i2 + 2] = b
  }

  getParticle(x, y) {
    if (x < 0 || x >= this.frameWidth) {
      return null
    }

    if (y < 0 || y >= this.frameHeight) {
      return null
    }

    return this.particleMatrix[x][y]
  }
}