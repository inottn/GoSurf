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

const animateFnCache = new Map()

export function animate (fn, interval = 0, ...args) {
  if (!animateFnCache.has(fn)) animateFnCache.set(fn, Object.create(null))

  fn = interval
    ? animateFnCache.get(fn)[interval] || (animateFnCache.get(fn)[interval] = throttle.call(this, fn, interval))
    : fn

  const inner = () => {
    fn(...args)
    this.timer = requestAnimationFrame(inner)
  }

  this.timer = requestAnimationFrame(inner)
}