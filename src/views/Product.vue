<template>
  <Auth>
    <div>
      <h1>Product View</h1>
    </div>
  </Auth>
</template>

<script>
import Auth from '../components/Auth.vue'
import { getProducts } from '../services/product'
export default {
  async mounted() {
    const product = await getProducts()
    console.log(product)
  },
  components: {
    Auth
  }
}
</script>

<style></style>
