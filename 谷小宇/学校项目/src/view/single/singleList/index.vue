<template>
  <div id="Singlelist">
    <div class="input">
      成绩分析名称：<el-input
        v-model="input1"
        placeholder="请输入内容"
        style="width: 10%"
      ></el-input>
      分析类型：<el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      状态<el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span class="demonstration">考试时间：</span>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期">
      </el-date-picker>

      <el-button>查询</el-button>
      <el-button
        icon="el-icon-plus"
        @click="ToAddAnalyse"
        >新增分析</el-button
      >
    </div>
    <template>
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
        <el-table-column prop="stage" label="学段" :formatter="(row)=>this.stage[row.stage]">
        </el-table-column>
        <el-table-column prop="cla" label="年级" :formatter="(row)=>this.cla[row.class]"> </el-table-column>
        <el-table-column prop="" label="入学年份"> 2018</el-table-column>
        <el-table-column prop="date" label="考试时间"> </el-table-column>
        <el-table-column prop="type" label="分析类型" :formatter="(row)=>this.type[row.type]"> </el-table-column>
        <el-table-column prop="" label="创建人">创建人 </el-table-column>
        <el-table-column prop="date" label="创建时间"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 1"
              class="btn"
              type="success"
              plain
              size="small"
              >分析完成</el-button
            >
            <el-button
              v-if="scope.row.status == 0"
              class="btn"
              type="danger"
              plain
              size="small"
              >参数设置</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="sizes, prev, pager, next,jumper"
        :page-size="page.pageSize"
        :page-sizes="[5, 10]"
        :current-page="page.pageIndex"
        @size-change="sizeChange"
        @current-change="currentChange"
        :total="total"
      >
      </el-pagination>
    </template>
  </div>
</template>


<script>
import { getSingle } from "@/api/httpApi";
import { mapState } from "vuex";
export default {
  name: "Singlelist",
  computed: {
    ...mapState("teacherInfo", {
      stage: "stage",
    }),
    ...mapState("single", {
      type: "type",
      cla: "class",
    }),
  },
  data() {
    return {
      list: [],
      input1: "",
      value: "",
      options: "",
      value1: "",
      page: {
        pageIndex: 1,
        pageSize: 5,
      },
      total: 0,
    };
  },
  methods: {
    getSingle() {
      let { page } = this;
      getSingle(page).then((res) => {
        console.log(res);
        this.list = res.data.list;
        this.list.forEach((it) => {
          String(it.status);
        });
        this.total = res.data.num;
      });
    },
    sizeChange(e) {
      let { page } = this;
      console.log(e);
      page.pageIndex = 1;
      page.pageSize = e;
      this.getSingle();
    },
    currentChange(e) {
      console.log(2);
      let { page } = this;
      page.pageIndex = e;
      this.getSingle();
    },
    ToAddAnalyse(){
      this.$router.push({name:"single_addanalyse"})
    }
  },
  watch: {},
  mounted() {
    this.getSingle();
  },
};
</script>

<style lang=scss>
#Singlelist {
  background: #fff;
  min-width: 94%;
  min-height: 95%;
  padding: 20px;
  .btn {
    width: 80px !important;
  }
  .input {
    .el_input {
      width: 200px !important;
      .el-input__inner {
        width: 200px !important;
      }
    }
    .addright {
      float: right;
    }
  }
  .el-table {
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