<template>
  <div class="CourseManage">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <!-- //课程类型 -->
      <el-form-item label="课程分类">
        <el-cascader
          :options="Optines"
          clearable
          size="small"
          v-model="formInline.course_classify_id"
          @change="OptionsId"
        ></el-cascader>
      </el-form-item>
      <!--  -->
      <el-form-item label="课程类型">
        <el-select v-model="formInline.course_type" placeholder="请选择" size="small">
          <el-option :value="key" :label="item" v-for="(item,key) in  Info.course_name" :key="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程状态">
        <el-select v-model="formInline.status" placeholder="请选择" size="small">
          <el-option label="已上架" value="1"></el-option>
          <el-option label="已下架" value="2"></el-option>
          <el-option label="待上架" value="3"></el-option>
        </el-select>
      </el-form-item>

      <!-- 时间 -->
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="formInline.time"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          @change="TimeDate"
        ></el-date-picker>
      </el-form-item>

      <el-col>
        <el-form-item label="课程名称" prop="name" size="small">
          <el-input v-model="formInline.keywords" placeholder="请输入课程名称关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" size="small">搜索</el-button>
          <el-button @click="resetForm" size="small">重置</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <!-- 新增课程 -->
    <el-button @click="resetForm('ruleForm')" type="primary">新增课程</el-button>
    <!-- 渲染列表 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column label="课程ID" width="70" prop="id">
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column prop="title" label="课程名称" width="120"></el-table-column>
      <el-table-column prop="classify_title" label="课程分类" width="110"></el-table-column>
      <el-table-column prop="course_type" label="课程类型" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.course_type===2">大班课</span>
          <span v-if="scope.row.course_type===3">小班课</span>
          <span v-if="scope.row.course_type===4">公开课</span>
          <span v-if="scope.row.course_type===5">点播课</span>
          <span v-if="scope.row.course_type===7">面授课</span>
          <span v-if="scope.row.course_type===8">音频课</span>
          <span v-if="scope.row.course_type===9">系统课</span>
          <span v-if="scope.row.course_type===10">图文课</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="上架状态" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.status===1">已上架</span>
          <span v-if="scope.row.status===2">已下架</span>
          <span v-if="scope.row.status===3">待上架</span>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="序号" width="80"></el-table-column>
      <el-table-column prop="created_name" label="创建人" width="140"></el-table-column>
      <el-table-column label="创建时间" width="140">
        <template slot-scope="scope">
          <span>{{scope.row.created_at|time}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" label="更新时间" width="140">
        <template slot-scope="scope">
          <span>{{scope.row.updated_at|time}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <p>
            <span @click="XiaIia(scope.row.id)" v-if="scope.row.status===1">下架</span>
            <span @click="ShangIia(scope.row.id)" v-else>上架</span>-
            <span @click="Sort(scope.row)">排序</span>-
            <span>课程大纲</span>-
            <span>编辑</span>-
            <span>删除</span>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="foot">
      <span>上架</span>
      <span>下架</span>
      <span>删除</span>
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
    <!-- 排序 弹框 -->
    <el-dialog title="排序" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="将课程序号设置为">
          <el-input v-model="sort" autocomplete="off" type="number" style="width:100px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="btn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //课程
      options: [],
      Info: {},
      //
      formInline: {
        course_classify_id: "",
        course_type: "",
        status: "",
        time: "",
        keywords: ""
      },
      //数据渲染
      tableData: [],
      finish_created_at: "",
      keywords_type: "title",
      limit: 10,
      page: 1,
      start_created_at: "",
      teacher_id: "",
      total: 0,
      //排序
      dialogFormVisible: false,
      sort: "",
      id: ""
    };
  },
  methods: {
    //课程类型
    getClassify() {
      this.$axios.course().then(res => {
        this.options = res.data;
      });
    },
    getInfo() {
      this.$axios.Info().then(res => {
        // console.log(res);
        this.Info = res.data;
      });
    },
    //数据请求list
    gettableData() {
      let data = {
        course_classify_id: this.formInline.course_classify_id,
        course_type: this.formInline.course_type,
        finish_created_at: this.finish_created_at,
        keywords: this.formInline.keywords,
        keywords_type: this.keywords_type,
        limit: this.limit,
        page: this.page,
        start_created_at: this.start_created_at,
        status: this.formInline.status,
        teacher_id: this.teacher_id
      };
      this.$axios.List(data).then(res => {
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    //搜索
    submitForm() {
      this.gettableData();
    },
    //重置
    resetForm() {},
    //
    handleSelectionChange() {},
    //分页
    handleSizeChange(limit) {
      this.limit = limit;
      this.gettableData();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.gettableData();
    },
    //时间
    TimeDate(time) {
      this.finish_created_at = new Date(time[0]).toLocaleString();
      this.start_created_at = new Date(time[1]).toLocaleString();
    },
    //子菜单Id
    OptionsId(id) {
      this.formInline.course_classify_id = id[1];
    },
    //排序
    Sort(id) {
      this.id = id.id;
      this.sort = id.sort;
      this.dialogFormVisible = true;
    },
    btn() {
      this.$axios.Sort(this.id, { sort: this.sort }).then(res => {
        this.gettableData();
      });
      this.dialogFormVisible = false;
    },
    //上架
    ShangIia(id) {
      // console.log(id);
      this.id = id.id;
      this.$axios.selves({ id, status: 1 }).then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.gettableData();
        } else if (res.code == 201) {
          this.$message.error(res.msg);
          this.gettableData();
        }
      });
    },
    //下架
    XiaIia(id) {
      this.$confirm("下架后，将无法进入该课程详情界面，是否确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.selves({ id, status: 2 }).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.gettableData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  mounted() {
    this.getClassify();
    this.getInfo();
    this.gettableData();
  },
  computed: {
    Optines() {
      return this.options.filter(item => {
        return item.children_num != 0;
      });
    }
  },
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
.CourseManage {
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
}
.el-table {
  margin-top: 6px;
}
.foot {
  display: flex;
  margin-top: 0.6rem;
  position: relative;
  span {
    color: #2d8cf0;
    font-size: 0.68rem;
    margin: 10px 10px;
  }
  .el-pagination {
    position: absolute;
    right: 20px;
  }
}
p > span {
  color: #2d8cf0;
  font-size: 0.68rem;
  cursor: pointer;
}
</style>