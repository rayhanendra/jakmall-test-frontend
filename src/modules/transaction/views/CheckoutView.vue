<template>
  <div class="background">
    <div class="container">
      <div class="card">
        <CheckoutStepper :steps="['Delivery', 'Payment', 'Finish']" :active-step="activeStep" />
        <div class="card__content">
          <div class="title">
            <div class="title__text">Delivery details</div>
            <div class="title__line"></div>
          </div>
        </div>
        <div class="card__summary">
          <div>Summary</div>
        </div>
        <button @click="handleNext">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CheckoutStepper from '../components/CheckoutStepper.vue'

const activeStep = ref(1)

const handleNext = () => {
  activeStep.value += 1

  if (activeStep.value > 3) {
    activeStep.value = 1
  }
}
</script>

<style scoped lang="stylus">
.background
  background-color #FFFAE6
  height 100vh

.container
  margin 0 auto
  padding 54px 0
  width 100%
  max-width 1100px
  height 100%
  max-height 550px

.card
  padding auto 40px
  background-color #FFFFFF
  box-shadow 2px 10px 20px rgba(255, 138, 0, 0.1);
  border-radius 4px;

  &__stepper
    position relative
    top -35px
    left 50%
    transform translateX(-50%)
    border-radius: 999px
    background-color #FFFAE6
    display flex
    align-items center
    justify-content space-evenly
    width 500px
    height 70px

    &__dot
      display flex
      align-items center
      justify-content space-between
      gap 10px
      font-size 16px
      font-weight bold
      color #FF8A00

      &__point
        width 20px
        height 20px
        border-radius 50%
        padding 4px
        background-color #FF8A00
        display flex
        align-items center
        justify-content center
        color #FFFFFF

      &__text
        color #FF8A00

  &__content
    flex-basis 1
    flex-direction column
    width 100%
    height 100%

  &__summary
    padding 40px 0
    margin-left 40px
    width 100%

.title
  margin-bottom 20px
  display flex
  flex-direction column

  &__text
    font-family 'Montserrat'
    font-size 36px
    font-weight bold
    color #FF8A00
    z-index 1

  &__line
    position relative
    bottom 8px
    width 300px
    height 8px
    background-color #EEEEEE
</style>
