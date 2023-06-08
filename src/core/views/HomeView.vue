<template>
  <div class="product">
    <div class="product__card">
      <img
        class="product__image"
        src="https://images.samsung.com/id/smartphones/galaxy-s21/buy/s21_group_kv_mo_img.jpg"
        alt="product"
      />
      <div class="product__name">{{ item.name }}</div>
      <div class="product__price">{{ $filters.formatCurrency(item.price) }}</div>
      <div class="product__quantity">Jumlah: {{ item.quantity }}</div>
      <button class="product__button" type="button" @click="handleAddToCart">Checkout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const item = ref({
  id: 1,
  name: 'Samsung Galaxy S21',
  slug: 'samsung-galaxy-s21',
  price: 1000,
  quantity: 50
})

const handleAddToCart = () => {
  router.push({
    name: 'Checkout',
    params: { slug: item.value.slug }
  })
}
</script>

<style scoped lang="stylus">
.product
  height 100vh
  display flex
  justify-content center
  align-items center

  &__card
    display flex
    flex-direction column
    align-items start
    background-color #FFFFFF
    box-shadow 2px 10px 20px rgba(255, 138, 0, 0.1);
    border-radius 4px;
    padding 20px
    text-align center

    &:hover
      box-shadow 2px 10px 20px rgba(255, 138, 0, 0.2);

  &__image
    width 200px
    height 200px
    margin-bottom 10px

  &__name
    font-size 16px
    font-weight 600
    margin-bottom 10px

  &__price
    font-size 18px
    font-weight 600
    margin-bottom 10px

  &__quantity
    font-size 12px
    margin-bottom 10px

  &__button
    width 100%
    font-size 14px
    font-weight 600
    color #FF8A00
    border 1px solid #FF8A00
    border-radius 4px
    padding 10px 20px
    background-color transparent
    cursor pointer
    transition all 0.3s ease-in-out

    &:hover
      background-color #FF8A00
      color #FFFFFF
</style>
