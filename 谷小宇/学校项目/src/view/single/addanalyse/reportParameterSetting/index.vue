<template>
  <div>reportParameterSetting</div>
</template>

<script>
export default {
  name: "ReportParameterSetting",
  methods: {
    order() {
      this.submitForm();
    },
    submitForm(){
       this.$bus.$emit("ReportParameterSetting_success",true)
    }
  },
};
</script>

<style>
</style>