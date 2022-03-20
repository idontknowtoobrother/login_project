<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters['auth/isLogin']
    }
  },
  watch: {
    isLogin(newValue, oldValue) {
        if(!newValue){
            this.$router.push('/login')
        }
    }
  },
  mounted() {
    if (!this.isLogin) {
      return this.$router.push('/login')
    }
  }
}
</script>

<style></style>
