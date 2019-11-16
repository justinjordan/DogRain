export default class Dog {
  constructor(opts) {
    opts = opts || {};

    this.loaded = false;
    this.alive = true;

    this.x = typeof opts.x === "number" ? opts.x : 100 * Math.random();
    this.y = typeof opts.y === "number" ? opts.y : 100 * Math.random();
    this.rotation =
      typeof opts.rotation === "number"
        ? opts.rotation
        : 90 * Math.random() - 45;
    this.xSpeed = typeof opts.xSpeed === "number" ? opts.xSpeed : 0;
    this.ySpeed = typeof opts.ySpeed === "number" ? opts.ySpeed : 0;
    this.rSpeed = typeof opts.rSpeed === "number" ? opts.rSpeed : 0;
    this.fadeSpeed = typeof opts.fadeSpeed === "number" ? opts.fadeSpeed : 1000;
    this.container =
      opts.container instanceof HTMLElement ? opts.container : document.body;

    this.img = new Image();
    this.img.src = "https://placedog.net/" + Math.ceil(1000 * Math.random());

    this.img.style.maxWidth = "300px";
    this.img.style.height = "auto";
    this.img.style.opacity = 0;
    this.img.style.transition = "opacity " + this.fadeSpeed + "ms ease-in";

    this.setPosition(opts.x, opts.y, opts.rotation);

    this.container.appendChild(this.img);

    this.img.onload = () => {
      this.loaded = true;
      this.show();

      if (typeof this.onloadCallback === "function") {
        this.onloadCallback(this);
      }
    };
  }

  onload(callback) {
    this.onloadCallback = callback;
  }

  setPosition(x, y, rotation) {
    this.x = typeof x === "number" ? x : 100 * Math.random();
    this.y = typeof y === "number" ? y : 100 * Math.random();
    this.rotation =
      typeof rotation === "number" ? rotation : 90 * Math.random() - 45;

    this.img.style.position = "absolute";
    this.img.style.left = this.x + "%";
    this.img.style.top = this.y + "%";
    this.img.style.transform =
      "translate(-50%, -50%) rotate(" + this.rotation + "deg)";
  }

  show() {
    return new Promise((resolve, reject) => {
      this.img.style.opacity = 1;
      setTimeout(() => {
        resolve(this);
      }, this.fadeSpeed);
    });
  }

  hide() {
    return new Promise((resolve, reject) => {
      this.img.style.opacity = 0;
      setTimeout(() => {
        resolve(this);
      }, this.fadeSpeed);
    });
  }

  animate(deltaTime) {
    if (!this.loaded || !this.alive) {
      return;
    }

    deltaTime = deltaTime || 0;

    this.setPosition(
      this.x + this.xSpeed * deltaTime,
      this.y + this.ySpeed * deltaTime,
      this.rotation + this.rSpeed * deltaTime
    );
  }

  kill() {
    this.alive = false;
  }

  cleanUp() {
    this.img.parentNode.removeChild(this.img);
  }
}
