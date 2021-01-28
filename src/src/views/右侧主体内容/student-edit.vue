<template>
  <div class="student-edit">
    <breadcrumb />
    <p>
      <span></span>基本信息
    </p>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="学生名称" prop="nickname">
        <el-input v-model="ruleForm.nickname" style="width:250px" size="small"></el-input>
        <span style="margin-left:4px;">{{ruleForm.nickname.length}}/15</span>
      </el-form-item>
      <el-form-item label="学生手机号" prop="mobile" style="width:350px" size="small">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="学生头像">
        <el-upload
          class="upload-demo"
          action="http://120.53.31.103:84/api/public/img"
          list-type="picture"
          :http-request="handlePreview"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="ruleForm.sex" placeholder="请选择活动区域" style="width:90px" size="small">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
        <!-- {{sexs}} -->
      </el-form-item>
      <!-- 日期 -->
      <el-form-item label="出生日期">
        <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="选择日期" size="small"></el-date-picker>
      </el-form-item>
      <!-- 所在城市 -->
      <el-form-item label="所在城市">
        <el-select v-model="provinced" placeholder="请选择省" size="small" @change="CityId($event)">
          <el-option
            :label="item.area_name"
            :value="item.id"
            v-for="(item,key) in province"
            :key="key"
          ></el-option>
        </el-select>
        <el-select v-model="cityed" placeholder="请选择市" size="small" @change="DistrictId($event)">
          <el-option :label="item.area_name" :value="item.id" v-for="(item,key) in city" :key="key"></el-option>
        </el-select>
        <el-select v-model="districted" size="small" placeholder="请选择区" @change="aaaa($event)">
          <el-option
            :label="item.area_name"
            :value="item.id"
            v-for="(item,key) in district"
            :key="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import breadcrumb from "../左侧组件拆分/breadcrumb"; //面包屑
export default {
  data() {
    return {
      ruleForm: {
        attr: [],
        birthday: "",
        mobile: "",
        nickname: "",
        sex: "",
        user_attr: "[]"
      },
      city_id: "", // 城市的ID
      district_id: "", // 地区的ID
      province_id: "", // 省份的ID
      province: [],
      city: [],
      district: [],
      rules: {
        nickname: [
          { required: true, message: "请输入学生名称", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入学员手机号", trigger: "blur" }
        ]
      },
      //上传头像
      DateImg: "",
      //修改数据
      provinced: "", // 省份的双向绑定
      cityed: "", // 城市的双向绑定
      districted: "", // 地区的双向绑定
      sexs: 0,
      //接参数
      id: 0
    };
  },
  mounted() {
    this.getprovince();
    this.getPuTs();
    // this.getPuTData();
  },
  methods: {
    //保存管理
    submitForm() {
      this.$refs.ruleForm.validate(val => {
        if (!val) return;
        if (this.ruleForm.sex == "男") {
          this.sexs = 0;
        } else if (this.ruleForm.sex == "女") {
          this.sexs = 1;
        }
        let data = {
          attr: this.ruleForm.attr,
          avatar: this.DateImg,
          birthday: this.ruleForm.birthday,
          city_id: this.city_id,
          district_id: this.district_id,
          mobile: this.ruleForm.mobile,
          nickname: this.ruleForm.nickname,
          province_id: this.province_id,
          sex: this.sexs,
          user_attr: this.ruleForm.user_attr
        };
        this.ruleForm.attr = this.ruleForm.attr;
        if (this.id) {
          this.$axios.PuTData(this.id, data).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.$router.push("/Student");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$axios.UPDATE(data).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.$router.push("/Student");
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    //头像上传
    handlePreview(file) {
      let content = file.file;
      let data = new FormData();
      data.append("file", content);
      this.$axios.Img(data).then(res => {
        this.DateImg = res.data.path;
      });
    },
    //地址
    getprovince() {
      this.$axios.sonArea().then(res => {
        // console.log(res);
        this.province = res.data;
      });
    },
    //获取市
    CityId(id) {
      this.province_id = id; // 省份id获取城市
      this.$axios.sonAreaId(id).then(res => {
        this.city = res.data;
      });
    },
    // 获取区
    DistrictId(id) {
      this.city_id = id; // 城市的ID获取地区
      this.$axios.sonAreaId(id).then(res => {
        this.district = res.data;
      });
    },
    // 地区id
    aaaa(id) {
      this.district_id = id;
    },
    //编辑
    getPuTs() {
      this.id = this.$route.query.id;
      // console.log(id);
      this.$axios.PuTs(this.id).then(res => {
        console.log(res);
        (this.ruleForm.attr = res.data.attr),
          (this.DateImg = res.data.avatar),
          (this.ruleForm.birthday = res.data.birthday),
          (this.cityed = res.data.city),
          (this.districted = res.data.district),
          (this.provinced = res.data.province),
          (this.district_id = res.data.district_id),
          (this.city_id = res.data.city_id),
          (this.province_id = res.data.province_id),
          (this.ruleForm.mobile = res.data.mobile),
          (this.ruleForm.nickname = res.data.nickname),
          (this.ruleForm.sex = res.data.sex),
          (this.ruleForm.user_attr = res.data.user_attr);
        if (res.data.sex == 0) {
          this.ruleForm.sex = "男";
        } else {
          this.ruleForm.sex = "女";
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.student-edit {
  box-sizing: border-box;
  padding: 1.25rem;
  p {
    span {
      border: 3px solid #2d8cf0;
      margin-right: 0.5rem;
    }
  }
  .el-form {
    margin-top: 0.625rem;
  }
}
</style>