<template>
  <div id="apply_management">
    <div class="search">
      <div class="phone">
        <span>手机号码：</span>
        <el-input
          v-model="phone"
          placeholder="请输入手机号"
          size="medium"
        ></el-input>
      </div>
      <div class="name">
        <span>姓名：</span>
        <el-input
          v-model="name"
          placeholder="请输入姓名"
          size="medium"
        ></el-input>
        <el-button type="success" size="medium">查找</el-button>
      </div>
      <div class="rigth">
        <el-button class="shareBtn" icon="el-icon-share" size="medium"
          >邀请教师</el-button
        >
        <el-button
          type="success"
          icon="el-icon-plus"
          size="medium"
          @click="$refs.editTeacherInfo.dialogVisible = true"
          >新增教师</el-button
        >
      </div>
    </div>
    <div class="table">
      <el-table :data="teacherList" height="1000" border>
        <el-table-column fixed prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="stage" label="年级" :formatter="stageF">
        </el-table-column>
        <el-table-column prop="subject" label="科目" :formatter="subjectF">
        </el-table-column>
        <el-table-column prop="sex" :formatter="sexF" label="性别">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.status === 1" size="medium" type="success" >正常</el-tag>
            <el-tag v-show="scope.row.status === 0" size="medium" type="danger"
              >禁用</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <i
              class="el-icon-edit-outline"
              @click="$refs.editTeacherInfo.edit(scope.row)"
            ></i>
            <i class="el-icon-delete"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <span class="demonstration">调整每页显示条数</span>
      <el-pagination
        class="page"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page.pageIndex"
        :page-sizes="[5, 10]"
        :page-size="page.pageSize"
        layout="sizes, prev, pager, next"
        :total="num"
      >
      </el-pagination>
    </div>
    <EditTeacherDialog
      ref="editTeacherInfo"
      :sexObj="sexObj"
      :stageObj="stageObj"
      :subjectObj="subjectObj"
    />
  </div>
</template>

<script>
// 因为全局注册了组件 所以 不需要再使用的页面单独引用
// import EditTeacherDialog from"../../components/editTeacherDialog.vue"
import { getTeacherList } from "@/api/api.js";
// vuex 获取公共数据需要的方法
import { mapState } from "vuex";
export default {
  name: "Management",
  data() {
    return {
      page: {
        pageSize: 10,
        pageIndex: 1,
      },
      num: 195,
      name: "",
      phone: "",
      teacherList: [],
    };
  },
  computed: {
    ...mapState("teacherInfo", {
      sexObj: "sexObj",
      stageObj: "stageObj",
      subjectObj: "subjectObj",
    }),
  },
  methods: {
    // 改变页码
    handleCurrentChange(index) {
      this.page.pageIndex = index;
      this.getTeacherList();
    },
    // 改变每页数据条数
    handleSizeChange(size) {
      this.page.pageSize = size;
      this.page.pageIndex = 1;
      this.getTeacherList();
    },
    // 格式化性别
    sexF(row) {
      return this.sexObj[row.sex] || this.sexObj["default"];
    },
    subjectF(row) {
      return this.subjectObj[row.subject];
    },
    stageF(row) {
      return this.stageObj[row.stage];
    },
    // 请求教师列表
    getTeacherList() {
      getTeacherList(this.page).then((res) => {
        let { data } = res.data;
        this.num = data.num;
        this.teacherList = data.list;
      });
    },
  },
  mounted() {
    console.log(mapState)
    this.$bus.$off("teacherInfo");
    this.$bus.$on("teacherInfo", (e)=>{
      let {id} = e
      this.teacherList.splice(id , 1, e)
    });
    this.getTeacherList();
  },
};
</script>

<style lang="scss">
#apply_management {
  width: 100%;
  height: 90%;
  padding: 20px;
  .search {
    position: relative;
    width: 100%;
    height: 70px;
    padding: 0 0 30px 0px;
    box-sizing: border-box;
    display: flex;
    div {
      display: flex;
      margin-right: 30px;
      span {
        display: inline-block;
        line-height: 40px;
        white-space: nowrap;
      }
      .el-input__inner {
        width: 300px !important;
        height: 40px !important;
      }
      .el-button {
        background-color: #1dbd84 !important;
        span {
          line-height: normal;
        }
      }
    }
    .rigth {
      position: absolute;
      right: 0;
      top: 0;
      .shareBtn {
        color: #1dbd84;
        border-color: #1dbd84;
        background-color: #fff !important;
      }
    }
  }
  .table {
    height: 100%;
    .el-icon-edit-outline,
    .el-icon-delete {
      display: inline-block;
      margin-left: 20px;
      font-size: 20px;
      color: #1dbd84;
      cursor: pointer;
    }
    .el-icon-delete{
      color: red;
    }
  }
  .block {
    position: absolute !important;
    bottom: 300px !important;
    right: 200px !important;
    display: flex;
    .el-pagination {
      position: relative;
      bottom: 0;
      right: 0;
      .active {
        background-color: #1dbd84;
      }
    }
  }
}
</style>