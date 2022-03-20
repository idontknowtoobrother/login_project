<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{ isLogin }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>

</style>
