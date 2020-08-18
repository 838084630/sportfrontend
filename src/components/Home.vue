<template>

        <el-container class="home-container">
            <el-header>
                <div>
                    <img src="../assets/logo.png" alt="">
                    <span>个人运动平台</span>
                </div>

                <el-button type="info" @click="logout">安全退出</el-button></el-header>
            <!--主体-->
            <el-container>
                <!--侧边栏-->
                <el-aside width="200px">Aside</el-aside>
                <!--主体内容-->
                <el-main>Main</el-main>
            </el-container>
        </el-container>
</template>

<script>
    export default {
        name: "Home",
        methods:{
            logout(){
                //清除session,回到首页
                window.sessionStorage.clear();
                this.$router.push("/login")
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
    }
    .el-main {
        background-color: #eaedf1;
    }
    img{
        width: 55px;
        height: 55px;
    }

</style>