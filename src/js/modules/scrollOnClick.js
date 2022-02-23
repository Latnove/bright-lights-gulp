export const scrollOnClick = () => {
  const headerEl = document.getElementById('header')
  const linkEls = document.querySelectorAll(`*[data-scroll-el]`)

  const checkScroll = () => {
    const scrollY = window.scrollY

    if (scrollY === 0) {
      headerEl.classList.remove('active-scroll')
    } else {
      headerEl.classList.add('active-scroll')
    }
  }

  document.addEventListener('DOMContentLoaded', checkScroll)
  window.addEventListener('scroll', checkScroll)

  linkEls.forEach(el => {
    el.addEventListener('click', event => {
      event.preventDefault()
      const scrollRef = el.getAttribute('data-scroll-el')
      const scrollElement = document.querySelector(scrollRef)

      const scrollValue =
        scrollElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerEl.offsetHeight -
        1

      window.scrollTo({
        top: scrollValue,
        behavior: 'smooth',
      })
    })
  })
}
