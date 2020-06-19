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
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getgoodList">
            <el-button  slot="append" @click="getgoodList" >添加</el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="goAddpage">添加</el-button>
        </el-col>
      </el-row>
<!--        商品列表-->
        <el-table :data="goodsList" border>
          <el-table-column prop="goods_id" label="商品 ID">
          </el-table-column>
          <el-table-column prop="goods_name" label="商品名称">
          </el-table-column>
          <el-table-column prop="goods_price" label="价格">
          </el-table-column>
          <el-table-column prop="goods_number" label="数量">
          </el-table-column>
          <el-table-column prop="add_time" label="时间">
          </el-table-column>
          <el-table-column>
            <template v-slot="scope">
              <el-button  icon="el-icon-edit" size="mini" type="primary">添加</el-button>
              <el-button @click="removeById(scope.row.goods_id)" icon="el-icon-edit" size="mini" type="danger" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
<!--        分页区域-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          queryInfo:{
            query:'',
            pagenum:1,
            pagesize:10,
          },
          goodsList:[],
          total:{}
        }
      },
      created() {
        this.getgoodList()
      },
      methods:{
      async getgoodList(){
            const{data:res} =  await  this.$http.get('goods',{params:this.queryInfo})
            if(res.meta.status!==200) {
              return this.$message.error('请求数据失败')
            }
            this.$message.success('请求数据成功')
            // console.log(res.data)
                this.goodsList = res.data.goods
                this.total = res.data.total
        },
        handleSizeChange(newsize){
          this.queryInfo.pagesize= newsize
          this.getgoodList()
        },
        handleCurrentChange(newpage){
           this.queryInfo.pagenum = newpage
           this.getgoodList()
        },
      async  removeById(id){
         const confirmResult =  await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).catch(err=>err)
        if(confirmResult !=='confirm'){
          return this.$message.info('已经删除')
        }
        const {data:res}  = await this.$http.delete(`goods/${id}`)
          // console.log(res)
        if(res.meta.status!==200){
          return this.$message.error('删除失败')
        }
        this.$message.success('删除失败')
        this.getgoodList()
        },
        goAddpage(){
              this.$router.push('/goods/add')
        }
      }
    }
</script>

<style lang="less" scoped>
  .el-card{
    margin-top: 10px;
  }
</style>
