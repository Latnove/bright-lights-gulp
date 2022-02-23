export const audioMusicPlayer = (className, musicLinks = []) => {
  const audioEl = document.querySelector(`.${className} .custom-audio`)
  const audioPauseEl = document.querySelector(
    `.${className} .audio__pause`
  )
  const audioTimeEl = document.querySelector(`.${className} .audio__time`)
  const progressBarEl = document.querySelector(
    `.${className} .audio__progress-bar`
  )
  const audioSBarEl = document.querySelector(
    `.${className} .audio__toddler`
  )
  const musicImageEl = document.querySelector(`.${className}__music-image`)

  // Картинки на паузу, пуск
  const pauseImg = audioPauseEl.getAttribute('data-pause-image')
  const playImg = audioPauseEl.getAttribute('data-play-image')

  let timeInterval = null
  let currentMusic = 0 // так индекс первой ссылки - 0

  // Starting conditions
  const audioBarWidth = Number.parseInt(
    window.getComputedStyle(progressBarEl).width,
    10
  )

  // Functions
  const roundValue = time => Math.round(time)

  const timeConverter = time => {
    if (time / 60 > 1) {
      const whole = Math.trunc(time / 60)
      const remainder = roundValue(time - 60 * whole)
      return `0${whole}:${remainder < 10 ? `0${remainder}` : remainder}`
    }
    return `00:${time / 10 < 1 ? `0${time}` : time}`
  }

  const getCurrentTime = () => {
    timeInterval = setInterval(function () {
      const currentTime = roundValue(audioEl.currentTime)
      const maxTime = roundValue(audioEl.duration)

      calcProgress(currentTime, maxTime)
      audioTimeEl.textContent = `${timeConverter(
        currentTime
      )}-${timeConverter(maxTime)}`
    }, 150)
  }

  const setAudioMusic = () => {
    const link = musicLinks[currentMusic]
    const srcMp3 = link.getAttribute('data-music-mp3')
    const srcOgg = link.getAttribute('data-music-ogg')

    audioEl.src = !audioEl.canPlayType('audio/mpeg') ? srcOgg : srcMp3
    audioPauseEl.children[0].src = pauseImg
    audioPauseEl.classList.add('active-player')
    audioEl.play()

    getCurrentTime()
  }

  const resetLinks = () => {
    musicLinks.forEach(el => {
      el.classList.remove('active-music-link')
    })
  }

  const changeMusic = () => {
    audioEl.currentTime = 0
    audioSBarEl.style.width = 0

    audioEl.pause()
    clearInterval(timeInterval)
    audioPauseEl.classList.remove('active-player')
    audioPauseEl.children[0].src = playImg

    if (musicImageEl !== null || musicLinks.length > 0) {
      if (currentMusic === musicLinks.length - 1) {
        currentMusic = 0
      } else {
        currentMusic++
      }
      setAudioMusic()
      resetLinks()

      musicLinks[currentMusic].classList.add('active-music-link')
      musicImageEl.classList.remove('active-music')

      setTimeout(() => {
        musicImageEl.classList.add('active-music')
      }, 300)
    }
  }

  const calcProgress = (currentTime, maxTime) => {
    const commonFactor = currentTime / maxTime
    const sBarWidth = audioBarWidth * commonFactor

    audioSBarEl.style.width = roundValue(sBarWidth) + 'px'
    if (currentTime === maxTime) {
      changeMusic()
    }
  }

  // Events
  document.addEventListener('keydown', e => {
    if (audioPauseEl.classList.contains('active-player')) {
      if (e.key === 'ArrowRight') {
        audioEl.currentTime += 3
      } else if (e.key === 'ArrowLeft') {
        audioEl.currentTime -= 3

        if (audioEl.currentTime === 0) {
          audioPauseEl.classList.remove('active-player')
          audioPauseEl.children[0].src = playImg
          audioEl.pause()
        }
      }
    }
  })

  audioEl.addEventListener('loadedmetadata', () => {
    const maxTime = roundValue(audioEl.duration)

    audioTimeEl.textContent = `00:00-${timeConverter(maxTime)}`
  })

  progressBarEl.addEventListener('click', e => {
    const commonFactor = e.offsetX / audioBarWidth
    audioEl.currentTime = audioEl.duration * commonFactor

    clearInterval(timeInterval)
    getCurrentTime()
  })

  audioPauseEl.addEventListener('click', e => {
    e.preventDefault()
    audioPauseEl.classList.toggle('active-player')

    if (audioPauseEl.classList.contains('active-player')) {
      audioPauseEl.children[0].src = pauseImg
      audioEl.play()
      getCurrentTime()

      if (musicImageEl == null) return
      musicImageEl.classList.add('active-music')
    } else {
      if (musicImageEl !== null) {
        musicImageEl.classList.remove('active-music')
      }
      audioEl.pause()
      audioPauseEl.children[0].src = playImg
      clearInterval(timeInterval)
    }
  })

  musicLinks.forEach((el, index) => {
    el.addEventListener('click', event => {
      event.preventDefault()
      currentMusic = index
      setAudioMusic()
      resetLinks()

      el.classList.add('active-music-link')

      if (musicImageEl == null) return
      musicImageEl.classList.remove('active-music')
      setTimeout(() => {
        musicImageEl.classList.add('active-music')
      }, 300)
    })
  })
}
