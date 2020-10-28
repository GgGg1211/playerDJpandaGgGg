<template>
  <el-container id="home">
    
    <el-header
      ><div class="head-po" @click="tabUser">
        <div>
          <img :src="user.url" alt="" /><span>教师</span>
        </div>

        <div @click="exit">
          <i class="el-icon-switch-button"></i><span>退出</span>
        </div>
      </div></el-header
    >

    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          :default-active="active"
          class="el-menu-vertical-demo"
          :default-openeds="openeds"
        >
        
          <Submenu :params="routers" />
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
    <el-footer></el-footer>
    <Dialog :userId="userId" :show="show" v-on:close="show = false" />

  </el-container>
  
</template>

<script>
import Submenu from "@/components/submenu.vue";
import Dialog from "@/components/dialog.vue";

export default {
  name: "Home",
  data() {
    return {
      active: "",
      openeds: [],
      routers: JSON.parse(localStorage.getItem("router")) || [],
      userId: "",
      show: false,
      loading: false,
      user:JSON.parse(localStorage.getItem("user")) || {}
    };
  },
  components: {
    Submenu: Submenu,
    Dialog: Dialog,
  },
  methods: {
    exit() {
      localStorage.clear();
      this.$router.push({ name: "Login", params: {} });
    },
    //默认选择展开第一项
    unfold(routers) {
      routers.forEach((it) => {
        if (it.children) {
          this.openeds.push(it.name);
          this.unfold(it.children);
        }
      });
    },
    //重定向
    confirmActive(routers) {
      if (this.$route.path !== "/") {
        this.active = this.$route.path;
        return;
      }
      if (routers[0].children) {
        this.confirmActive(routers[0].children);
      } else {
        this.active = routers[0].path;
        this.$router.push({ path: routers[0].path });
      }
      // console.log(this.active);
    },
    tabUser() {
      this.show = true;
      this.userId = JSON.parse(localStorage.getItem("user")).id;
    },
  },
  watch: {
    $route(to) {
      this.active = to.path;
      this.routers = JSON.parse(localStorage.getItem("router"));
    },
    routers() {
      this.show = false;
      this.unfold(this.routers);
      this.confirmActive(this.routers);
    },
  },
  mounted() {
    let userInfo = window.localStorage.getItem("user");
    // console.log(this.$router);
    // console.log(this.$route);

    if (!userInfo) {
      this.$router.push({ name: "Login", params: {} });
    }
    this.unfold(this.routers);
    this.confirmActive(this.routers);
    // console.log(this.active);
  },
};
</script>

<style lang=scss>
#home {
  height: 100%;

  .el-header {
    background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%) !important;
    .head-po {
      float: right;
      line-height: 60px;
      display: flex;
      & > div {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 10px;
        & > img {
          width: 20px;
          height: 20px;
          border: solid 1px #ccc;
          border-radius: 50%;
        }
        & > i {
          margin-left: 10px;
        }
        & > span {
          margin: 0 5px;
        }
      }
    }
  }
  .el-footer {
    background-color: #000 !important;
  }
  .el-aside {
    width: 300px !important;
    border-right: solid 1px #ccc;
    .el-menu-vertical-demo {
      border: none;
    }
  }

  .el-main {
    background-color: #e9eef3;
    padding: 10px;
  }
}
</style>