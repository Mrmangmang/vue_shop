<template>
    <div>
<!--      导航区域-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>

<!--      卡片视图-->
      <el-card>
          <el-table :data="rightList" style="width: 100%">
            <el-table-column prop="id" label="权限 ID" width="180">
            </el-table-column>
            <el-table-column prop="id" label="权限 ID" width="180">
            </el-table-column>
            <el-table-column prop="authName" label="权限说明" width="180">
            </el-table-column>
            <el-table-column prop="level" label="权限层级" width="180">
              <template v-slot="scope">
                <el-tag v-if="scope.row.level==='0'">一级</el-tag>
                <el-tag type="success" v-else-if="scope.row.level==='1'">二级</el-tag>
                <el-tag type="danger" v-else-if="scope.row.level==='2'">三级</el-tag>
              </template>
            </el-table-column>
          </el-table>
      </el-card>
    </div>
</template>


<script>
    export default {
      data(){
        return{
          rightList:[],
        }
      },
      created() {
       this.getrightList()
      },
      methods:{
     async   getrightList(){
            const {data:res} =await  this.$http.get('rights/list')
       if(res.meta.status!==200) {
         return this.$message.error('获取权限失败')
       }
          this.rightList = res.data
            console.log(res)
        }
      }
    }
</script>

<style lang="less" scoped>
    .el-card{
      margin-top: 10px;

    }
</style>
