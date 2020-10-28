<template>
  <div id="login">
    <div class="content">
      <div class="left">
        <img src="../../assets/login/image/loginleft.png" />
      </div>
      <div class="right">
        <div class="template">
          <img src="../../assets/login/image/mobilelogo.png" />
          <el-input
            class="phone"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
            v-model="phone"
            @input="onInput"
          >
          </el-input>
          <el-input
            class="code"
            prefix-icon="el-icon-lock"
            placeholder="请输入短信验证码"
            v-model="code"
            @input="onInput"
          >
            <div
              :class="/^1[3456789]\d{9}$/.test(phone) ? 'ok send' : 'send'"
              slot="suffix"
              @click="send"
            >
              {{ codeText }}
            </div>
          </el-input>
          <el-button
            :class="
              /^1[3456789]\d{9}$/.test(phone) && code
                ? 'login'
                : 'disable login'
            "
            :disabled="isDisabled"
            @click="onLogin"
            >登录 / 注册</el-button
          >
        </div>
      </div>
    </div>
    <!-- 这是弹框组件 -->
    <Dialog :isShow="isShow" :userId="userId" @close="isShow = false"/>
  </div>
</template>

<script>
import { postUser } from "@/api/api.js";
import { random } from "@/utills/utills";
// 想要使用组件需要引用
import Dialog from "../components/dialog.vue";
export default {
  name: "login",
  data() {
    return {
      phone: "",
      code: "",
      isDisabled: true,
      userPhone: "",
      userCode: "",
      codeText: "发送",
      isShow: false,
      userId: "0",
    };
  },
  components: {
    Dialog:Dialog
  },
  methods: {
    send() {
      if (/^1[3456789]\d{9}$/.test(this.phone)) {
        this.userCode = random(1000, 9999);
        this.code = this.userCode;
        let count = 10;
        let timer = setInterval(() => {
          count--;
          this.codeText = count < 1 ? "发送" : count;
          if (count < 1) {
            clearInterval(timer);
          }
        }, 1000);
      }
    },
    onInput() {
      this.isDisabled =
        /^1[3456789]\d{9}$/.test(this.phone)? false : true;
    },
    onLogin() {
      if (/^1[3456789]\d{9}$/.test(this.phone)) {
          postUser({
            phone: this.phone,
            code: this.code,
            phoneCode: this.userCode,
          }).then((res) => {
            let { data,code, message } = res.data;
            if (code === 1) {
              let {id} = data;
              this.userId = id;
              this.isShow = true;
              localStorage.setItem("user", JSON.stringify(data));
              this.$message({
                message: message,
                type: code === 1 ? "success" : "error",
              });
              
            }
          });
      }
    },
    // html挂在后执行（只执行一次）适用于请求数据
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.$router.push({ name: "home" });
    }

  },
  
};
</script> 
<style lang="scss">
// @符号只会在script 标签中生效 样式里使用图片只能用绝对路径
// scoped 解决了样式私有化的问题 给你的标签内加上混淆 实现私有化
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/login/image/bg.png") no-repeat;
  background-size: cover;
}
.content {
  background: #fff;
  width: calc(100% - 240px);
  height: calc(100% - 200px);
  border-radius: 16px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
}
.left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.right {
  flex: 1;
  .template {
    width: 500px;
    position: relative;
    top: 180px;
    left: 200px;
    img {
      width: 160px;
      height: 70px;
      margin-top: 180px;
      margin-left: 158px;
      display: block;
    }
    .phone,
    .code {
      width: 477px;
      margin-top: 20px;
      .el-input__inner {
        border: 0px solid #fff;
        border-bottom: 1px solid #ddd;
        border-radius: 0px;
      }
    }
    .code {
      .el-input__suffix {
        .el-input__suffix-inner {
          display: inline-block;
          height: 100%;

          .send {
            height: 100%;
            line-height: 40px;
            cursor: not-allowed;
          }
          .ok {
            color: #0fbc77;
            cursor: pointer;
          }
        }
      }
    }
    .login {
      margin-top: 40px;
      width: 477px;
      height: 46px;
      background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%) !important;
      border-radius: 5px;
      color: #fff !important;
    }
    .disable {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}
</style>