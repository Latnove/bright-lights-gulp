export const copyEmail = () => {
  const emailEL = document.getElementById('email')
  const copyModalEl = document.querySelector('.footer__modal-copy')

  emailEL.addEventListener('click', e => {
    e.preventDefault()
    navigator.clipboard.writeText(emailEL.textContent)
    copyModalEl.classList.add('active')
    setTimeout(() => {
      copyModalEl.classList.remove('active')
    }, 3000)
  })
}
