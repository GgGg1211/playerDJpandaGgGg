<template>
  <div id="addanalyse">
    <div class="header">
      <el-steps :active="active" finish-status="success" simple>
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 4"></el-step>
      </el-steps>
    </div>
    <div class="main">
      <AddanlyseType ref="AddanlyseType" v-if="active === 0" />
      <ScoreImport ref="ScoreImport" v-if="active === 1" />
      <ReportParameterSetting
        ref="ReportParameterSetting"
        v-if="active === 2"
      />
      <ReportTypeSelect ref="ReportTypeSelect" v-if="active === 3" />
    </div>

    <div class="footer">
      <el-button
        class="prebtn"
        style="margin-top: 12px"
        @click="next"
        icon=""
        >{{ active === 3 ? "完成" : "下一步" }}</el-button
      >
      <el-button
        v-if="active !== 0"
        class="nextbtn"
        style="margin-top: 12px"
        @click="pre"
        icon=""
      >
        上一步</el-button
      >
    </div>
  </div>
</template>

<script>
import AddanlyseType from "./addanlyseType/index";
import ScoreImport from "./scoreImport/index";
import ReportParameterSetting from "./reportParameterSetting/index";
import ReportTypeSelect from "./reportTypeSelect/index";
export default {
  name: "Addanalyse",
  data() {
    return {
      active: Number(JSON.parse(sessionStorage.getItem("active"))) || 0,
      components_fini: [
        "AddanlyseType",
        "ScoreImport",
        "ReportParameterSetting",
        "ReportTypeSelect",
      ],
    };
  },
  methods: {
    pre() {
      this.active = this.active < 1 ? this.active : --this.active;
    },
    next() {
      if (this.active < this.components_fini.length) {
        this.$refs[`${this.components_fini[this.active]}`].order();
      }
      console.log(this.active);
    },
    add(e) {
      console.log(e);
      if (this.active < this.components_fini.length) {
        this.active = e ? ++this.active : this.active;
        sessionStorage.setItem("active", JSON.stringify(this.active));
      }
    },
  },
  components: {
    AddanlyseType,
    ScoreImport,
    ReportParameterSetting,
    ReportTypeSelect,
  },
  mounted() {
    this.$bus.$on("AddanluseType_success", this.add);
    this.$bus.$on("ScoreImport_success", this.add);
    this.$bus.$on("ReportParameterSetting_success", this.add);
    this.$bus.$on("ReportTypeSelect_success", this.add);
  },
};
</script>

<style lang=scss>
#addanalyse {
  width: 100%;
  .header {
    background-color: #fff;
    margin-bottom: 20px;
  }
  .main {
    height: 660px;
    overflow-y: hidden;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 30px 200px;
    box-sizing: border-box;
  }
  .footer {
    width: 100%;
    margin-left: 0px;
    height: 60px;
    background-color: #fff;
    .prebtn,
    .nextbtn {
      float: right;
      margin: 0 10px;
    }
  }
}
</style>