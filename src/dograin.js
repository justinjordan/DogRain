import Dog from './dog'

export default class DogRain {
    constructor() {
        this.isRaining = false
        this.dogs = []
        this.limit = 20
        this.speed = 0.02
        this.minInterval = 200
        this.maxInterval = 2000

        this.container = document.createElement('div')
        this.container.style.position = 'fixed'
        this.container.style.left = 0
        this.container.style.top = 0
        this.container.style.width = '100vw'
        this.container.style.height = '100vh'
        this.container.onclick = () => {
            this.stop()
        }
    }

    /**
     * Initialize event handlers
     */
    init() {
        window.onclick = event => {
            if (this.eventShouldTriggerStart(event)) {
                this.start()
            }
        }
    }

    /**
     * Test event element for dograin class
     * @param UIEvent event
     * @return boolean  Returns true when target element has class, or false
     */
    eventShouldTriggerStart(event) {
        let node = event.toElement

        do {
            // look for dograin class
            if (node.classList.contains('dograin')) {
                return true
            }

            // climb up to parent
            node = node.parentNode
        } while (node instanceof HTMLElement && node.parentNode)

        return false
    }

    /**
     * Make it rain... Dogs!
     */
    start() {
        document.body.appendChild(this.container)

        if (this.isRaining) {
            return this.stop()
        }

        this.isRaining = true

        this.startCreationLoop()
        this.animate()
    }

    /**
     * Stop the rain... :(
     */
    stop() {
        this.isRaining = false

        while (this.dogs.length > 0) {
            this.dogs.pop().hide().then(dog => {
                dog.cleanUp()
            })
        }

        document.body.removeChild(this.container)
    }

    startCreationLoop() {
        // stop creating if not raining
        if (!this.isRaining) {
            return
        }

        if (this.dogs.length < this.limit) {
            this.dogs.push(new Dog({
                x: 100 * Math.random(),
                y: 0,
                ySpeed: this.speed,
                rSpeed: 0,
                container: this.container,
            }))
        }

        setTimeout(() => {
            this.startCreationLoop()
        }, this.minInterval + (this.maxInterval - this.minInterval) * Math.random())
    }

    animate(now) {
        if (!this.isRaining) {
            return
        }

        now = now || performance.now()
        const deltaTime = this.lastFrame ? now - this.lastFrame : 0
        this.lastFrame = now

        for (let i in this.dogs) {
            let dog = this.dogs[i]

            // Remove dog from DOM
            if (!dog.alive) {
                dog.cleanUp()
                this.dogs.splice(i, 1)
                continue
            }

            if (dog.y > 100) {
                dog.hide().then(dog => {
                    dog.kill()
                })
            }
            dog.animate(deltaTime)
        }

        window.requestAnimationFrame(now => this.animate(now))
    }
}
