<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item v-for="(item,key) in $store.state.Bread" :key="key" :to="item.path">
        <el-breadcrumb-item>{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.el-breadcrumb {
  border-bottom: 1px solid #ddd;
  line-height: 2;
  font-size: 1rem;
  text-indent: 1.25rem;
}
.el-breadcrumb-item {
  text-indent: 0;
}
</style>