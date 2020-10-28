<template>
  <div class="bgc">
    <Dialog :userId="userId" :show="show"  v-on:close="show=false"/>
 

    <div class="content">
      <div class="left">
        <img :src="imgs.loginleft" alt="" />
      </div>
      <div class="right">
        <div>
          <img :src="imgs.mobilelogo" alt="" />
          <div class="demo-input-suffix">
            <el-input
              id="phone"
              placeholder="请输入手机号"
              prefix-icon="el-icon-user"
              v-model="phone"
            >
            </el-input>
            <el-input
              id="send"
              placeholder="请输入验证码"
              prefix-icon="el-icon-lock"
              v-model="send"
            >
              <div
                :class="/^1[3456789]\d{9}$/.test(phone) ? 'ok send' : 'send'"
                slot="suffix"
                @click="sends"
              >
                {{ sendText }}
              </div>
            </el-input>
          </div>
          <button
            :class="
              !(/^1[3456789]\d{9}$/.test(this.phone) && send)
                ? 'no loginBtn'
                : 'loginBtn'
            "
            @click="loginBtn"
            :disabled="!(/^1[3456789]\d{9}$/.test(this.phone) && send)"
          >
            登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  postVerify,
  postLogin,
} from "@/api/httpApi";
import loginleft from "@/assets/img/login/loginleft.png";
import mobilelogo from "@/assets/img/login/mobilelogo.png";
import Dialog from "@/components/dialog.vue";
export default {
  name: "Login",
  data() {
    return {
      show:false,
      userId: "0",
      phone: "",
      send: "",
      random: null,
      disabled: true,
      sendText: "发送",
      imgs: {
        loginleft,
        mobilelogo,
      },

    };
  },
  components: {
    Dialog: Dialog,
  },
  methods: {
    sends() {
      // console.log(this);

      if (/^1[3456789]\d{9}$/.test(this.phone) && this.sendText === "发送") {
        let num = 10;
        let timer = setInterval(() => {
          num--;
          this.sendText = num;
          if (num < 0) {
            clearInterval(timer);
            this.sendText = "发送";
          }
        }, 1000);
        // console.log(this.phone);
        let random = Math.floor(Math.random() * 8999 + 1000);
        this.send = random;
        postVerify({ random }).then((res) => {
          // console.log(res);
          this.random = res.verify;
        });
      }
    },
    //首次点击登录获取学校列表
    loginBtn() {
      let params = {
        phone: this.phone,
        phoneCode: this.send,
        code: this.random,
      };
      // console.log(params);
      let mess = this.$message({
        message: "登陆中--------",
        duration: 15000,
      });
      postLogin(params).then((res) => {
        // console.log(res);

        mess.close();
        this.$message({
          message: res.message,
          type: res.code === 1 ? "success" : "error",
        });
        if (res.code === 1) {
          localStorage.setItem("user", JSON.stringify(res.data));
          // this.$router.push({ path: "/" });
          this.show = true;
          this.userId = res.data.id;
          // console.log(userId);
          // this.radio = res.data.id;
        }
      });
    },

    
  },

  mounted() {
    let userInfo = window.localStorage.getItem("user");
    if (userInfo) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style lang=scss>
.bgc {
  height: 100%;
  background-image: url("../../assets/img/login/bg.png");
  background-size: 100% 100%;
}
.content {
  width: 1200px;
  height: 800px;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}
.left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
}
.right {
  flex: 1;

  & > div {
    width: 400px;
    height: 400px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      margin-bottom: 50px;
    }

    .demo-input-suffix {
      width: 400px;
      margin-bottom: 30px;
      #phone,
      #send {
        width: 100%;
        border: none;
        border-bottom: solid 1px #ddd;
      }
      .send {
        line-height: 40px;
        color: #ddd;
        cursor: pointer;
      }
      .ok {
        line-height: 40px;
        color: aqua;
      }
    }
    .loginBtn {
      width: 100%;
      height: 50px;
      background: mediumaquamarine;
      color: #fff;
      cursor: pointer;
      font-size: 20px;
    }
    .no {
      opacity: 0.6;
    }
  }
}
.dialog-radios {
  .el-radio {
    width: 370px;
    display: block;
    margin: 10px 0;
    font-size: 20px;
    border: solid 1px #ccc;
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
  }
  .el-radio__input {
    float: right;
    margin-left: 10px;
  }
}
</style>
