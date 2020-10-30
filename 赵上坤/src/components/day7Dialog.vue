<template>
  <el-dialog
    :title="form.id || form.id === 0 ? '编辑信息' : '新增老师'"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="close"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="教师姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder="请输入您的手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" placeholder="请输入您的年龄"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option
            v-for="(item, key, index) in sex"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学段" prop="stage">
        <el-select v-model="form.stage" placeholder="请选择学段">
          <el-option
            v-for="(item, key, index) in stage"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任教科目" prop="subject">
        <el-select v-model="form.subject" placeholder="请选择任教科目">
          <el-option
            v-for="(item, key, index) in subject"
            :key="index"
            :label="item"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setForm('form')">确~认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "EditaDialog",
  props: {
    subject: Object,
    stage: Object,
    sex: Object,
  },
  data() {
    var rulePhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error(rule.message));
      } else {
        return callback();
      }
    };
    return {
      dialogVisible: false,
      form: {
        id: "",
        name: "",
        phone: "",
        age: "",
        sex: "",
        stage: "",
        subject: "",
      },
      rules: {
        name: [{ required: true, message: "请输入您的姓名" }],
        phone: [
          { required: true, message: "请输入您的手机号" },
          {
            validator: rulePhone,
            message: "请输入正确的手机号",
            trigger: ["blur", "change"],
          },
        ],
        stage: [{ required: true, message: "请选择学段", trigger: "change" }],
        subject: [
          {
            required: true,
            message: "请选择任教科目",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    edit(e) {
      this.dialogVisible = true;
      this.form = { ...e };
    },
    setForm(str) {
      this.$refs[str].validate((boolean) => {
        if (boolean) {
          this.change();
        }
      });
    },
    change() {
      this.$bus.$emit(
        //应为vue中的$emit是子父传参的方法，所以this.$bus => vue实例  上面也有。并且也有bus自己的一套使用方式
        "teacherInfo",
        JSON.parse(JSON.stringify(this.form))
      );
      this.form = {
        id: "",
      };
      this.dialogVisible = false;
      this.$refs["form"].resetFields();
    },
    close() {
      this.$refs["form"].resetFields();
      this.dialogVisible = false;
      this.form = {
        id: "",
      };
    },
  },
};
</script>

<style>
</style>