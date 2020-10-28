<template>
  <div>
    <template v-for="(item,index) in params" >
      <el-submenu :key="index" :index="item.name" v-if="item.children">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>{{item.name}}</span>
        </template>
        <Submenu :params="item.children" />
      </el-submenu>
      <el-menu-item :key="index" v-else :index="item.path" >{{item.name}}</el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "Submenu",
  props: { params: Array },
  data() {
    return {};
  },
  mounted() {
    // console.log(this.params);
  },
};
</script>

<style>
</style>