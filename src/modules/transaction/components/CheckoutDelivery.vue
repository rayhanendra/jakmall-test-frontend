<template>
  <div class="delivery__title">
    <BaseFormTitle title="Delivery details" />
    <div class="input">
      <input v-model="dropshipper" type="checkbox" id="dropshipper" />
      <label for="dropshipper">Send as Dropshipper</label>
    </div>
  </div>
  <div class="form">
    <div class="form__main">
      <BaseTextField type="text" name="name" label="Name" />
      <BaseTextField type="tel" name="phoneNumber" label="Phone Number" />
      <BaseTextArea name="address" label="Delivery Address" />
    </div>
    <div class="form__dropshipper">
      <BaseTextField
        type="text"
        name="dropshipperName"
        label="Dropshipper Name"
        :disabled="!dropshipper"
      />
      <BaseTextField
        type="tel"
        name="dropshipperPhoneNumber"
        label="Dropshipper Phone Number"
        :disabled="!dropshipper"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseFormTitle from '@/core/components/BaseFormTitle.vue'
import BaseTextField from '@/core/components/BaseTextField.vue'
import BaseTextArea from '@/core/components/BaseTextArea.vue'
import { ref, watch } from 'vue'

const emit = defineEmits(['update:dropshipper'])

const dropshipper = ref(false)

watch(dropshipper, (value) => {
  emit('update:dropshipper', value)
})
</script>

<style scoped lang="stylus">

.delivery
  &__title
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    gap 20px

.input
  display flex
  flex-direction row
  align-items center
  gap 10px

  label
    font-family 'Inter UI'
    font-size 14px
    font-weight 500
    color #000000

.form
  display flex
  flex-direction row
  gap 20px

  @media screen and (max-width: 768px)
    flex-direction column

  &__main
    width 100%
    display flex
    flex-direction column
    gap 20px

  &__dropshipper
    width 100%
    display flex
    flex-direction column
    gap 20px
</style>
