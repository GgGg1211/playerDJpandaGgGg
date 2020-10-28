<template>
  <div id="apply">
    <div class="input">
      手机号：<el-input v-model="input1" placeholder="请输入内容"></el-input>
      姓名：<el-input v-model="input2" placeholder="请输入内容"></el-input>
      <el-button class="btn" type="success" size="small">搜索</el-button>
      <div class="addright">
        <el-button icon="el-icon-share">邀请教师</el-button>
        <el-button
          icon="el-icon-plus"
          @click="$refs.edit.dialogFormVisible = true"
          >新增教师</el-button
        >
      </div>
    </div>

    <el-table
      center
      class="table"
      :data="list"
      style="width: 100%"
      :border="true"
    >
      <el-table-column label="编号"> 1</el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="stage" label="学校" :formatter="formatter"> </el-table-column>
      <el-table-column prop="subject" label="任教科目" :formatter="formatterSub"> </el-table-column>
      <el-table-column prop="" label="任教年级" > 七年级</el-table-column>
      <el-table-column prop="date" label="日期"> </el-table-column>
      <!-- 
      <el-table-column prop="sex" label="性别" :formatter="formatter">
      </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column> -->

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 1"
            class="btn"
            type="success"
            plain
            size="small"
            >正常</el-button
          >
          <el-button
            v-if="scope.row.status == 0"
            class="btn"
            type="danger"
            plain
            size="small"
            >禁用</el-button
          >
        </template>
      </el-table-column>

      <el-table-column label="操作" class="iconbtn">
        <template slot-scope="scope">
          <i
            class="el-icon-edit-outline"
            @click="$refs.edit.row(scope.row)"
          ></i>
          <i class="el-icon-delete"></i>
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
    <TeacherInfo ref="edit" />
  </div>
</template>


<script>
import { getInput } from "@/api/httpApi";
import {mapState} from "vuex";
export default {
  name: "apply",
  components: {
    // TeacherInfo,
  },
  computed:{
    ...mapState("teacherInfo",{
      stage:"stage",
      subject:"subject"
    })
  },
  data() {
    return {
      list: [],
      page: {
        pageIndex: 1,
        pageSize: 5,
      },
      total: 0,
      input1: "",
      input2: "",
    };
  },
  methods: {
    // change(e){
    //   console.log(e,'fafa');
    // },
    newForm(e){
      console.log(e);
      let ind =this.list.findIndex((it)=>{
        return it.id === e.id 
      });
      this.list.splice(ind,1,e)
      console.log(ind);
    },
    getInput() {
      let { page } = this;
      getInput(page).then((res) => {
        console.log(res);
        this.list = res.data.list;
        this.list.forEach((it)=>{
          String(it.status)
        })
        this.total = res.data.num;
      });
    },
    formatter(row) {

      return this.stage[row.stage] || this.stage["default"]
    },
    formatterSub(row){
      return this.subject[row.subject] || this.subject["default"]
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
    editBtn() {
      this.$refs.edit.dialogFormVisible = true;
    },
  },
  watch: {},
  mounted() {
    this.getInput();
    this.$bus.$off("newForm")
    this.$bus.$on("newForm", this.newForm);
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
    .addright {
      float: right;
    }
  }
  .table {
    min-height: 600px;
    margin: 10px 0;
  }
  .el-table_1_column_9 {
    i {
      font-size: 22px;
      margin-right: 20px !important;
      cursor: pointer;
    }
  }
}
</style>