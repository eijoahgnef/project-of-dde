<template>
  <div class="login">
    <div class="title">
      <div class="title_icon"><img src="../../assets/icon/jiyi-1.png" alt="" /></div>
      <div class="title_dec">碎碎记</div>
    </div>
    <div class="login_warp">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="userState.account"
            name="account"
            label="账号"
            placeholder="账号"
            :rules="[{ validator, message: '请填写正确的手机号' }]"
          />
          <van-field
            v-model="userState.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div>
          <div v-if="useType === 'LOGIN'">
            <div style="margin: 16px">
              <van-button round block type="primary" native-type="submit">
                立即登录
              </van-button>
              <div class="link_register link_style" @click="toggle('REGISTER')">
                还没账号？请点击注册！
              </div>
            </div>
          </div>

          <div v-else>
            <div style="margin: 16px">
              <van-button round block type="primary" native-type="submit">
                立即注册
              </van-button>
              <div class="link_login link_style" @click="toggle('LOGIN')">
                已有账号？请登录！
              </div>
            </div>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
import { showSuccessToast, showFailToast } from 'vant';
import { reactive, ref } from "vue";
import { login, register } from "../../api/login/user";
import { useRouter } from 'vue-router';
export default {
  setup() {
    interface userStateType {
      account: string;
      password: string;
    }
    type telType = (str: string) => boolean;
    type toggleType = (type: string) => void;
    // 登录或者注册类型
    let useType = ref("LOGIN");
    const router = useRouter()
    // 跳登录或者注册
    const toggle: toggleType = (type: string) => {
      useType.value = type;
    };
    // 账号密码
    const userState = reactive<userStateType>({
      account: "",
      password: "",
    });
    // 号码校验
    const validator: telType = (val: string) => {
      let pattern = /^1[3456789]\d{9}$/;
      return pattern.test(val);
    };
    const onSubmit = async (values: Object) => {
      let tmp = JSON.stringify(values);
      // 登录状态
      if (useType.value === "LOGIN") {
        await login(tmp).then((res) => {
          
          if (res.code === 0) {
            window.sessionStorage.setItem('dailyJwt', res.token)
            window.sessionStorage.setItem('account',userState.account)
            router.push("/mine")
          } else {
            showFailToast(res.data)
          }
        });
      } else {
        await register(tmp).then((res) => {
          if (res.code === 400) {
            showFailToast(res.msg)
          } else if(res.code === 200) {
            showSuccessToast(res.msg)
            useType.value = 'LOGIN'
            userState.account = ""
            userState.password = ""
          }
        })
      }
    };

    return {
      userState,
      onSubmit,
      validator,
      useType,
      toggle,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  padding: 0 20px;
  margin-top: 40%;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    .title_icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .title_icon::after {
      content: "";
      width: 6px;
      height: 52px;
      border-left: 2px black solid;
    }
    .title_dec {
      font-family: "Georgia", Times, serif;
      font-weight: 500;
      font-size: 40px;
    }
  }
  .login_warp {
    margin-top: 20px;
    .link_style {
      // color: aliceblue;
      opacity: 0.8;
      margin-top: 10px;
      font-size: 12px;
      padding: 2px 0;
      text-align: center;
    }
  }
}
</style>

<style></style>
