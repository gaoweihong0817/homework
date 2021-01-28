<template>
  <div class="student">
    <section>
      <el-form :inline="true" class="demo-form-inline" :model="formInline">
        <el-form-item label="学员状态">
          <el-select placeholder="请选择" v-model="formInline.status">
            <el-option label="禁用" value="1"></el-option>
            <el-option label="启用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生名称">
          <el-input placeholder="请输入学生关键字" v-model="formInline.nickname"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input placeholder="请输入手机号" v-model="formInline.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">查询</el-button>
          <el-button @click="onRest">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
    <!-- 按钮 -->
    <el-row>
      <el-button type="primary" size="small" @click="NewMembers">新增学员</el-button>
      <el-button type="primary" size="small">批量导入</el-button>
      <el-button type="primary" size="small">批量导出</el-button>
      <el-button type="primary" size="small">查看报表</el-button>
    </el-row>
    <!-- 渲染表格 -->
    <el-table stripe style="width: 100%" border :data="Tab">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="学生名称" width="250">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt />
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="250"></el-table-column>
      <el-table-column prop="status" label="状态" width="250">
        <template slot-scope="scope">
          <span v-if="scope.row.status===0">禁止</span>
          <span v-else>启用</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="250">
        <template slot-scope="scope">
          <span>{{scope.row.updated_at|time}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="250" fixed="right">
        <template slot-scope="scope">
          <p>
            <span @click="details(scope.row.uid)">详情</span>-
            <span @click="editor(scope.row.uid)">编辑</span>-
            <span v-if="scope.row.status===0" @click="Up(scope.row.uid)">启用</span>
            <span v-else @click="Up(scope.row.uid)">禁用</span>-
            <span @click="del(scope.row.uid)">删除</span>-
            <span>重置密码</span>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <div class="foot">
      <span>导出所选</span>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        status: "",
        nickname: "",
        mobile: ""
      },
      page: 1,
      limit: 10,
      Tab: [],
      total: ""
    };
  },
  methods: {
    getTab() {
      const params = {
        page: this.page,
        limit: this.limit,
        status: this.formInline.status,
        nickname: this.formInline.nickname,
        mobile: this.formInline.mobile
      };
      this.$axios.Table(params).then(res => {
        // console.log(res);
        this.Tab = res.data.list;
        this.total = res.data.total;
      });
    },
    //分页
    handleSizeChange(limit) {
      this.limit = limit;
      this.getTab();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getTab();
    },
    //删除
    del(id) {
      this.$confirm(
        "删除后，该学员将无法登录学员端，且学员列表将不再展示该学员信息，与之关联的数据也将被清除是否确认？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$axios.drlDel(id).then(res => {
            // console.log(res);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTab();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //启用禁用
    Up(id) {
      // console.log(id);
      this.$confirm(
        "禁用后此学员将无法登录网站，确定要禁用该学员吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$axios.UpData(id).then(res => {
            // console.log(res);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "修改状态成功!"
              });
              this.getTab();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消选择"
          });
        });
    },
    //新增成员 添加  跳转页面
    NewMembers() {
      this.$router.push("/student-edit");
    },
    // 搜索
    onSubmit() {
      this.getTab();
    },
    //重置
    onRest() {
      (this.formInline.status = ""),
        (this.formInline.nickname = ""),
        (this.formInline.mobile = "");
      this.getTab();
    },
    //详情页跳转
    details(id) {
      this.$router.push(`/details?id=${id}`);
    },
    //编辑
    editor(id) {
      // console.log(id);
      this.$router.push(`/student-edit?id=${id}`);
    }
  },
  mounted() {
    this.getTab();
  },
  //转换时间
  filters: {
    time(curTime) {
      var nd = new Date(curTime * 1000);
      var y = nd.getFullYear();
      var mm = nd.getMonth() + 1;
      var d = nd.getDate();
      var h = nd.getHours();
      var m = nd.getMinutes();
      if (mm < 10) {
        mm = "0" + mm;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (h < 10) {
        h = "0" + h;
      }
      if (m < 10) {
        m = "0" + m;
      }
      return y + "-" + mm + "-" + d + " " + h + ":" + m;
    }
  }
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  justify-content: space-between;
}
.student {
  padding: 1rem;
  box-sizing: border-box;
}
.el-table {
  margin-top: 1rem;
}
img {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 1rem;
}
p > span {
  color: #2d8cf0;
  font-size: 0.68rem;
  cursor: pointer;
}
.foot {
  display: flex;
  margin-top: 0.6rem;
  justify-content: space-between;
  span {
    color: #2d8cf0;
    font-size: 0.68rem;
  }
}
</style>