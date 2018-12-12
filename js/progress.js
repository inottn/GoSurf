import { animate } from './util.js'

export class Progress {
  constructor (el, index = 2, interval = 50) {
    this.el = typeof el === 'string' ? document.querySelectorAll(el) : el
    this.count = this.el.length
    this.index = index
    this.percentage = 0
    this.interval = interval
    this.timer = null
  }

  progress () {
    if (this.percentage > 100) {
      this.percentage = 0
      this.el[this.index].style.setProperty('--progress-width', this.percentage + '%');
      this.index = this.index === this.count - 1 ? 0 : this.index + 1
    }

    this.el[this.index].style.setProperty('--progress-width', this.percentage + '%');
    this.percentage++
  }

  animate () {
    animate.call(this, this.progress, this.interval)
  }
}