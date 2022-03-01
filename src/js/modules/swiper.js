import Swiper from 'swiper'

export const swiper = className => {
  const swiper = new Swiper(`.${className}__swiper`, {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,

    breakpoints: {
      1201: {
        slidesPerView: 3,
      },
      769: {
        spaceBetween: 20,
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    mousewheel: true,
    keyboard: true,
  })

  const prevEl = document.querySelector(`.${className} #prev-slide`)
  const nextEl = document.querySelector(`.${className} #next-slide`)
  let animActiveTime = null

  const setAnimation = isPrev => {
    const activeElement = isPrev ? prevEl : nextEl
    removeAnimation()
    clearTimeout(animActiveTime)
    animActiveTime = setTimeout(() => {
      activeElement.classList.add('active-anim')
    }, 2500)
  }

  const removeAnimation = () => {
    prevEl.classList.remove('active-anim')
    nextEl.classList.remove('active-anim')
    clearTimeout(animActiveTime)
  }

  prevEl.addEventListener('click', e => {
    setAnimation(true)
    swiper.slidePrev()
  })

  nextEl.addEventListener('click', e => {
    setAnimation(false)
    swiper.slideNext()
  })

  prevEl.addEventListener('pointerenter', () => {
    setAnimation(true)
  })
  nextEl.addEventListener('pointerenter', () => {
    setAnimation(false)
  })

  prevEl.addEventListener('pointerleave', removeAnimation)
  nextEl.addEventListener('pointerleave', removeAnimation)
}
