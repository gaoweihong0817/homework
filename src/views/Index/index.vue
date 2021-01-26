<template>
  <div class="index">
    <el-container>
      <el-header style="height: 50px;">
        <h4>MMALL ADMIN</h4>
        <section>
          <p>欢迎,{{$store.state.username}}</p>
          <el-button type="info" size="small" style="height: 30px;" @click="Edit">退出</el-button>
        </section>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="2" class="el-menu-vertical-demo" router>
            <el-menu-item index="/hollerword">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,key) in $store.state.break" :key="key">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    Edit() {
      this.$confirm("确定退出后台管理系统吗", "是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.Edit().then(res => {
            this.$message.success("退出成功");
            this.$router.push("/login");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.index,
.el-container {
  width: 100%;
  height: 100%;
}

.el-header {
  background-color: #f5f5f5;
  color: #333;
  line-height: 50px;
  border-bottom: 1px solid #ddd;
  position: relative;
  section {
    position: absolute;
    display: flex;
    right: 20px;
    top: 0;
    p {
      margin-right: 10px;
    }
    .el-button {
      margin-top: 10px;
    }
  }
}

.el-aside {
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  line-height: 60px;
  border-right: 1px solid #ddd;
  .el-menu {
    background: #f5f5f5;
    height: 100%;
  }
}

.el-main {
  background-color: #fff;
  color: #333;
  .el-breadcrumb {
    font-size: 28px;
    color: #666;
  }
}
</style>