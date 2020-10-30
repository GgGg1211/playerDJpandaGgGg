<template>
  <el-container id="home">
    <el-header>
      <div class="out" @click="logingOut">
        <i class="el-icon-switch-button"></i>
        退出
      </div>
      <div class="out">
        <img
          src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3947572783,1476163811&fm=26&gp=0.jpg"
          alt=""
        />
      </div>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <el-menu
          :router="true"
          :default-active="active"
          :default-openeds="openeds"
          class="el-menu-vertical-demo"
        >
          <submenu :router="router" />
        </el-menu>
      </el-aside>
      <el-main>
        <!-- home：显示路由页面（当前页面下，也就是home的子项） -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>
      Copyright © 易校园有限公司
      湘ICP备15014295号-2公安机关备案号：43011102001327 友情链接：易校园
    </el-footer>
  </el-container>
</template>

<script>
import submenu from "@/components/my_components.vue";
export default {
  name: "index",
  data() {
    return {
      user: "",
      active: "",
      openeds: ["学校管理", "成绩分析"],
      router: JSON.parse(localStorage.getItem("router")).data,
    };
  },
  components: {
    submenu: submenu,
  },
  // 切换同级children，监听$route的变化来修改菜单
  watch: {
    //to:即将去哪个路由，from:从哪个路由过来
    $route(to, from) {
      this.active = to.path;
    },
  },
  methods: {
    logingOut() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
    openedsFn(arr) {
      arr.forEach((item) => {
        if (item.children) {
          this.openeds.push(item.name);
          this.openedsFn(item.children);
        }
      });
    },
    getActive(arr, redirect) {
      if (redirect !== "/") {
        this.active = this.$route.path;
        return;
      }
      arr.forEach((item, index) => {
        if (index === 0) {
          if (item.children) {
            this.getActive(item.children);
          } else {
            this.active = item.path;
            this.$router.push({ path: item.path });
          }
        }
      });
    },
  },
  mounted() {
    this.openedsFn(this.router);
    this.getActive(this.router[0].children, this.$route.path);
    if (localStorage.getItem("user")) {
      this.user = localStorage.getItem("user");
    } else {
      this.$router.push({ name: "login" });
    }

    /*
    1、this.$router: router的实例，包含全部路由和参数
    2、this.$route: 当前页面路由参数，包含传过来的参数params、query
    */
    this.active = this.$route.path;

    // 使用params传参：默认会隐藏拼接的路径，同时需要使用name形式传递
    // this.$router.push({ name: "Login", params: { id: "456" } });

    // 使用query传参：默认显示/login?id=456，不受name、path的影响
    //  this.$router.push({ name: "Login", query: { id: "456" } });
  },
};
</script>

<style lang="scss">
#home {
  height: 100%;
  width: 100%;
  background: #fcfcfc;
  .el-header {
    background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%) !important;
    line-height: 70px !important;
    height: 70px !important;
    padding: 0 31px;
    .out {
      float: right;
      color: #fff;
      cursor: pointer;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
  .el-footer {
    background: #343533;
    color: #fff;
    text-align: center;
    line-height: 43px !important;
    height: 43px !important;
    font-size: 16px;
  }
  .el-aside {
    border-right: 1px solid #ccc;
    background: #fff;
    .el-menu-vertical-demo {
      border-right: 0px solid #fff;
    }
  }
}
</style>
