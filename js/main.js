import { Progress } from './progress.js'

const dateEl = document.querySelector('.hero .nav .date')
const dataDayEl = dateEl.querySelector('.hero .nav .date .data-day')
const dataYearAndMonthEl = dateEl.querySelector('.hero .nav .date .data-year-and-month')

// 让dateEl元素显示当前日期
const date = new Date()
dataDayEl.innerHTML = date.getDate()
dataYearAndMonthEl.innerHTML = `${date.getMonth() + 1} | ${date.getFullYear()}`

// 跳转到指定视图
const surfEl = document.querySelector('.surf')
const travelEl = document.querySelector('.travel')
const sleepEl = document.querySelector('.sleep')
const shopEl = document.querySelector('.shop')
const menuItems = document.querySelectorAll('.hero .nav .menu .menu-item')
const menuSurfEl = menuItems[0]
const menuTravelEl = menuItems[1]
const menuSleepEl = menuItems[2]
const menuShopEl = menuItems[3]
const heroArrowDownEl = document.querySelector('.hero .arrow-down')

const scrollEls = [menuSurfEl, menuTravelEl, menuSleepEl, menuShopEl, heroArrowDownEl]
const scrollViews = [surfEl, travelEl, sleepEl, shopEl, surfEl]

const scrollIntoView = (el, view) => {
  el.addEventListener('click', (e) => {
    e.preventDefault()
    view.scrollIntoView({behavior: 'smooth', block: 'start'})
  })
}

for (let i = 0; i < scrollEls.length; i++) {
  scrollIntoView(scrollEls[i], scrollViews[i])
}

// 当前进度条的进度为100%时，自动切换到下一个进度条
const progress = new Progress('.progress')

progress.animate()