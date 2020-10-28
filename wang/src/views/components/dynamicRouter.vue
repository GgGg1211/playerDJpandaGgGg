<template>
  <div id="dynamicRouter">
    <template v-for="(item, index) in routerArr">
      <el-submenu v-if="item.children" :index="item.name" :key="index">
        <template slot="title">
          <i class="el-icon-s-marketing"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <dynamicRouter :routerArr="item.children"/>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item v-else :key="index" :index="item.path">{{item.name}}</el-menu-item>
    </template>
  </div>
</template>

<script>
// 把组件当成一个函数， 递归每次调用这个函数 循环出里面的每一个子项 渲染到页面中
export default {
  name: "DynamicRouter",
  // 在这里接收父组件传过来的参数
  props: { routerArr: Array },
  data() {
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
  },
};
</script>
<style>
#dynamicRouter {
  width: 100%;
  height: 100%;
}
</style>