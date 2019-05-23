import { createListView, createValueView } from './dom.js'

const DNA_POOL = 'AQWSXZCDERFVBGTYHNMJUIKLPOazsxdcfvgbhnjmklpoiuytrewq .-,'

/** ===========================================
 * 
 * @param {Number} targetLength 
 * 
 * @return {string}
 */
function generateEntity(targetLength) {
  const length = DNA_POOL.length

  let entity = ''

  for(let i = 0; i < targetLength; i++) {
    const rndIndex = Math.floor(Math.random() * length)

    entity += DNA_POOL.charAt(rndIndex)
  }

  return entity
}

/** ===========================================
 * 
 * Genera un 'hijo' alternando los caracteres de los 'padres'
 * 
 * @param {string} a
 * @param {string} b
 * 
 * @return {string}
 */
function mixEntities5050(a, b) {
  const length = a.length

  let child = ''

  for (let i = 0; i < length; i++) {
    child += i % 2 == 0 ? a.charAt(i) : b.charAt(i)
  }

  return child
}
/** ===========================================
 * 
 * Genera un hijo usando la mitad del 'ADN' de cada padre.
 * 
 * @param {string} a
 * @param {string} b
 * 
 * @return {string}
 */
function mixEntitiesByHalf(a, b) {
  const length = a.length
  const half = Math.floor(length / 2)

  let child = a.substring(0, half) + b.substring(half, length)

  return child.substring(0, length)
}

/** ===========================================
 * 
 * Cambia una 'letra' del ADN en base a una probabilidad.
 * 
 * @param {string} entity
 * 
 * @return {string}
 */
function mutate(entity, chance) {
  const length = entity.length

  let mutation = ''

  for (let i = 0; i < length; i++) {
    const rnd = Math.random()

    if (rnd < chance) {
      mutation += DNA_POOL.charAt(Math.floor(Math.random() * DNA_POOL.length))
    } else {
      mutation += entity.charAt(i)
    }
  }

  return mutation
}

/**
 * Las funciones de Fitness están escritas usando currying.
 * Si alguien no sabe de que va el tema, puedo hacer un vídeo sobre ello
 *   pero hay muy buenos artículos por la web sobre el tema.
 */

/** ===========================================
 * 
 * @param {string} target 
 * 
 * @return {Function}
 */
function createTargetFitnessFunction(target) {
  const _target = target

  return function getFitness(entity) {
    const length = entity.length
  
    let score = 0
  
    for (let i = 0; i < length; i++ ) {
      if (entity.charAt(i) == _target.charAt(i)) {
        score += 1
      }
    }
  
    return Math.pow(score / length, 4)
  }
}

function createSimilarInsideFitnessFunction() {

  return function getFitness(entity) {
    const letters = {}
    const length = entity.length

    for (let i = 0; i < length; i++) {
      const chr = entity.charAt(i)
      if (letters[chr]) {
        letters[chr]++
      } else {
        letters[chr] = 1
      }
    }

    let best = 0

    for (let key in letters) {
      if (letters[key] > best) {
        best = letters[key]
      }
    }

    return best / length;
  }
}

window.addEventListener('load', () => {
  let generation = 0

  let population = []
  const populationMax = 500

  const populationViewLimit = 10

  const target = 'To be or not to be.'

  const renderBestPopulationView = createListView(document.getElementById('best-population'))
  const renderWorstPopulationView = createListView(document.getElementById('worst-population'))
  const renderBestView = createValueView(document.getElementById('best'))
  const renderBestFitnessView = createValueView(document.getElementById('best-fitness'))
  const renderGeneration = createValueView(document.getElementById('generation'))

  // Escribe el máximo de la población en el HTML
  createValueView(document.getElementById('max-population'))(populationMax)

  // Create the fitness calculation function
  const calcFit = createTargetFitnessFunction(target)

  for (let i = 0; i < populationMax; i++) {
    population.push(generateEntity(target.length))
  }

  // THE LOOP
  const tick = setInterval(() => {
    generation++

    // Ordena la población de mayor 'fitness' a menor 'fitness'
    const sortedPopulation = population.sort((a, b) => {
      return calcFit(b) > calcFit(a)
    })
    
    // Crea un array con los 'fitness' de la población.
    const fitness = sortedPopulation.map(calcFit)
    
    const best = sortedPopulation[0]
    const bestFitness = Math.round(fitness[0] * 100)

    // El mejor de todos es ya 100% perfecto, para el loop.
    if (bestFitness == 100) {
      clearInterval(tick)
    }

    // Render
    renderBestPopulationView(
      sortedPopulation.slice(0, populationViewLimit)
    )
    renderWorstPopulationView(
      sortedPopulation.slice(population.length - populationViewLimit, population.length)
    )
    renderBestView(best)
    renderBestFitnessView(bestFitness)
    renderGeneration(generation.toString())

    // Generar nueva población

    const newPopulation = []

    for (let i = 0; i < populationMax; i++) {
      let parents = []

      // Esta variable está para que el bucle no se vaya de madre.
      let i = 0

      // Buscamos dos 'padres' para generar un hijo en la siguiente generación.
      while (parents.length < 2 && i < 1000000) {
        i++
        // Escogemos un índice de entidad aleatorio.
        const currentEntityIndex = Math.floor(Math.random() * population.length)

        // Número aleatorio entre 0 y 1.
        // Si el 'Fitness' de la entidad cuyo índice hemos generado, es bueno,
        //   tendrá más posibilidades de reproducirse.
        const dice = Math.random()

        if (fitness[currentEntityIndex] > dice) {
          parents.push(population[currentEntityIndex])
        }
      }

      if (parents.length != 2) {
        newPopulation.push(generateEntity(target.length))
      } else {
        const [e1, e2] = parents
  
        let child = mixEntities5050(e1, e2)
        child = mutate(child, 0.01)
        newPopulation.push(child)
      }
    }

    population = newPopulation
  }, 16)
})
