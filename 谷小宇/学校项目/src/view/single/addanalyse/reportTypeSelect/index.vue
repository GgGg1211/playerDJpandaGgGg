<template>
  <div>reportTypeSelect</div>
</template>

<script>
export default {
  name: "ReportTypeSelect",
  methods: {
    order() {
      this.submitForm();
    },
    submitForm() {
      this.$bus.$emit("ReportParameterSetting_success", true);
    },
  },
};
</script>

<style>
</style>