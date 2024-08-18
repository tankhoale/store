<template>
  <div class="home-banner">
    <swiper :loop="true" :spaceBetween="30" :effect="'fade'" :centeredSlides="true" :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }" :navigation="false" :modules="modules" class="mySwiper">
      <swiper-slide v-for="(img, index) in $store.getters['bnr/getSlider']" :key="index">
        <img :src="img.path">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>

import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Navigation, EffectFade } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {
      modules: [Autoplay, Navigation, EffectFade]
    }
  }
}
</script>

<style scoped>
  .home-banner {
    width: 100%;
    height: 300px;
    margin: 15px 0px;
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
</style>
