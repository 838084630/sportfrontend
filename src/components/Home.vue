<template>

        <el-container class="home-container">
            <el-header>
                <div>
                    <img src="../assets/logo.png" alt="">
                    <span>个人运动平台</span>
                </div>

                <el-button type="info" @click="logout">安全退出</el-button></el-header>
            <!--主体-->
            <el-container class="home-container">
                <!--侧边栏-->
                <el-aside :width="isCollapse?'64px':'200px'">
                    <div class="toggle-button" @click="toggleCollapse">|||</div>
                    <el-menu
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b"
                            unique-opened :collapse="isCollapse"
                            :collapse-transition="false"
                            :router="true">
                        <!--一级菜单-->
                        <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                            <template slot="title">
                                <i :class="iconsObject[item.id]"></i>
                                <span>{{item.title}}</span>
                            </template>
                        <!--二级菜单-->
                            <el-menu-item :index="it.path" v-for="it in item.sList" :key="it.id">
                                <template slot="title">
                                    <i :class="iconsObject[it.id]"></i>
                                    <span>{{it.title}}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>

                </el-aside>
                <!--主体内容-->
                <el-main>
                    <router-view></router-view>
                </el-main>

            </el-container>
        </el-container>
</template>

<script>
    export default {
        name: "Home",
        created(){
            this.getMenuList();
        },

        data(){
            return{
                menuList:[],
                isCollapse:false,
                iconsObject:{
                    '100':'el-icon-s-tools',
                    '200':'el-icon-more',
                    '101':'el-icon-star-on',
                    '102':'el-icon-help',
                    '103':'el-icon-s-order',
                    '104':'el-icon-s-platform',
                    '201':'el-icon-s-marketing',
                    '202':'el-icon-s-opportunity',
                }
            }
        },
        methods:{
            logout(){
                //清除session,回到首页
                window.sessionStorage.clear();
                this.$router.push("/login")
            },
            async getMenuList(){
             const {data:res} =  await this.$http.get("menus")
                console.log(res)
                if (res.flag != 200)  return this.$message.error("获取列表失败")
                this.menuList = res.menus;
            },
            toggleCollapse(){
                this.isCollapse = !this.isCollapse
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container{
        height: 100%;
    }
    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;//左右贴边
        padding-left: 0%;//左边界
        color: #ffff;
        font-size: 20px;
        >div{
            display: flex;
            align-items: center;
            span{
                margin-left: 15px;
            }
        }

    }
    .el-aside {
        background-color: #333744;
        .el-menu {
            border-right: none;
        }
    }
    .el-main {
        background-color: #eaedf1;
    }
    img{
        width: 55px;
        height: 55px;
    }
    .toggle-button {
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor:pointer;//显示小手
    }

</style>