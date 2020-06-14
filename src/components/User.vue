<template>
    <div>
<!--      面包屑导航-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      </el-breadcrumb>
<!--      卡片视图-->
      <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" >
            <el-button  slot="append"  icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button>按钮</el-button>
        </el-col>
      </el-row>
      </el-card>
      <el-table   border stripe :data="userList">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
            <el-tooltip class="item" effect="dark" content="细节" placement="top">
              <el-button size="mini" type="danger" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "User",
      data(){
          //获取用户列表的参数对象
        return{
          queryInfo:{
            query:'',
            pagenum:1,
            pagesize:2
          },
          userList:[],
          total:0
        }
      },
      created() {
          this.getUserList()
      },
      methods:{
          async getUserList(){
            const {data:res}  = await this.$http.get('users',{params:this.queryInfo})
            if(res.meta.status !==200) return  this.$message.error('登录失败')
            this.userList = res.data.users
            this.total = res.data.total
            console.log(res)
          }
      }
    }
</script>

<style lang="less" scoped>
  .el-breadcrumb{
    margin-bottom: 10px;
  }
  .el-table{
    margin-top: 10px;
    font-size: 10px;
  }
</style>
