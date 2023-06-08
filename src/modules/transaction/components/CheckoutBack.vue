<template>
  <div class="back" @click="handleClick">
    <svg-icon type="mdi" :path="mdiChevronLeftIcon" :size="18"></svg-icon>
    {{ backLabel[activeStep] }}
  </div>
</template>

<script setup lang="ts">
import { mdiChevronLeft } from '@mdi/js'
const mdiChevronLeftIcon = mdiChevronLeft

const emit = defineEmits(['click'])

defineProps({
  activeStep: {
    type: Number,
    required: true
  }
})

const backLabel: {
  [key: number]: string
} = {
  1: 'Back to Cart',
  2: 'Back to Delivery',
  3: 'Back to Payment'
}

const handleClick = () => {
  emit('click')
}
</script>

<style scoped lang="stylus">
.back
  position absolute
  display flex
  align-items center
  gap 10px
  margin-left 40px
  color #FF8A00
  font-size 14px
  font-weight 500
  cursor pointer
</style>
