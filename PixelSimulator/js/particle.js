const PARTICLE_SAND = 'Sand'
const PARTICLE_WATER = 'Water'
const PARTICLE_STONE = 'Stone'

class Particle {
  constructor(x, y, type) {
    this.x = x
    this.y = y
    this.type = type

    switch (type) {
      case PARTICLE_SAND:
        this.colour = { r: 227, g: 176, b: 79 }
        this.density = 2
        break;
      case PARTICLE_WATER:
        this.colour = { r: 102, g: 204, b: 255 }
        this.density = 1
        break;
      case PARTICLE_STONE:
        this.colour = { r: 145, g: 94, b: 47 }
        this.density = 8
        break;
    }
  }
}