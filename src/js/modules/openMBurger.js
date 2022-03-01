export const openMBurger = () => {
  const menuBurgerEl = document.querySelector('.hum-menu')
  const headerEl = document.getElementById('header')

  menuBurgerEl.addEventListener('click', () => {
    menuBurgerEl.classList.toggle('open')
    headerEl.classList.toggle('active-scroll')

    if (menuBurgerEl.classList.contains('open')) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'initial'
    }

    if (
      !headerEl.classList.contains('active-scroll') &&
      window.scrollY !== 0
    ) {
      headerEl.classList.add('active-scroll')
    }
  })
}
