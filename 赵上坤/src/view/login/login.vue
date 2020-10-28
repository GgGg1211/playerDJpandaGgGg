<template>
  <div id="login">
    <div class="content">
      <div class="left">
        <img :src="img.loginleft" />
      </div>
      <div class="right">
        <div class="template">
          <img :src="img.mobilelogo" />
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
            v-model="phone"
          >
          </el-input>
          <el-input
            class="code"
            prefix-icon="el-icon-lock"
            placeholder="请输入短信验证码"
            v-model="code"
          >
            <div
              :class="/^1[3456789]\d{9}$/.test(phone) ? 'ok' : 'send'"
              slot="suffix"
              @click="isbool ? send() : ''"
            >
              {{ renderNum }}
            </div>
          </el-input>

          <el-button class="login" @click="loginFn" :disabled="!(phone && code)"
            >手机号登陆</el-button
          >
        </div>
      </div>
    </div>
    <Dialog
      :dialogVisible="dialogVisible"
      :userId="userId"
      v-on:close="dialogVisible = false"
    />
  </div>
</template>

<script>
import { mylist, phone, login, loginV, scrollV } from "@/api/api.js";
import loginleft from "@/assets/img/login/loginleft.png";
import mobilelogo from "@/assets/img/login/mobilelogo.png";
import Dialog from "@/components/Dialog.vue";
export default {
  name: "login",
  data() {
    return {
      img: {
        loginleft: loginleft,
        mobilelogo: mobilelogo,
      },
      dialogVisible: false,
      phone: "",
      radio: "1",
      code: "",
      renderNum: "获取验证码",
      phoneCode: "",
      isbool: true,
      userId: "",
    };
  },
  methods: {
    getList() {},
    send() {
      if (/^1[3456789]\d{9}$/.test(this.phone)) {
        let num = () => {
          return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        };
        this.phoneCode = num();
        phone({
          phone: this.phone,
          phoneCode: this.phoneCode,
        }).then((res) => {
          console.log(res);
          this.code = res.data.data.code;
        });
        let that_ = this;
        let dateFn = () => {
          let second = 10;
          let inter;
          function dateFn1() {
            if (second === 0) {
              that_.isbool = true;
              that_.renderNum = "获取验证码";
              clearInterval(inter);
            } else {
              that_.isbool = false;
              that_.renderNum = second--;
            }
          }
          inter = setInterval(() => {
            dateFn1();
          }, 1000);
        };
        dateFn();
      }
    },
    loginFn() {
      loginV({
        phone: this.phone,
        code: this.code,
        phoneCode: this.phoneCode,
      }).then((res) => {
        this.userId = res.data.data.id;
        localStorage.setItem("user", JSON.stringify(res.data.data));
        // this.$router.push({ name: "index" });
        this.dialogVisible = true;
      });
    },
  },
  components: {
    Dialog: Dialog,
  },
  // html挂在后执行（只执行一次）适用于请求数据
  mounted: function () {
    if (localStorage.getItem("user")) {
      this.$router.push({ name: "index" });
    } else {
    }
  },
};
</script>

<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login/bg.png") no-repeat;
  background-size: cover;
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
      margin: 0 auto;
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
        background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%);
        border-radius: 5px;
        color: #fff;
      }
    }
  }
}
</style>
