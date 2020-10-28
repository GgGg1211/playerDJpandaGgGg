<template>
  <div id="apply">
    <div class="input">
      手机号：<el-input v-model="input1" placeholder="请输入内容"></el-input>
      姓名：<el-input v-model="input2" placeholder="请输入内容"></el-input>
       <el-button
            class="btn"
            type="success"
            size="small"
            >搜索</el-button
          >
    </div>

    <el-table :data="list" style="width: 100%" :border="true">
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="formatter">
      </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <div v-if="scope.row.status == 0">
            <el-button
              class="btn"
              type="success"
              size="small"
              @click="suClick(scope.row)"
              >通过</el-button
            >
            <el-button
              class="btn"
              type="danger"
              size="small"
              @click="faClick(scope.row)"
              >拒绝</el-button
            >
          </div>

          <el-button
            v-if="scope.row.status == 1"
            class="btn"
            type="success"
            plain
            size="small"
            >已通过</el-button
          >
          <el-button
            v-if="scope.row.status == 2"
            class="btn"
            type="danger"
            plain
            size="small"
            >已拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="sizes, prev, pager, next"
      :page-size="page.pageSize"
      :page-sizes="[5, 10]"
      :current-page="page.pageIndex"
      @size-change="sizeChange"
      @current-change="currentChange"
      :total="total"
    >
    </el-pagination>
  </div>
</template>


<script>
import { getInput } from "@/api/httpApi";
export default {
  name: "apply",
  data() {
    return {
      list: [],
      page: {
        pageIndex: 1,
        pageSize: 5,
      },
      total: 0,
      input1:'',
      input2:''
    };
  },
  methods: {
    suClick(row) {
      console.log(row);
      row.status = 1;
    },
    faClick(row) {
      console.log(row);
      row.status = 2;
    },
    getInput() {
      let { page } = this;
      getInput(page).then((res) => {
        console.log(res);
        this.list = res.data.list;
        this.total = res.data.num;
      });
    },
    formatter(row) {
      // console.log(row);
      return row.sex ? "男" : "女";
    },
    sizeChange(e) {
      let { page } = this;
      console.log(e);
      page.pageIndex = 1;
      page.pageSize = e;
      this.getInput();
    },
    currentChange(e) {
      console.log(2);
      let { page } = this;
      page.pageIndex = e;
      this.getInput();
    },
  },
  watch: {},
  mounted() {
    // console.log(1);
    this.getInput();
  },
};
</script>

<style lang=scss>
#apply {
  background: #fff;
  min-width: 94%;
  min-height: 95%;
  padding: 20px;
  .btn {
    width: 80px !important;
  }
  .input {
    .el-input {
      width: 200px;
    }
  }
}
</style>