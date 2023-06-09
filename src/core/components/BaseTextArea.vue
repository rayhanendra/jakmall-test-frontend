<template>
  <div
    class="text-area"
    :class="{
      'text-area--error': !!errorMessage && meta.touched,
      'text-area--disabled': disabled
    }"
  >
    <label
      :for="name"
      class="text-area__label"
      :class="{
        'text-area__label--valid': !!inputValue && meta.valid,
        'text-area__label--active': !!focus || !!inputValue,
        'text-area__label--error': !!errorMessage && meta.touched,
        'text-area__label--disabled': disabled
      }"
      >{{ label }}</label
    >
    <textarea
      class="text-area__input"
      rows="4"
      :class="{
        'text-area__input--valid': !!inputValue && meta.valid,
        'text-area__input--error': !!errorMessage && meta.touched
      }"
      :maxlength="200"
      :id="name"
      :name="name"
      :value="inputValue"
      :disabled="disabled"
      @focus="toggleFocus(true)"
      @input="handleChange"
      @blur="handleBlur"
    />
    <div class="text-area__counter">{{ 200 - inputValue.length }}</div>
    <p class="text-area__message--error" v-show="(errorMessage && meta.touched) || meta.valid">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { ref, toRef } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'text',
    validate: (value: string) => {
      return ['text', 'number', 'tel'].includes(value)
    }
  },
  value: {
    type: String,
    required: false,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: [String, Boolean],
    required: false
  },
  placeholder: {
    type: String,
    required: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const name = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleBlur: veeBlur,
  handleChange,
  meta
} = useField(name, undefined, {
  initialValue: props.value
})

const focus = ref(false)

const toggleFocus = (value: boolean) => {
  focus.value = value
}

const handleBlur = () => {
  veeBlur()
  toggleFocus(false)
}
</script>

<style scoped lang="stylus">
.text-area
  position relative
  width 100%

  &__label
    position absolute
    top 16px
    left 1px
    padding 4px 20px 0 20px
    font-size 16px
    font-weight 500
    color #999999
    width 80%
    background transparent
    transform translateY(0%)
    transition transform 0.2s ease-in-out, font-size 0.2s ease-in-out

    &--active
      transform translateY(-90%)
      font-size 13px

    &--valid
      color #1BD97B

    &--error
      color #FF8A00

    &--disabled
      color #E0E0E0

  &__input
    box-sizing border-box
    width 100%
    padding 20px 20px
    border 1px solid #E0E0E0
    border-radius none
    font-family 'Inter UI', sans-serif
    font-size 16px
    font-weight 500
    color #000000
    transition border 0.2s ease-in-out
    resize none

    &:focus
      outline none
      border-radius none

    &--valid
      border 1px solid #1BD97B

    &--error
      border 1px solid #FF8A00

    &--disabled
      border 1px solid #E0E0E0
      cursor not-allowed

  &__message
    font-size 14px
    font-weight 500
    color #FF8A00

    &--error
      margin-top 8px
      display block
      color #FF8A00

    &--disabled
      display none

  &__counter
    position relative
    top -26px
    right 20px
    float right
    font-size 14px
    font-weight 500
    color #999999
</style>
