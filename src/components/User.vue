<template>
    <div>
<!--      面包屑导航-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      </el-breadcrumb>
<!--      卡片视图-->
<!--      搜索列表-->
      <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input clearable @clear="getUserList" v-model="queryInfo.query" placeholder="请输入内容" >
            <el-button @click="getUserList"  slot="append"  icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
<!--      用户列表-->
      <el-table   border stripe :data="userList">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column  prop="mg_state" label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
            @click="showEditDialog(scope.row.id)"
            >
            </el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
            <el-tooltip class="item" effect="dark" content="细节" placement="top">
              <el-button size="mini" type="danger" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--      分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      </el-card>
      <!--        添加用户对话框-->
      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogVisibleclose"
       >
        <!--          内容主体-->
        <el-form :model="addruleForm" :rules="addrules" ref="addruleFormRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="活动名称" prop="username">
            <el-input v-model="addruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="活动名称" prop="password">
            <el-input v-model="addruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="活动名称" prop="email">
            <el-input v-model="addruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="活动名称" prop="mobile">
            <el-input v-model="addruleForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!--          内容区域-->
        <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="addUser">确 定</el-button>
  </span>
      </el-dialog>
<!--      修改用户对话框-->
      <el-dialog
        title="修改用户对话框"
        :visible.sync="editDialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="editformRef" :model="editForm" :rules="editFormRules" label-width="80px">
          <el-form-item label="活动名称" prop="">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="1" >
            <el-input v-model="editForm.username"></el-input>
          </el-form-item>
          <el-form-item label="2">
            <el-input v-model="editForm.password"></el-input>
          </el-form-item>
        </el-form>


        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      data(){
          //获取用户列表的参数对象
        return{
          queryInfo:{
            query:'',
            pagenum:1,
            pagesize:2
          },
          editForm:{},
          userList:[],
          total:0,
          addDialogVisible:false,
          //编辑用户对话框
          editDialogVisible:false,
          addruleForm:{
            username:'',
            password:'',
            email:'',
            mobile:''
          },
          addrules:{
            username:[
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password:[
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            email:[
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            mobile:[
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
          },
          editFormRules:{
            username:[
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password:[
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
          }
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
            this.total = res.data.totalpage
            // console.log(res)
          },
        handleSizeChange(sizechange){
            // console.log(sizechange)
          this.queryInfo.pagesize= sizechange
          this.getUserList()
        },
        handleCurrentChange(currentPages){
            this.queryInfo.pagenum= currentPages
            this.getUserList()
        },
        // 修改用户状态
        async userStateChange(userstate) {
          console.log(userstate)
          //        this.$http.put(`users/${}/state/:type`)
          const {data: res} = await this.$http.put(`users/${userstate.id}/state/${userstate.mg_state}`)
          if(res.meta.status !==200){
            // console.log(res.data.status)
            userstate.mg_state = !userstate.mg_state
            return this.$message.error('更新用户状态失败')
          }
          this.$message.success('更新用户状态成功')
        },
        addDialogVisibleclose(){
          this.$refs.addruleFormRef.resetFields();
        },
        addUser(){
            this.$refs.addruleFormRef.validate( async valid=>{
              if(!valid) return
              //可以发起添加用户的网络请求
              const {data:res} = await this.$http.post('users',this.addForm)
              if(res.meta.status!==201){
                this.$message.error('添加用户失败')
              }
              this.$message.success('添加用户成功')
              //隐藏添加用户对话框
              this.addDialogVisible = false
              //重新获取用户列表数据
              this.getUserList()


            })
        },
        //展示编辑用户对话框
      async  showEditDialog(id){
           const {data:res}  = await   this.$http.get('users/'+id)
          if(res.meta.status!==200){
            return this.$message.error('查询用户信息失败')
          }
          this.editForm=res.data
          this.editDialogVisible = true
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
  .el-pagination{
    margin-top: 10px;
  }
</style>
