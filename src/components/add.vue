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
<!--        步骤条-->
        <el-steps :space="200" :active="activeindex - 0" align-center finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
<!--        tab标签页-->
        <el-form :model="addForm" :rules="addrules" ref="addruleFormRef" label-width="100px" class="demo-ruleForm">
        <el-tabs v-model="activeindex" tab-position="left" >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="配置菜单" prop="">
                <el-cascader
                  v-model="addForm.goods_cat"
                  :options="CateList"
                  :props="cateProps"
                  @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数"  name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性"  name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片"  name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品图片"  name="4">商品图片</el-tab-pane>
        </el-tabs>
        </el-form>
      </el-card>

    </div>
</template>

<script>
    export default {
        name: "add",
      data(){
          return{
            activeindex:"0",
            addForm:{
              // 商品所属的分类数组
              goods_name:'',
              goods_cat:[]
            },
            addrules:{
              name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
            },
            //商品分类列表
            CateList:[],
            cateProps:
              {
                value: 'cat_id',
                label: 'cat_name',
                children: "children"
              }
          }
      },
      created() {
        this.getCateList()
      },
      methods:{
        async  getCateList(){
          const {data:res} = await this.$http.get(`categories` )
            if(res.meta.status!==200) {
              return this.$message.error('获取数据失败')
            }
            this.CateList    =  res.data
            console.log(this.CateList)
          },
        handleChange(){
          console.log(this.addForm.goods_cat)
          if(this.addForm.goods_cat !==3) {
            this.addForm.goods_cat = []
          }
        },

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
