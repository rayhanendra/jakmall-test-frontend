<template>
  <div class="choices">
    <div
      v-for="choice in choiceOptions"
      :key="choice.value"
      class="choices__item"
      :class="{
        'choices__item--active': choice.value === select
      }"
      @click="handleSelect(choice.value)"
    >
      <div
        class="choices__item__label"
        :class="{
          'choices__item__label--active': choice.value === select
        }"
      >
        {{ choice.label }}
      </div>
      <div
        v-if="choice.price || choice.money"
        class="choices__item__value"
        :class="{
          'choices__item__value--active': choice.value === select
        }"
      >
        {{ choice?.price ? $filters.formatCurrency(choice.price) : '' }}
        {{ choice?.money ? $filters.formatCurrency(choice.money) + ' left' : '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const emit = defineEmits(['select'])

defineProps({
  select: {
    type: String,
    required: true
  },
  choiceOptions: {
    type: Array as PropType<any[]>,
    required: true
  }
})

const handleSelect = (value: string) => {
  emit('select', value)
}
</script>

<style scoped lang="stylus">
.choices
  display flex
  align-items center
  gap 20px

  @media screen and (max-width: 768px)
    gap 10px
    flex-direction column

  &__item
    width 100%
    max-width 180px
    height 44px
    display flex
    flex-direction column
    justify-content center
    gap 8px
    padding 12px 16px
    border 1px solid #CCCCCC
    cursor pointer
    
    @media screen and (max-width: 768px)
      box-sizing border-box
      max-width 100%
      height 60px
      padding 16px 20px

    &--active
      border 1px solid #1BD97B
      background: rgba(27, 217, 123, 0.1);

    &__label
        font-size 16px
        font-weight 500
        color #000000
        opacity 0.6

        &--active
          opacity 1

    &__value
        font-size 16px
        font-weight 500
        color #2D2A40
        opacity 0.6

        &--active
          opacity 1
</style>
