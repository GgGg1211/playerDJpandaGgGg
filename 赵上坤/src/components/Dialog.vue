<template>
  <el-dialog
    title="选择学校"
    :visible.sync="dialogVisible"
    width="450px"
    class="_dialog"
  >
    <div class="_title">
      {{
        data.length > 0
          ? `当前账号已关联 ${data.length}个学校，请选择登录学校`
          : `当前账号已关联 ${data.length}个学校,请先加入学校`
      }}
    </div>
    <div class="_dialog_radio">
      <el-radio
        v-model="radio"
        v-for="(item, index) in data"
        :key="index"
        :label="item.id"
        border
        >{{ item.name }}</el-radio
      >
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="okscrollV">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { scrollV, okscrollV } from "@/api/api.js";
export default {
  name: "Dialog",
  props: {
    dialogVisible: Boolean,
    userId: String,
  },
  watch: {
    userId: function (newQuestion) {
      this.getSchoolList(newQuestion);
    },
  },

  data() {
    return {
      radio: "1",
      data: [],
    };
  },
  methods: {
    getSchoolList(id) {
      scrollV({ id: id }).then((res) => {
        this.data = res.data.data;
        this.radio = res.data.data.length > 0 ? res.data.data[0].id : "";
      });
    },
    okscrollV() {
      console.log(this.userId, this.radio);
      okscrollV({
        userId: this.userId,
        id: this.radio,
      }).then((res) => {
        localStorage.setItem("router", JSON.stringify(res.data));
        this.$router.push({ name: "index" });
        this.close();
      });
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
._dialog {
  ._title {
    margin: 0 auto;
    width: 375px;
  }
  ._dialog_radio {
    .el-radio {
      width: 375px;
      display: block;
      margin: 10px auto;
      .el-radio__input {
        float: right;
        margin-left: 20px;
      }
    }
  }
}
</style>