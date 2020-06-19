<template>
    <div>
<!--      面包屑导航-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>

<!--      卡片视图-->
      <el-card>
        <el-alert
          title="消息提示的文案"
          type="info">
        </el-alert>
        <el-steps :space="200" :active="activeindex" align-center finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
<!--        tab标签页-->
        <el-tabs :tab-position="tabPosition" style="height: 200px;">
          <el-tab-pane label="基本信息">基本信息</el-tab-pane>
          <el-tab-pane label="商品参数">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片">商品图片</el-tab-pane>
          <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        </el-tabs>
      </el-card>

    </div>
</template>

<script>
    export default {
        name: "add",
      data(){
          return{
            activeindex:0,
            tabPosition: 'left'
          }
      }
    }
</script>

<style lang="less" scoped>
  .el-card{
    margin-top: 10px;
  }
  .el-step{
    margin-top: 10px;
  }
</style>
