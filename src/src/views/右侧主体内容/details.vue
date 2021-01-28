<template>
  <div class="details">
    <breadcrumb />
    <el-card class="box-card">
      <div class="Img">
        <img :src="details.avatar" alt />
      </div>
      <section>
        <p>
          <span>昵称：{{details.nickname}}</span>
          <span>手机：{{details.mobile}}</span>
          <span>
            性别：
            <span v-if="details.sex==1">女</span>
            <span v-else>男</span>
          </span>
          <span>出生日期：{{details.created_at}}</span>
        </p>
        <p class="p">所在城市：{{details.province}}-{{details.city}}-{{details.district}}</p>
      </section>
    </el-card>
  </div>
</template>

<script>
import breadcrumb from "../左侧组件拆分/breadcrumb"; //面包屑
export default {
  data() {
    return {
      details: []
    };
  },
  methods: {
    getdetails() {
      let id = this.$route.query.id;
      this.$axios.details(id).then(res => {
        this.details = res.data;
        console.log(res.data);
      });
    }
  },
  mounted() {
    this.getdetails();
  }
};
</script>

<style scoped lang="scss">
.details {
  padding: 1.25rem;
  box-sizing: border-box;
  .box-card {
    .Img {
      float: left;
      margin-right: 20px;
      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
    }
    p {
      margin-bottom: 10px;
      color: #515a6e;
      span {
        margin-right: 20px;
      }
    }
    .p {
      margin-bottom: 0;
    }
  }
}
</style>