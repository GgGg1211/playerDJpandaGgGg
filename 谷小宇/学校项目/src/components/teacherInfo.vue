<template>
  <div id="TeacherInfo">
    <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible"
      :before-close="cancle"
    >
      <el-form :model="form" :rules="rules" ref="numberValidateForm">
        <el-form-item
          label="教师姓名"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="请选择活动区域">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="form.status" label="1">通过</el-radio>
          <el-radio v-model="form.status" label="0">禁止</el-radio>
        </el-form-item>
        <el-form-item label="学段" :label-width="formLabelWidth" prop="stage">
          <el-select v-model="form.stage" placeholder="请选择活动区域">
            <el-option
              v-for="(item, index) in stage"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="任教科目"
          :label-width="formLabelWidth"
          prop="subject"
        >
          <el-select v-model="form.subject" placeholder="请选择活动区域">
            <el-option
              v-for="(item, index) in subject"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle('numberValidateForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('numberValidateForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TeacherInfo",
  computed: {
    ...mapState("teacherInfo", {
      stage: "stage",
      subject: "subject",
    }),
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      let istrue = /^1[3,4,5,6,7,8,9]\d{9}$/.test(value);
      if (!istrue) {
        return callback(new Error("请输入正确手机号"));
      }
    };
    return {
      dialogFormVisible: false,

      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "80px",
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: checkPhone,
            trigger: "change",
          },
        ],
        stage: [{ required: true, message: "请选择学段", trigger: "change" }],
        subject: [
          { required: true, message: "请选择任教科目", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.$bus.$emit("newForm", this.form);
          this.form = {};
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    row(e) {
      this.dialogFormVisible = true;
      this.form = JSON.parse(JSON.stringify(e));
      console.log(this.form, "ccccc");
    },
    cancle() {
      this.dialogFormVisible = false;
      this.form = {};
      this.$refs.numberValidateForm.resetFields();
    },
    dialogS() {},
  },
  mounted() {},
};
</script>

<style lang=scss>
#TeacherInfo {
  .el-dialog {
    width: 600px;
  }
  .el-input__inner {
    width: 300px;
  }
}
</style>