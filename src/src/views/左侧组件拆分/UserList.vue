<template>
  <div class="UserList">
    <el-col>
      <el-menu
        :default-active="$store.state.it.children[0].children[0].menu_url"
        class="el-menu-vertical-demo"
        v-for="(item,key) in $store.state.it.children"
        :key="key"
        unique-opened
        router
      >
        <el-submenu>
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="it.menu_url"
              v-for="(it,index) in item.children"
              :key="index"
            >{{it.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <!-- {{$store.state.it.children[0].children[0].menu_url}} -->
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style scoped>
</style>