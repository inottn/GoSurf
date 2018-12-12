(function () {
  'use strict';

  function throttle (func, wait) {
    let previous = 0;

    return (...args) => {
        let now = +new Date();

        if (now - previous > wait) {
            func.apply(this, args);
            previous = now;
        }
    }
  }

  function animate (fn, interval = 0, ...args) {
    fn = interval ? throttle.call(this, fn, interval) : fn;

    const inner = () => {
      fn();
      this.timer = requestAnimationFrame(inner);
    };

    this.timer = requestAnimationFrame(inner);
  }

  class Progress {
    constructor (el, index = 2, interval = 50) {
      this.el = typeof el === 'string' ? document.querySelectorAll(el) : el;
      this.count = this.el.length;
      this.index = index;
      this.percentage = 0;
      this.interval = interval;
      this.timer = null;
    }

    progress () {
      if (this.percentage > 100) {
        this.percentage = 0;
        this.el[this.index].style.setProperty('--progress-width', this.percentage + '%');
        this.index = this.index === this.count - 1 ? 0 : this.index + 1;
      }

      this.el[this.index].style.setProperty('--progress-width', this.percentage + '%');
      this.percentage++;
    }

    animate () {
      animate.call(this, this.progress, this.interval);
    }

    cancelAnimation () {
      cancelAnimationFrame(this.timer);
    }

    redirect (index) {
      this.cancelAnimation();

      this.percentage = 0;
      this.el[this.index].style.setProperty('--progress-width', this.percentage + '%');
      this.index = index;

      this.animate();
    }

    next () {
      let index = this.index === this.count - 1 ? 0 : this.index + 1;
      this.redirect(index);
    }
  }

  const dateEl = document.querySelector('.hero .nav .date');
  const dataDayEl = dateEl.querySelector('.hero .nav .date .data-day');
  const dataYearAndMonthEl = dateEl.querySelector('.hero .nav .date .data-year-and-month');

  // 让dateEl元素显示当前日期
  const date = new Date();
  dataDayEl.innerHTML = date.getDate();
  dataYearAndMonthEl.innerHTML = `${date.getMonth() + 1} | ${date.getFullYear()}`;

  // 跳转到指定视图
  const surfEl = document.querySelector('.surf');
  const travelEl = document.querySelector('.travel');
  const sleepEl = document.querySelector('.sleep');
  const shopEl = document.querySelector('.shop');
  const menuItems = document.querySelectorAll('.hero .nav .menu .menu-item');
  const menuSurfEl = menuItems[0];
  const menuTravelEl = menuItems[1];
  const menuSleepEl = menuItems[2];
  const menuShopEl = menuItems[3];
  const heroArrowDownEl = document.querySelector('.hero .arrow-down');

  const scrollEls = [menuSurfEl, menuTravelEl, menuSleepEl, menuShopEl, heroArrowDownEl];
  const scrollViews = [surfEl, travelEl, sleepEl, shopEl, surfEl];

  const scrollIntoView = (el, view) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      view.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  };

  for (let i = 0; i < scrollEls.length; i++) {
    scrollIntoView(scrollEls[i], scrollViews[i]);
  }

  // 当前进度条的进度为100%时，自动切换到下一个进度条
  const progress = new Progress('.progress');

  progress.animate();

  // 点击 progressArrowRight 元素，切换到下一个进度条
  const progressArrowRight = document.querySelector('.hero .hero-content .arrow-right img');

  progressArrowRight.addEventListener('click', () => {
    progress.next();
  });

}());
