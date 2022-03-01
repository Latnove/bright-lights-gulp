import { webpChecker } from './modules/webpChecker.js'
import { audioMusicPlayer } from './modules/audioMusicPlayer.js'
import { swiper } from './modules/swiper.js'
import { copyEmail } from './modules/copyEmail.js'
import { scrollOnClick } from './modules/scrollOnClick.js'
import { openMBurger } from './modules/openMBurger.js'

const musicLinks = document.querySelectorAll('.tracks__link')

webpChecker()
audioMusicPlayer('intro')
audioMusicPlayer('tracks', musicLinks)
swiper('events')
copyEmail()
scrollOnClick()
openMBurger()
