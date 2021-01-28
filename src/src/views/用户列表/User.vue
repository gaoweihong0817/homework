<template>
  <div class="User">
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-menu
            :default-active="this.$store.state.it.children[0].menu_url"
            class="el-menu-vertical-demo"
            router
          >
            <el-menu-item
              :index="item.menu_url"
              v-for="(item,index) in this.$store.state.it.children"
              :key="index"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-row>
      </el-aside>
      <el-main>
        <breadcrumb />
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import breadcrumb from "../左侧组件拆分/breadcrumb";
export default {
  components: { breadcrumb },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.User,
.el-container {
  width: 100%;
  height: 100%;
  .el-aside {
    background: #fff;
    // border: none;
    border-right: 1px solid #ddd;
  }
  .el-main {
    padding: 0;
    background: #fff;
  }
}
</style>