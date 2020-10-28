<template>
  <el-dialog
    title="请选择学校"
    :visible.sync="show"
    width="420px"
    left
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <div class="dialog-radios">
      <el-radio
        v-for="(item, index) in schoolLevel"
        :key="index"
        v-model="radio"
        :label="item.id"
        >{{ item.name }}</el-radio
      >
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getLevel, postSchoolRouter } from "@/api/httpApi";
export default {
  name: "Dialog",
  props: { userId: String, show: Boolean },

  data() {
    return {
      radio: "1",
      schoolLevel: [],
      loading: false,
    };
  },
  methods: {
    getLevel(id) {
      getLevel(id).then((re) => {
        // console.log(re);
        this.schoolLevel = re.data;
        this.radio = re.data.length > 0 ? re.data[0].id : "";
        // console.log(this.radio);
      });
    },
    confirm() {
      this.loading = true;
      // console.log(1);
      postSchoolRouter({
        id: this.radio,
        userId: this.userId,
      }).then((res) => {
        localStorage.setItem("router", JSON.stringify(res.data));
        this.$router.push({ name: "Home" });
        this.loading = false;
      });
    },
    close() {
      this.$emit("close");
    },
  },
  watch: {
    userId(newName) {
      this.getLevel({ id: newName });
    },
  },
  mounted() {},
};
</script>

<style>
</style>