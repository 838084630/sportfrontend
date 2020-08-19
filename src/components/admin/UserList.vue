<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
                <!--TODO scope到底哪来的-->
            <el-row :span="10">
                <el-col :span="4">
                <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @clear="getUserList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>
                </el-col>
                    <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>

            </el-row>

            <el-table :data="userList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="状态" prop="status">
                    <template slot-scope="scope">
                        <!--{{scope.row}}每一行的数据-->
                        <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">

                    <template slot-scope="scope">
                        <!-- 修改 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        <!-- 删除 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
                        <!-- 权限 -->
                        <el-tooltip effect="dark" content="分配权限" placement="top-start" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页-->
            <!--size-change每页最大-->
            <!--current-change当前最大变化-->
            <!--layout功能组件-->
            <div>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="queryInfo.pageNum"
                        :page-sizes="[1, 2, 5, 100]"
                        :page-size="queryInfo.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>

        <!--新增用户窗口-->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <!--表单内容-->
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
            </el-form>
            <!--窗口底部-->
            <el-button @click="addDialogVisible=false">取消</el-button>
            <el-button type="primary" @click="addUser">确定</el-button>
        </el-dialog>

        <!--修改对话框-->
        <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <!--表单内容-->
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
            </el-form>
            <!--窗口底部-->
            <el-button @click="editDialogVisible=false">取消</el-button>
            <el-button type="primary" @click="editUserInfo">确定</el-button>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "UserList",
        created(){
            this.getUserList();
        },
        data(){
            return{
                queryInfo:{
                    query:"",
                    pageNum:1,
                    pageSize:5
                },
                userList:[],
                total:0,
                addDialogVisible: false,
                addForm:{
                    username:'',
                    password:'',
                    email:''
                },

                //修改用户信息
                editForm:{},
                //显示和隐藏修改用户栏
                editDialogVisible:false,
                // 新建用户的验证规则
                addFormRules:{
                    username:[
                        { required: true, message: "请输入用户名", trigger: "blur" },
                        { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
                    ],
                    password:[
                        { required: true, message: "请输入密码", trigger: "blur" },
                        { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
                    ],
                    email:[
                        { required: true, message: "请输入邮箱", trigger: "blur" },
                        { min: 1, max: 15, message: "请输入正确邮箱地址", trigger: "blur" }
                    ],
                },

            //    修改用户的验证规则
                editFormRules:{
                    password:[
                        { required: true, message: "请输入密码", trigger: "blur" },
                        { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
                    ],
                    email:[
                        { required: true, message: "请输入邮箱", trigger: "blur" },
                        { min: 1, max: 15, message: "请输入正确邮箱地址", trigger: "blur" }
                    ],
                }

            }
        },
        methods:{
           async getUserList(){
                const {data:res} = await this.$http.get("allUser",{params:this.queryInfo});
                this.userList = res.data;
                this.total = res.numbers;
            },
            //TODO newSize参数哪来的
            handleSizeChange(newSize){
                // console.log("每页展示多少条"+newSize);
                this.queryInfo.pageSize = newSize;
                this.getUserList();
            },
            //pageNum的触发动作
            handleCurrentChange(newPage){
                this.queryInfo.pageNum = newPage;
                this.getUserList();
            },
            async userStateChanged(userInfo){
                console.log(userInfo.state+"XXXXXXXXXXXX");
                const {data:res} = await this.$http.put(`userState?id=${userInfo.id}&state=${userInfo.state}`);
                if (res!="success"){
                    userInfo.id = !userInfo.id;
                    return this.$message.error("操作失败");
                }
                this.$message.success("操作成功")
            },

        //    窗口事件
        //    清出数据
            addDialogClosed(){
               this.$refs.addFormRef.resetFields();
            },
            //添加
            addUser(){
               this.$refs.addFormRef.validate(async valid =>{
                   // console.log(valid);验证成功valid为true
                   if (!valid) return;
                   const {data:res} = await this.$http.post("addUser",this.addForm);
                   if (res!="success"){
                       return this.$message.error("操作失败")
                   }
                    this.$message.success("操作成功");
                   this.addDialogVisible = false;
                   this.getUserList();
               })
            },

            //删除用户
            async deleteUser(id){
               const confirmResult = await this.$confirm('此操作将永久删除用户，是否继续？','提示',{
                   confirmButtonText:'确定',
                   cancelButtonText:'取消',
                   type:"warning"
               }).catch(err => err)
                if (confirmResult!='confirm'){
                    return this.$message.info("已取消删除");
                }
                const {data:res} = await this.$http.delete("deleteUser?id="+id);
                if (res!="success"){
                    return this.$message.error("删除失败")
                }
                this.$message.success("删除成功");
                this.getUserList();
            },

        //    显示对话框
            async showEditDialog(id){
              const {data:res} = await this.$http.get("getUpdate?id="+id);
               this.editForm = res;//将查处的信息反填到编辑表单中
                this.editDialogVisible = true;//开启对话框
            },
        //    关闭对话框
            editDialogClosed(){
               this.$refs.editFormRef.resetFields()//重置信息
            },
        //    确认修改
            editUserInfo(){
               this.$refs.editFormRef.validate(async valid =>{
                   if (!valid) return;
                   //发起修改请求
                    const {data:res} = await this.$http.put('editUser',this.editForm)
                   if (res!="success") return this.$message.error("操作失败");
                   this.$message.success("操作成功");
                   //隐藏修改对话框
                   this.editDialogVisible = false;
                   this.getUserList();
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-breadcrumb{
        margin-bottom: 15px;
        font-size: 17px;
    }
</style>