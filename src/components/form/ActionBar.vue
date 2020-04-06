<template>
  <div>
    <q-separator class="q-my-lg" />
    <div class="row justify-end">
      <q-btn type="reset" flat color="primary" :label="$t('components.form.reset')" class="q-mr-sm" />
      <q-btn type="submit" color="primary" :label="$t('components.form.submit')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormActionBar',
}
</script>

<style lang="scss" module>
</style>