<template>
  <div class="hollerword">
    <section>
      <p>
        <span>188</span>
        <span>
          <i class="el-icon-user"></i>
          用户总数
        </span>
      </p>
      <p>
        <span>297</span>
        <span>
          <i class="el-icon-s-help"></i>
          商品总数
        </span>
      </p>
      <p>
        <span>241</span>
        <span>
          <i class="el-icon-s-claim"></i>
          订单总数
        </span>
      </p>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.hollerword {
  margin-top: 20px;
  section {
    display: flex;
    // justify-content: space-between;
    width: 100%;
  }
  p {
    color: #fff;
    width: 20%;
    margin: 0 10px;
    padding: 16px;
    box-sizing: border-box;
  }
  section > p:nth-child(1) {
    background: #f0b45f;
    margin: 0;
  }
  section > p:nth-child(2) {
    background: #6bbe6b;
  }
  section > p:nth-child(3) {
    background: #5db8d2;
    margin: 0;
  }

  span {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
}
</style>