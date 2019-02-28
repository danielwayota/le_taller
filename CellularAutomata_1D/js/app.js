const generations = []

const rules = {
  '000': 0,
  '001': 1,
  '010': 1,
  '011': 0,
  '100': 1,
  '101': 1,
  '110': 0,
  '111': 0,
}

const genLength = 64

function setup() {
  const canvas = createCanvas(800, 800)
  canvas.parent('#canvasHolder')

  const generation1 = []

  for (let i = 0; i < genLength; i++) {
    generation1.push( i === genLength / 2 ? 1 : 0)
  }

  generations.push(generation1)

  setInterval(nextGeneration, 250)
}

function draw() {
  background(0)

  let s = width / genLength
  fill(255)
  for (let j = 0; j < generations.length; j++) {
    const gen = generations[j]
    for (let i = 0; i < gen.length; i++) {
      if (gen[i] === 1) {
        rect(i * s, j * s, s, s)
      }
    }
  }
}

function nextGeneration () {
  const lastGen = generations[generations.length - 1]
  const nextGen = []

  for (let i = 0; i < lastGen.length; i++) {
    let rule = ''

    for (let j = i - 1; j <= i + 1; j++) {
      if (j < 0 || j >= lastGen.length) {
        rule += '0'
      } else {
        rule += lastGen[j]
      }
    }

    nextGen.push(rules[rule])
  }

  generations.push(nextGen)

  if (generations.length > 32) { generations.shift() }
}