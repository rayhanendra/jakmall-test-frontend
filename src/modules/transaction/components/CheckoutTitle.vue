<template>
  <div class="title">
    <div class="title__text">{{ title }}</div>
    <div class="title__line"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="stylus">
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

    @media screen and (max-width: 768px)
      font-size 24px

  &__line
    position relative
    bottom 8px
    width 300px
    height 8px
    background-color #EEEEEE

    @media screen and (max-width: 768px)
      width 200px
      height 6px
      bottom 6px
</style>
