

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')

  let selectedMaterial = PARTICLE_SAND
  const selectedMaterialLabel = document.getElementById('selected-material-label')
  selectedMaterialLabel.innerHTML = selectedMaterial

  const framebuffer = context.getImageData(0, 0, canvas.width, canvas.height)
  const simulator = new Simulator(framebuffer)

  document.getElementById('btn-sand').addEventListener('click', () => {
    selectedMaterial = PARTICLE_SAND
    selectedMaterialLabel.innerHTML = selectedMaterial
  })

  document.getElementById('btn-water').addEventListener('click', () => {
    selectedMaterial = PARTICLE_WATER
    selectedMaterialLabel.innerHTML = selectedMaterial
  })

  document.getElementById('btn-stone').addEventListener('click', () => {
    selectedMaterial = PARTICLE_STONE
    selectedMaterialLabel.innerHTML = selectedMaterial
  })

  canvas.addEventListener('mousemove', (event) => {
    // Mouse drag
    if (event.buttons == 1) {
      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Nivel de zoom dado por CSS
      const scale = 2

      let i = 0
      let iterations = 0

      while (i < 8 && iterations < 32) {
        let pX = Math.floor((x + Math.round((Math.random() * 32) - 16)) / scale)
        let pY = Math.floor((y + Math.round((Math.random() * 32) - 16)) / scale)

        if (simulator.createParticle(pX, pY, selectedMaterial)) {
          i++
        }

        iterations++
      }
    }
  })

  // framebuffer.data es un array con los píxeles con este formato:
  //    [ R, G, B, A, R, G, B, A, ... ]

  for (let i = 0; i < framebuffer.data.length; i += 4) {
    framebuffer.data[i + 0] = 0    // R
    framebuffer.data[i + 1] = 0    // G
    framebuffer.data[i + 2] = 0    // B
    framebuffer.data[i + 3] = 255  // A
  }

  function loop() {
    simulator.update()

    context.putImageData(framebuffer, 0, 0)

    requestAnimationFrame(loop)
  }

  loop()
})