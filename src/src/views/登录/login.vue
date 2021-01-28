<template>
  <div class="login">
    <section>
      <h4>欢迎使用后台管理系统</h4>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入用户名" prefix-icon="el-icon-user-solid">
            <i class="el-icon-user-solids"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入用户密码"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="TheLogin">登录</el-button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        mobile: "admin",
        password: "123456"
      },
      rules: {
        mobile: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 3, max: 6, message: "密码长度不够", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    TheLogin() {
      this.$refs.ruleForm.validate(val => {
        if (!val) return;
        this.$axios.login(this.ruleForm).then(res => {
          // console.log(res);
          if (res.code == 200) {
            // localStorage.setItem("admin", JSON.stringify(res.data.remember_token));
            localStorage.setItem("admin", res.data.remember_token);
            this.$message.success(res.msg);
            this.$router.push("/Homepage");
          } else if (res.code == 201) {
            this.$message.error(res.msg);
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: url(http://120.53.31.103:84/adminstyle/img/login_bg.1de8de0c.png);
  background-size: 100% 100%;
  position: relative;
  section {
    width: 25rem;
    height: 21.875rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    h4 {
      color: #2d8cf0;
      font-size: 1.25rem;
      margin: 0 0 3.25rem 0;
      text-align: center;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>