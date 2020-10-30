<template>
  <div id="AddanluseType">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="分析名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="cla">
        <el-select v-model="ruleForm.cla" placeholder="请选择年级">
          <el-option
            v-for="(item, key, index) in type"
            :label="item"
            :key="index"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入学年份" prop="year">
        <el-select v-model="ruleForm.year" placeholder="请选择入学年份">
          <el-option
            v-for="(item, key, index) in year"
            :label="item"
            :key="index"
            :value="key"
          >
            {{ item }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="考试科目" prop="subject"  >
        <el-select v-model="ruleForm.subject" multiple placeholder="请选择考试科目">
          <el-option
            v-for="(item, key, index) in subject"
            :label="item"
            :key="index"
            :value="key"
          >
            {{ item }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="考试时间" prop="date">
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="分析类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio-button
            v-for="(item, key, index) in type"
            :label="key"
            :key="index"
            >{{ item }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AddanluseType",
  computed: {
    ...mapState("single", {
      type: "type",
      cla: "class",
      year: "year",
    }),
    ...mapState("teacherInfo", {
      subject: "subject",
    }),
  },
  data() {
    return {
      ruleForm: {
        name: "",
        type: [],
        input1: "",
        date: "",
      },
      rules: {
        name: [{ required: true, message: "请输入分析名称", trigger: "blur" }],
        cla: [
          { required: true, message: "请选择年级", trigger: "change" },
          { required: true, message: "请选择年级", trigger: "blur" },
        ],
        year: [
          { required: true, message: "请选择入学年份", trigger: "change" },
          { required: true, message: "请选择入学年份", trigger: "blur" },
        ],
        subject: [
          { required: true, message: "请选择考试科目", trigger: "change" },
          { required: true, message: "请选择考试科目", trigger: "blur" },
        ],
        date: [
          { required: true, message: "请选择考试时间", trigger: "change" },
          { required: true, message: "请选择考试时间", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择年级", trigger: "change" },
          { required: true, message: "请选择年级", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    order() {
      this.submitForm();
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$bus.$emit("AddanluseType_success",true)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang=scss>
#AddanluseType {
  width: 600px;
  margin: 0 auto;
  .el-input__inner {
    width: 400px;
  }
}
</style>