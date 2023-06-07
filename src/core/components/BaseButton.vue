<template>
  <button type="submit" class="button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped lang="stylus">
.button
    width 100%
    padding 20px 0
    background-color #FF8A00
    color #FFFFFF
    font-family 'Inter UI'
    font-size 16px
    font-weight bold
    border none
    cursor pointer
    transition all 0.3s ease-in-out

    &:hover
        background-color #FF8A00
        opacity 0.8
</style>
