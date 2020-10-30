<template>
  <div>scoreImport</div>
</template>

<script>
export default {
  name: "ScoreImport",
  methods: {
    order() {
      this.submitForm();
    },
    submitForm() {
      this.$bus.$emit("ScoreImport_success", true);
    },
  },
};
</script>

<style>
</style>