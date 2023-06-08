<template>
  <div>
    <BaseFormTitle title="Shipment" />
    <!-- <Form>
      <Field id="gosend" name="gosend" typ />
    </Form> -->
    <div class="choices">
      <div class="choices__item">
        <div class="choices__item__label">GO-SEND</div>
        <div class="choices__item__value">Rp15.000</div>
      </div>
      <div>
        <div>JNE</div>
        <div>Rp9.000</div>
      </div>
      <div>
        <div>Personal Courier</div>
        <div>Rp29.000</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseFormTitle from '@/core/components/BaseFormTitle.vue'
// import { Form, Field } from 'vee-validate'
</script>

<style scoped lang="stylus">

.choices
  display flex
  flex-direction column
  gap 20px

 &__item
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    gap 20px

    &__label
        font-size 16px
        font-weight 500

    &__value
        font-size 16px
        font-weight 500
        color #000000
</style>
