const input = document.getElementById('the-text')
const encripted = document.getElementById('encripted')

input.addEventListener('keyup', () => {
    const e = cesar(input.value)

    const d = uncesar(e.text, e.key)

    encripted.innerHTML = `<p>${e.text}</p><p>${d}</p>`
})


function setup() {
    createCanvas(800, 800)

    let size = 2
    let w = width / size
    let h = height / size


    const caos = new Caos()
    noStroke()
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            let color = Math.round(caos.next() * 255)

            fill(color)
            rect(
                i * size,
                j * size,
                size,
                size
            )
        }
    }
}


function draw() {

}

function cesar(text) {
    const letters = 'qwertyuiopasdfghjklzxcvbnmñ,. QWERTYUIOPASDFGHJKLZXCVBNMÑ'.split('')

    let result = ''

    const caos = new Caos()

    const key = []

    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i)

        let letterIndex = letters.indexOf(char)
        let offset = Math.round(caos.next() * letters.length)

        letterIndex += offset
        letterIndex %= letters.length

        key.push(offset)

        result += letters[letterIndex]
    }

    return {
        text: result,
        key: key
    }
}

function uncesar(text, key) {
    const letters = 'qwertyuiopasdfghjklzxcvbnmñ,. QWERTYUIOPASDFGHJKLZXCVBNMÑ'.split('')

    let result = '';
    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i)

        let letterIndex = letters.indexOf(char)

        letterIndex -= key[i]

        if (letterIndex < 0) {
            letterIndex = letters.length + letterIndex
        }

        result += letters[letterIndex]
    }

    return result
}

class Caos {
    constructor(seed) {
        if (seed === undefined) {
            seed = Date.now()
        }

        this.seed = seed
    }

    next() {
        let noise =
            + Math.sin(this.seed * 20)
            + Math.cos(this.seed * 30)
            + Math.sin(this.seed * 5)
            + (Math.cos(this.seed * 42) / 5)
            + Math.sin(this.seed * 0.1)

        let y = 1 / ( 1 + Math.pow(Math.E, noise) )

        this.seed += y

        return y
    }
}


