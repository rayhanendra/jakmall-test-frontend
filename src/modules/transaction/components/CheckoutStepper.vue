<template>
  <div class="stepper">
    <div v-for="(step, index) in steps" :key="index" class="stepper__dot">
      <div
        class="stepper__dot__point"
        :class="{ 'stepper__dot__point--active': activeStep === index + 1 }"
      >
        {{ index + 1 }}
      </div>
      <div class="stepper__dot__text">{{ step }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  steps: {
    type: Array
  },
  activeStep: {
    type: Number,
    required: true
  }
})
</script>

<style scoped lang="stylus">
.stepper
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

  @media screen and (max-width: 768px)
    width 100%
    height 60px
    top -50px

  &__dot
    display flex
    align-items center
    justify-content space-between
    gap 10px
    font-size 16px
    font-weight bold
    color #FF8A00

    @media screen and (max-width: 768px)
      font-size 14px

    &__point
      width 20px
      height 20px
      border-radius 50%
      padding 4px
      background-color #FFE4B8
      display flex
      align-items center
      justify-content center
      color #FFFFFF

      &--active
        background-color #FF8A00

    &__text
      color #FF8A00
</style>
