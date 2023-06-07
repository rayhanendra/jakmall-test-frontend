<template>
  <div>
    <button @click="handleAddToCart">Add to Cart</button>
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
  quantity: 1
})

const handleAddToCart = () => {
  router.push({
    name: 'Checkout',
    params: { slug: item.value.slug }
  })
}
</script>

<style scoped></style>
