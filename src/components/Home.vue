<template>
<!--  主体布局-->
  <el-container>
<!--    头部-->
    <el-header>
      <div>
         <img src="../assets/heima.png"/>
         <span>电商后台管理系统</span>
      </div>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <el-container>
<!--    左边  侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px' ">
        <div class="toggle-button" @click="toggleCollapse">  |||</div>
        <el-menu
          :router="true"
          :collapse="isCollapse"
          unique-opened
          :collapse-transition="false"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
<!--          一级菜单-->
          <el-submenu v-for="item in MenuList" :key="item.id" :index=" '/' + item.path  ">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
<!--            二级菜单-->
            <el-menu-item  v-for="submenu in item.children" :key="submenu.id" :index="'/'+submenu.path " >
              <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{submenu.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
<!--     右边 内容主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
      created() {
        this.getMenuList()
      },
      data(){
        return{
          MenuList:{},
          isCollapse:false
        }
      },
      methods:{
          logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
          },
        async getMenuList(){
            const {data:res} = await this.$http.get('menus')
            if(res.meta.status!==200) return this.$message.error('res.meta.msg')
            this.MenuList = res.data
            console.log(res)
          },
        toggleCollapse(){
         this.isCollapse = !this.isCollapse
        },
      }
    }
</script>

<style lang="less" scoped>
  .el-header{
    background-color:#FFC312;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    font-size: 15px;
    color: #eeeeee;
    >div{
       display: flex;
      align-items: center;
      span{
        margin-left: 15px;

      }
    }
  }
  .el-aside{
    background-color: #f7f1e3;
  }
  .el-main{
    background-color: #84817a;
  }
  .el-container{
    height: 100%;
  }
  .el-menu{
    border-right: 0px;
  }
  .toggle-button{
    background-color: #84817a;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
