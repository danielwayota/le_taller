/**
 * Las funciones de 'dibujado' están escritas usando currying.
 * Si alguien no sabe de que va el tema, puedo hacer un vídeo sobre ello
 *   pero hay muy buenos artículos por la web sobre el tema.
 */

/**
 * 
 * @param {HTMLElement} element 
 */
export function createListView(element) {
  const _element = element;

  return function render(population) {
    _element.innerHTML = '';

    population.forEach((entity) => {
      const li = document.createElement('li')
      li.innerText = entity

      _element.appendChild(li)
    })
  }
}

/**
 * 
 * @param {HTMLElement} element 
 */
export function createValueView(element) {
  const _element = element;

  return function render(entity) {
    _element.innerText = entity
  }
}
