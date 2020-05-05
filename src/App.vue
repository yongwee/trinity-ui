<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-enter, fade-leave-to {
  opacity: 0;
}

// Dialog message body style
.q-dialog__message {
  color: $grey-9;
}

.q-breadcrumbs .q-router-link--active {
  background: none;
}
</style>