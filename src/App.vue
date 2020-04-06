<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('user/fetchRole');
  },
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-enter, fade-leave-to {
  opacity: 0;
}
</style>