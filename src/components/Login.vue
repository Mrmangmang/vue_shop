<template>
    <div class="login_container">
      <div class="login_bottom">
        <!--          登录头像-->
        <div class="login_photo">
          <img src="../assets/logo.png" />
        </div>
<!--        登录表单-->
        <el-form ref="ruleForm" :model="form" :rules="rules"  class="login_form" label-width="0">
          <el-form-item prop="name">
            <el-input v-model="form.username" prefix-icon="el-icon-more" ></el-input>
          </el-form-item>
          <el-form-item prop="password" >
            <el-input  v-model="form.password" prefix-icon="el-icon-more" ></el-input>
          </el-form-item>
          <el-form-item  class="login_btn">
            <el-button @click="login">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
          return{
            form:{
              username:'admin',
              password:'123456'
            },
            rules:{
              username: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '请输入密码长度', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
              ],
            }
          }
      },
      methods:{
            resetForm() {
              this.$refs.ruleForm.resetFields();
            },
            login(){
             this.$refs.ruleForm.validate( async valid =>{
               if(!valid) return
               const {data:res} =  await this.$http.post('login',this.form)
               if(res.meta.status !==200) return this.$message.error('登录失败')
               this.$message.success('登录成功')
               window.sessionStorage.setItem('token',res.data.token)
               this.$router.push('/home')
             })
            }
        }
    }
</script>

<style scoped lang="less">
   .login_container{
     background-color: darkgreen;
     height: 100%;
     width: 100%;
     .login_bottom{
       background-color: white;
       height: 300px;
       width: 450px;
       position: absolute;
       left: 50%;
       top: 50%;
       border-radius: 3px;
       transform: translate(-50%,-50%);
       .login_photo{
         width: 130px;
         height: 130px;
         border-radius: 50%;
         border:1px solid #eeeeee;
         padding: 10px;
         position: absolute;
         left: 50%;
         background-color: white;
         transform: translate(-50%,-50%);
         img{
           width: 100%;
           height: 100%;
           border-radius: 50%;
           background-color: #eeeeee;
         }
       }
     }
   }
.login_form{
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
  .login_btn{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
