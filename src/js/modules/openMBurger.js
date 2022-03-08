export const openMBurger = () => {
  const menuBurgerEl = document.querySelector('.hum-menu')
  const headerEl = document.getElementById('header')

  menuBurgerEl.addEventListener('click', () => {
    menuBurgerEl.classList.toggle('open')

    if (menuBurgerEl.classList.contains('open')) {
      document.body.style.overflow = 'hidden'
      headerEl.classList.add('active-scroll')
    } else {
      document.body.style.overflow = 'initial'
      setTimeout(() => {
        headerEl.classList.remove('active-scroll')
      }, 380)
    }

    if (
      !headerEl.classList.contains('active-scroll') &&
      window.scrollY !== 0
    ) {
      headerEl.classList.add('active-scroll')
    }
  })
}
