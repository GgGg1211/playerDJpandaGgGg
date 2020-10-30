<template>
  <div class="conTable">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="sex" :formatter="formatter" label="性别">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 0">
            <el-button
              @click="handleClick(scope.row, 1)"
              type="success"
              size="small"
              >通过</el-button
            >
            <el-button
              type="danger"
              @click="handleClick(scope.row, 2)"
              size="small"
              >拒绝</el-button
            >
          </div>
          <el-tag v-if="scope.row.status == 1" type="success">已通过</el-tag>
          <el-tag v-if="scope.row.status == 2" type="danger">已拒绝</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        @size-change="SizeChange"
        @current-change="IndexChange"
        :current-page="page.pageIndex"
        :page-sizes="[5, 10]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="num"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { tableV } from "@/api/api.js";
export default {
  name: "menu1",
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10,
      },
      num: 1,
      tableData: [],
    };
  },
  methods: {
    requestData() {
      tableV(this.page).then((res) => {
        this.tableData = res.data.data.list;
        this.num = res.data.data.num;
      });
    },
    handleClick(res, num) {
      res.status = num;
    },
    formatter(row, column, cellValue, index) {
      return row.sex ? "男" : "女";
    },
    //修改当前条数
    SizeChange(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1;
      this.requestData();
    },
    //修改当前页数
    IndexChange(e) {
      this.page.pageIndex = e;
      this.requestData();
    },
  },
  mounted() {
    this.requestData();
  },
};
</script>

<style lang="scss">
.conTable {
  position: relative;
  .block {
    position: absolute;
    bottom: -80px;
    right: 0;
    .active {
      background-color: #1dbd84 !important;
    }
  }
}
</style>