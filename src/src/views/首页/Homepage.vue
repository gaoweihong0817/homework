<template>
  <div class="Homepage">
    <el-container>
      <el-header>
        <section>
          <img
            src="http://120.53.31.103:84/uploads/image/2020-05-27/zmkrHVxaa4fVI5jtcNZ3xGy6KPU0QjXzxPjX7trh.jpeg"
            alt
            class="Img"
          />
        </section>
        <el-menu
          class="el-menu-demo"
          :default-active="activeIndex"
          mode="horizontal"
          v-for="(item,index) in data"
          :key="index"
          background-color="transparent"
          text-color="#fff"
          @select="handleSelect"
          router
        >
          <el-menu-item :index="item.menu_url">
            <i :class="icon[item.id]"></i>
            {{item.title}}
          </el-menu-item>
        </el-menu>
        <div class="head">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
            <el-submenu index="2">
              <template slot="title">
                <img
                  class="Imgs"
                  src="http://120.53.31.103:84/uploads/image/2020-12-15/rqV0Gx2LOgMbLvFfA93xp3V4mth36vKGFTZnSBBp.jpeg"
                  alt
                />
              </template>
              <el-menu-item>
                <img
                  class="Imgst"
                  src="http://120.53.31.103:84/uploads/image/2020-12-15/rqV0Gx2LOgMbLvFfA93xp3V4mth36vKGFTZnSBBp.jpeg"
                  alt
                />
                <span>超级管理员</span>
              </el-menu-item>
              <el-menu-item index="2-2">账号管理</el-menu-item>
              <el-menu-item @click="exit">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      activeIndex: "1",
      icon: {
        "300": "el-icon-user",
        "97": "el-icon-data-analysis",
        "1000": "el-icon-headset",
        "135": "el-icon-shopping-bag-2",
        "121": "el-icon-money",
        "200": "el-icon-price-tag",
        "124": "el-icon-guide",
        "174": "el-icon-male",
        "181": "el-icon-connection"
      },
      key: "User",
      //xhr.status:获取当前服务器的响应状态  200=>成功
      // code: 0
    };
  },
  methods: {
    getdata() {
      this.$axios.menuInfo().then(res => {
        // console.log(res);
        this.data = res.rows;
        // this.code = res.code;
        this.set();
      });
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      this.key = key;
      this.set();
    },
    set() {
      let list = this.data.filter(item => {
        // console.log(item.menu_url)
        return this.key === item.menu_url;
      });
      // console.log(list);
      this.$store.commit("children", list[0]);
    },
    //取it得值
    // get(){
    //   let get=sessionStorage.getItem('it')
    //   this.$store.commit('children',get)
    // },
    //退出
    exit() {
      this.$confirm("是否要退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.removeItem("admin");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消登录"
          });
        });
    }
  },
  mounted() {
    this.getdata();
    // this.get()
  }
};
</script>

<style scoped lang="scss">
.Homepage {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
    .el-header {
      background: linear-gradient(
        to right,
        rgb(41, 69, 203),
        rgb(43, 114, 237)
      );
      color: #333;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      section {
        display: flex;
        height: 4rem;
        width: 10.625rem;
        justify-content: center;
        align-items: center;
        .Img {
          width: 3.75rem;
          height: 2.5rem;
        }
      }
      .el-menu-demo {
        font-size: 0.875rem;
        color: #fff;
      }
    }
    .el-main {
      background-color: #e9eef3;
      color: #333;
      padding: 0;
      height: 100vh;
    }
  }
}
.Imgs {
  width: 4.2rem;
  height: 3.2rem;
}
.Imgst {
  width: 3rem;
  height: 3rem;
  margin-right: 2rem;
}
</style>