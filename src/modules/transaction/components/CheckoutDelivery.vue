<template>
  <BaseFormTitle title="Delivery details" />
  <div class="form">
    <div class="form__main">
      <BaseTextField type="text" name="name" label="Name" />
      <BaseTextField type="tel" name="phoneNumber" label="Phone Number" />
      <BaseTextArea name="address" label="Delivery Address" />
    </div>
    <div class="form__dropshipper">
      <BaseTextField type="text" name="dropshipperName" label="Dropshipper Name" />
      <BaseTextField type="tel" name="dropshipperPhoneNumber" label="Dropshipper Phone Number" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseFormTitle from '@/core/components/BaseFormTitle.vue'
import BaseTextField from '@/core/components/BaseTextField.vue'
import BaseTextArea from '@/core/components/BaseTextArea.vue'
</script>

<style scoped lang="stylus">
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
