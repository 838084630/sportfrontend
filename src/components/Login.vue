<template>
    <div class="login_container">
        <!--登陆框-->
        <div class="login_box">
            <!--头像区-->
            <div class="avatar_box">
                <img src="../assets/logo.png"/>
            </div>
            <!--表单区域-->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login_form" label-width="0px">
                <!--用户名-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" ><i slot="prefix" class="el-input__icon el-icon-user"></i></el-input>
                </el-form-item>
                <!--密码：-->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password"><i slot="prefix" class="el-input__icon el-icon-setting"></i></el-input>
                </el-form-item>
                <!--提交按钮-->
                <el-form-item class="btns">
                    <el-button type="primary" @click="loginSub">提交</el-button>
                    <el-button type="info" @click="resetLogin">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                loginForm:{
                    username:"admin",
                    password:"123456"
                },
                loginRules:{
                  username:[
                      { required: true, message: '用户名称为必填项', trigger: 'blur' },
                      { min: 1, max: 10, message: '长度在 1 ~ 10 个字符', trigger: 'blur' }
                  ],
                  password:[
                      { required: true, message: '用户密码为必填项', trigger: 'blur' },
                      { min: 1, max: 10, message: '长度在 1 ~ 10 个字符', trigger: 'blur' }

                  ]
                }
            }
        },
        methods:{
            //重置表单事件
            resetLogin(){
                this.$refs.loginFormRef.resetFields()
            },
            loginSub(){
                //验证成功vaild就为true否则为false，自动判断
                this.$refs.loginFormRef.validate(async valid =>{
                    if (!valid) return;
                    const {data:res} = await this.$http.post("login",this.loginForm);
                    console.log(res);
                    if (res.code == "200"){
                        this.$message.success("操作成功")
                        //存储user对象
                        window.sessionStorage.setItem("user",res.user)
                        this.$router.push({path:"/home"})
                    }else{
                        this.$message.error("操作失败")
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
  .login_container{
      background-color: #2b4b6b;
      height: 100%;
  }
    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 5px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .avatar_box{
            width: 130px;
            height: 130px;
            border-radius: 50%;
            padding: 5px;
            box-shadow: 0 0 2px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: #eee;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;

            }

        }
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
    .login_form{
        position: absolute;
        bottom: 0%;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }
</style>