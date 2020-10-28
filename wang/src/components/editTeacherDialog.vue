<template>
  <div class="editTeacherDialog">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      class="_edit_teacher_dialog"
      width="600px"
    >
      <el-form
        :model="teacherInfo"
        status-icon
        :ref="form"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="教师姓名" prop="name">
          <el-input
            v-model="teacherInfo.name"
            placeholder="请输入您的姓名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="teacherInfo.phone"
            placeholder="请输入您的手机号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="teacherInfo.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="teacherInfo.sex">
            <el-option
              v-for="(item, key, index) in sexObj"
              :key="index"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特殊资源" prop="status">
          <el-radio-group el-radio-group v-model="teacherInfo.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0" class="forbid">禁止</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年级" prop="stage">
          <el-select v-model="teacherInfo.stage">
            <el-option
              v-for="(item, key, index) in stageObj"
              :key="index"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科" prop="subject">
          <el-select v-model="teacherInfo.subject">
            <el-option
              v-for="(item, key, index) in subjectObj"
              :key="index"
              :label="item"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="footer">
          <el-button type="primary" @click="close">取消</el-button>
          <el-button @click="setForm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EditTeacherDialog",
  props: {
    sexObj: Object,
    stageObj: Object,
    subjectObj: Object,
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
      form: "ruleForm",
      dialogVisible: false,
      teacherInfo: {
        id: "",
        name: "",
        phone: "",
        age: "",
        sex: "",
        stage: "",
        subject: "",
        status: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [ { required: true, message: "请输入您的手机号" },{ validator: rulePhone, message: "请输入正确的机号", trigger: ["blur","change"]}],
        subject: [{ required: true, message: "请选择学段", trigger: "change"}],
        stage: [{ required: true, message: "请选择学段", trigger: "change" }],
      },
    }
  },
  methods: {
    // 编辑 打开弹框并获取当前这条数据
    edit(e) {
      this.dialogVisible = true;
      this.teacherInfo = { ...e };
    },
    // 关闭弹窗 并重置对象
    close() {
      this.$refs[this.form].resetFields();
      this.dialogVisible = false;
      this.teacherInfo = {
        id: "",
      };
    },
    change() {
      // 防止数据用同一个地址，不发生改变
      this.$bus.$emit(
        "teacherInfo",
        JSON.parse(JSON.stringify(this.teacherInfo))
      );
      

      this.teacherInfo = {
        id: "",
      };
      this.dialogVisible = false;
      this.$refs[this.form].resetFields();
    },
    setForm() {
      console.log();
      this.$refs[this.form].validate((boolean, object) => {
        if (boolean) {
          this.change();
        }
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
._edit_teacher_dialog {
  .el-select {
    width: 100%;
  }
  .footer {
    text-align: center !important;
    position: relative;
    left: -40px;
  }

  .forbid {
    .el-radio__input.is-checked .el-radio__inner {
      border-color: red;
      background: red;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: red;
    }
  }
}
</style>