<template>
  <div id="teacher">
    <div class="header">
      <div>
        <span class="text">手机号码：</span>
        <el-input
          size="small"
          placeholder="请输入手机号"
          class="input"
        ></el-input>
        <span class="text">姓名：</span>
        <el-input
          size="small"
          placeholder="请输入姓名"
          class="input"
        ></el-input>
        <span class="btn">
          <el-button size="small">搜索</el-button>
        </span>
      </div>
      <div>
        <el-button><i class="el-icon-eleme"></i> 邀请教师</el-button>
        <el-button
          @click="$refs.EditDialogClick.dialogVisible = true"
          style="background: #12bf8a"
          ><i class="el-icon-plus"></i> 新增教师</el-button
        >
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="编号" align="center"> 1</el-table-column>
      <el-table-column prop="name" label="教师姓名" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        align="center"
        :formatter="formatterAge"
      >
      </el-table-column>
      <el-table-column
        prop="stage"
        label="学段"
        align="center"
        :formatter="formatterStage"
      ></el-table-column>
      <el-table-column
        prop="subject"
        label="任教科目"
        align="center"
        :formatter="formatterSubject"
      ></el-table-column>
      <el-table-column prop="date" label="更新时间" align="center">
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="danger">禁用</el-tag>
          <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <i
            class="el-icon-collection"
            @click="$refs.EditDialogClick.edit(scope.row)"
          />
          <i class="el-icon-delete-solid" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="SizeChange"
      @current-change="IndexChange"
      :current-page="page.pageIndex"
      :page-sizes="[5, 10]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pagenation"
    >
    </el-pagination>
    <EditaDialog
      ref="EditDialogClick"
      :stage="stage"
      :subject="subject"
      :sex="sex"
    />
  </div>
</template>
<script>
import { getteacherList } from "@/api/api.js";
import { mapState } from "vuex";
export default {
  name: "menu2",
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [],
      total: 0,
    };
  },
  computed: {
    //computed和methods一样，不懂啥意思。就看着眼熟
    ...mapState("teacherInfo", {
      stage: "stage",
      subject: "subject",
      sex: "sex", //必须是双引号，单引号就不行，这是ESlint的规范
    }),
  },
  methods: {
    //编辑信息
    editInfo(e) {
      console.log(e);
    },
    requestData() {
      getteacherList(this.page).then((res) => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.num;
      });
    },
    // handleClick(res, num) {
    //   res.status = num;
    // },
    //修改stage数据
    formatterStage(row) {
      return this.stage[row.stage];
    },

    //修改sex数据
    formatterAge(row) {
      return row.sex == "1" ? "男" : "女";
    },

    //修改subject数据
    formatterSubject(row) {
      return this.subject[row.subject];
    },

    //修改条数
    SizeChange(e) {
      this.page.pageSize = e;
      this.page.pageIndex = 1;
      this.requestData();
    },

    //修改页数
    IndexChange(e) {
      this.page.pageIndex = e;
      this.requestData();
    },
    changeForm(e) {
      let index = this.tableData.findIndex((item) => item.id === e.id);
      this.tableData.splice(index, 1, e);
    },
  },
  mounted() {
    this.$bus.$off("teacherInfo");
    this.$bus.$on("teacherInfo", this.changeForm);
    this.requestData();
  },
};
</script>

<style lang="scss">
#teacher {
  width: 100%;
  height: 100%;
  position: relative;
  .header {
    display: flex;
    height: 60px;
    display: flex;
    justify-content: space-between;
    .text {
      line-height: 30px;
      margin-left: 10px;
    }
    .input {
      width: 240px;
    }
  }
  .pagenation {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .el-icon-collection,
  .el-icon-delete-solid {
    margin-right: 14px;
    font-size: 24px;
    color: #12bf8a;
    cursor: pointer;
  }
  .el-icon-delete-solid {
    color: #f56c6c;
  }
}
</style>