const dateEl = document.querySelector('.hero .nav .date')
const dataDayEl = dateEl.querySelector('.hero .nav .date .data-day')
const dataYearAndMonthEl = dateEl.querySelector('.hero .nav .date .data-year-and-month')

// 让dateEl元素显示当前日期
const date = new Date()
dataDayEl.innerHTML = date.getDate()
dataYearAndMonthEl.innerHTML = `${date.getMonth() + 1} | ${date.getFullYear()}`