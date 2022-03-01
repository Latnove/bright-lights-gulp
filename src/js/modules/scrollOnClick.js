export const scrollOnClick = () => {
  const headerEl = document.getElementById('header')
  const linkEls = document.querySelectorAll(`*[data-scroll-el]`)
  const menuBurgerEl = document.querySelector('.hum-menu')

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

      menuBurgerEl.classList.remove('open')
      document.body.style.overflow = 'initial'

      const scrollValue =
        scrollElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerEl.offsetHeight

      window.scrollTo({
        top: scrollValue,
        behavior: 'smooth',
      })
    })
  })
}
