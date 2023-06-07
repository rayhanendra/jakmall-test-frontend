<template>
  <div>
    <div class="text-field">
      <label
        :for="name"
        class="text-field__label"
        :class="{
          'text-field__label--active': !!focus || !!inputValue,
          'text-field__label--error': !!errorMessage && meta.touched,
          'text-field__label--disabled': disabled
        }"
        >{{ label }}</label
      >
      <input
        v-if="type === 'text'"
        type="text"
        class="text-field__input"
        :class="{
          'text-field__input--error': !!errorMessage && meta.touched,
          'text-field--input__disabled': disabled
        }"
        :id="name"
        :name="name"
        :value="inputValue"
        :disabled="disabled"
        @focus="toggleFocus(true)"
        @input="handleChange"
        @blur="handleBlur"
      />
      <input
        v-else-if="type === 'tel'"
        type="tel"
        pattern="[0-9\-\+\(\)]{6,20}"
        maxlength="20"
        class="text-field__input"
        :class="{
          'text-field__input--error': !!errorMessage && meta.touched
        }"
        :id="name"
        :name="name"
        :value="inputValue"
        :disabled="disabled"
        @keypress="handleKeyPress"
        @focus="toggleFocus(true)"
        @input="handleChange"
        @blur="handleBlur"
      />
    </div>
    <p class="text-field__message--error" v-show="(errorMessage && meta.touched) || meta.valid">
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

const handleKeyPress = (event: KeyboardEvent) => {
  // eslint-disable-next-line no-useless-escape
  const pattern = /[0-9\-\+\(\)]/
  const inputChar = String.fromCharCode(event.charCode)
  if (!pattern.test(inputChar)) {
    event.preventDefault()
  }
}
</script>

<style scoped lang="stylus">
.text-field
  position relative

  &__label
    position absolute
    top 14px
    left 20px
    font-size 16px
    font-weight 500
    color #999999
    transform translateY(50%)
    transition transform 0.2s ease-in-out, font-size 0.2s ease-in-out

    &--active
      transform translateY(-60%)
      font-size 13px

    &--error
      color #FF8A00

  &__input
    box-sizing border-box
    padding 20px 20px
    width 100%
    height 100%
    outline none
    border 1px solid #E0E0E0
    border-radius none
    font-size 16px
    font-weight 500
    color #000000
    transition border 0.2s ease-in-out

    &:focus
      border 1px solid #FF8A00

    &--error
      border 1px solid #FF8A00

  &__message
    font-size 14px
    font-weight 500
    color #FF8A00

    &--error
      margin-top 8px
      display block
      color #FF8A00

  // &--disabled
  //   &__label
  //     color #BDBDBD

  //   &__input
  //     border 1px solid #BDBDBD
  //     background-color #F5F5F5
  //     cursor not-allowed
</style>
