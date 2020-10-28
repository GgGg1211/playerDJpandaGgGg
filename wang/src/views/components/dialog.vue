<template>
  <el-dialog id="dialog" title="选择学校" :visible.sync="isShow" width="461px">
    <div class="_title">
      {{
        schoolList.length > 0
          ? `当前账号已关联 ${schoolList.length}个学校，请选择登录学校`
          : `当前账号已关联 ${schoolList.length}个学校,请先加入学校`
      }}
    </div>
    <div class="_dialog_radio">
      <el-radio
        v-for="(item, index) in schoolList"
        v-model="schoolActive"
        :label="item.id"
        :key="index"
        border
        >{{ item.name }}</el-radio
      >
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="postSchoolRouter">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSchoolList, postSchoolRouter } from "../../api/api.js";
export default {
  name: "Dialog",
  props: { isShow: Boolean, userId: String },
  data() {
    return {
      schoolList: [],
      schoolActive: "1",
    };
  },
  watch: {
    schoolActive(newQuestion){
      console.log(newQuestion)
    },
    userId: function (newQuestion) {
      this.getSchoolList(newQuestion);
    },
  },
  methods: {
    // 获取学校列表
    getSchoolList(id) {
      getSchoolList({ id: id }).then((res) => {
        let { data } = res.data; 
        this.schoolList = data;
        this.schoolActive = data.length > 0 ? data[0].id : "";
      });
    },
    // 确认登录
    postSchoolRouter() {
      postSchoolRouter({
        userId: this.userId,
        id: this.schoolActive,
      }).then((res) => {
        localStorage.setItem("router", JSON.stringify(res.data.data));
        // params会受到重定向（redirect）的影响， login---->Home--->menu1
        this.$router.push({ name: "home" });
      });
      this.close()
    },
    close() {
      this.$emit("close");
    },
  },
  mounted() {
   
  },
};
</script>

<style lang="scss" scoped>
#dialog {
  width: 100%;
  height: 100%;
  ._title {
    margin: 0 auto;
    width: 381px;
  }
  ._dialog_radio {
    .el-radio {
      width: 381px;
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