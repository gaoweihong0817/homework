<template>
  <div class="goods">
    <!-- 渲染数据 -->
    <el-table :data="List" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //参数 条数
      pageNum: 1,
      //渲染表格
      List: []
    };
  },
  methods: {
    getList() {
      this.$axios.pages(this.pageNum).then(res => {
        console.log(res);
      });
    }
  },
   mounted() {
     this.getList()
   }
};
</script>

<style scoped>
</style>