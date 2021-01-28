<template>
  <div class="Teach">
    <el-container>
      <el-aside width="200px">
        <UserList></UserList>
      </el-aside>
      <el-main>
        <breadcrumb />
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import UserList from "../左侧组件拆分/UserList";
import breadcrumb from "../左侧组件拆分/breadcrumb";
export default {
  components: { UserList, breadcrumb },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.Teach,
.el-container {
  width: 100%;
  height: 100%;
  .el-aside {
    background: #fff;
    border: none;
  }
  .el-main {
    padding: 0;
  }
}
</style>