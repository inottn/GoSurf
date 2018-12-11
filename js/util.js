export function throttle (func, wait) {
  let previous = 0

  return (...args) => {
      let now = +new Date()

      if (now - previous > wait) {
          func.apply(this, args)
          previous = now
      }
  }
}

export function animate (fn, interval = 0, ...args) {
  fn = interval ? throttle.call(this, fn, interval) : fn

  const inner = () => {
    fn()
    this.timer = requestAnimationFrame(inner)
  }

  this.timer = requestAnimationFrame(inner)
}