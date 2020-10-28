<template>
  <el-container id="home">
   
    <el-header>
      <div class="out" @click="loginOut">
        <i class="el-icon-switch-button"></i>
        退出
      </div>
      <div class="photo" @click="isShow=true">
        <img :src="imgSrc" alt="" />
        教师
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
          <dynamicRouter :routerArr="routerMenu" />
        </el-menu>
      </el-aside>
      <el-main>
        <!-- home：显示路由页面（当前页面下，也就是home的子项） -->
        <router-view></router-view>
      </el-main>
      <Dialog :isShow="isShow" :userId="user.id" @close="isShow = false" />
    </el-container>
    <el-footer>
      Copyright © 易校园有限公司
      湘ICP备15014295号-2公安机关备案号：43011102001327 友情链接：易校园
    </el-footer>
  </el-container>
</template>
<script>
import dynamicRouter from "@/views/components/dynamicRouter";
import Dialog from "@/views/components/dialog"
export default {
  name: "Home",
  data() {
    return {
      user: "",
      imgSrc: "",
      active: "",
      openeds: [],
      routerMenu: JSON.parse(localStorage.getItem("router")) || [],
      isShow: false,
    };
  },
  // 里面放方法
  methods: {
    // 退出登录
    loginOut() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
    // 展开所有分页
    defaultShow(l) {
      l.forEach((item) => {
        if (item.children) {
          this.openeds.push(item.name);
          this.defaultShow(item.children);
        }
      });
    },
    // 页面动态重定向 根据数据的排列顺序决定
    redirectRouter(l, redirect) {
      // 点哪个路由显示哪个路由
      if (redirect !== "/") {
        this.active = this.$route.path;
        return;
      }
      // 再次加载"/"页面时 默认为数据的第一个子项的路由
      if (l[0].children) {
        l[0].children.forEach((item, index) => {
          if (index === 0) {
            if (item.children) {
              this.redirectRouter(item.children, redirect);
            } else {
              this.active = item.path;
              this.$router.push({ path: item.path });
            }
          }
        });
      } else {
        this.active = l[0].path;
      }
    },
  },
  // 防止同级路由历史回退 页面选中位置不改变状态的bug to时目标路由 from 是出发路由
  watch: {
    // 再Vue原型上挂在的方法
    $route(to) {
      this.active = to.path;
      this.routerMenu = JSON.parse(localStorage.getItem("router")) || [];
    },
    routerMenu() {
      this.defaultShow(this.routerMenu);
      this.redirectRouter(this.routerMenu, this.$route.path);
    },
  },
  // html挂在之后触发
  mounted() {
    if (localStorage.getItem("user")) {
      this.redirectRouter(this.routerMenu, this.$route.path);
      this.defaultShow(this.routerMenu);
      this.user = JSON.parse(localStorage.getItem("user"));
      this.imgSrc = this.user.url;
    } else {
      this.$router.push({ name: "login" });
    }
    // 在mounted中调用这两个函数 并传参
  },
  components: {
    dynamicRouter,
    Dialog
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
    }
    .photo {
      position: absolute;
      right: 140px;
      top: 15px;
      width: 80px;
      line-height: 40px;
      color: #fff;
      border-radius: 20px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
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