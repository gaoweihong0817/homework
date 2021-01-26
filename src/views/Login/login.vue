<template>
  <div class="login">
    <section>
      <h3>请登录</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="User Name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" placeholder="Password" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="Login">登录</el-button>
      </el-form>
    </section>
  </div>
</template>

<script>
// import { login } from "@/http/http.js"
export default {
  data() {
    return {
      ruleForm: {
        // username: "admin",
        // password: "admin"
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户名密码", trigger: "blur" },
          { min: 0, max: 6, message: "密码输入不正确", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    Login() {
      const data = {
        username: this.ruleForm.username,
        password: this.ruleForm.password
      };
      if (this.ruleForm.username == "" || this.ruleForm.password == "") {
        this.$message.error("用户名和密码不能为空");
        return false;
      }
      this.$refs.ruleForm.validate(val => {
        if (!val) return false;
        this.$axios.login(data).then(res => {
          console.log("Home did mount");
          this.$message.success("登录成功");
          this.$router.push("/index");
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
  position: relative;
  section {
    width: 400px;
    height: 224px;
    border: 1px solid #ddd;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -20%);
    h3 {
      height: 40px;
      line-height: 40px;
      text-indent: 20px;
      background: #f5f5f5;
      font-weight: normal;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
    .el-form {
      padding: 10px;

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>