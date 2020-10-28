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
      </div>
    </div>
    <div class="table">
      <el-table :data="teacherList" border>
        <el-table-column fixed prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="date" label="出生年月"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>
        <el-table-column prop="sex" :formatter="sexF" label="性别">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 0">
              <el-button
                @click="handleClick(scope.row, 1)"
                type="success"
                size="medium"
                >通过</el-button
              >
              <el-button
                type="danger"
                @click="handleClick(scope.row, 2)"
                size="medium"
                >拒绝</el-button
              >
            </div>
            <el-tag v-if="scope.row.status === 1" size="medium" type="success"
              >已通过</el-tag
            >
            <el-tag v-if="scope.row.status === 2" size="medium" type="danger"
              >已拒绝</el-tag
            >
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
  </div>
</template>

<script>
import { getSchoolApply } from "@/api/api.js";
export default {
  name: "apply_management",
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
  methods: {
    // 点击按钮改变是沟通的状态
    handleClick(row, status) {
      console.log(row, status)
      row.status = status;
    },
    // 改变页码
    handleCurrentChange(index) {
      this.page.pageIndex = index;
      this.getSchoolApply();
    },
    // 改变每页数据条数
    handleSizeChange(size) {
      this.page.pageSize = size;
      this.page.pageIndex = 1;
      this.getSchoolApply();
    },
    // 格式化性别
    sexF(row) {
      return row.sex ? "男" : "女";
    },
    // 请求教师列表
    getSchoolApply() {
      getSchoolApply(this.page).then((res) => {
        let { data } = res.data;
        this.num = data.num;
        this.teacherList = data.list;
      });
    },
  },
  mounted() {
    this.getSchoolApply();
  },
};
</script>

<style lang="scss">
#apply_management {
  width: 100%;
  height: 90%;
  padding: 20px;
  .search {
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
    }
  }
  .table {
    height: 100%;
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