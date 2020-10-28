<template>
  <div id="app">
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <!-- <router-link to="/home">Go to home</router-link>
      <router-link to="/login">Go to dddd</router-link> -->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'App'
};
</script>

<style>
#app{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
a{
  margin:  0 40px;
}
</style>