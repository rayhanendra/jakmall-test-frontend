<template>
  <button type="submit" class="button" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  disabled: Boolean
})
</script>

<style scoped lang="stylus">
.button
    width 100%
    padding 20px 0
    border 1px solid rgba(255, 255, 255, 0.2)
    box-shadow 3px 5px 10px rgba(255, 138, 0, 0.2)
    background-color #FF8A00
    border-radius 2px
    color #FFFFFF
    font-family 'Inter UI'
    font-size 16px
    font-weight bold
    cursor pointer
    transition all 0.3s ease-in-out

    &:hover
        background-color #FF8A00
        opacity 0.8

    &:disabled
        background-color #FF8A00
        opacity 0.5
        cursor not-allowed
</style>
