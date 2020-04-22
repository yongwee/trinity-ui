<template>
  <div class=" q-mb-sm text-subtitle1 text-grey-8">
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'FormSubtitle',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>