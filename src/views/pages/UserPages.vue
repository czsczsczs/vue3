<template>
    <div>
            <div>
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>账号列表</el-breadcrumb-item>

                </el-breadcrumb>
            </div>
        <div class="page_content">
            <div class="flex">
                    <div class="input_button">
                        <el-input
                        v-model="searchParams.query"
                        placeholder="请输入关键字"
                        class="input-with-select"
                        >
                        <template #append>
                            <el-button @click="searchList">
                                <el-icon><Search /></el-icon>
                            </el-button>
                        </template>
                        </el-input>
                    </div>
                    <el-button type="primary" @click="addUser">新增用户</el-button>
            </div>
                <el-table
                    :data="userList"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                >
                    <el-table-column prop="username" label="姓名" width="180" />
                    <el-table-column prop="email" label="邮箱" width="180" />
                    <el-table-column prop="mobile" label="电话" />
                    <el-table-column prop="role_name" label="角色" />
                    <el-table-column prop="mg_state" label="状态">
                            <template #default="scope">
                                <el-switch
                                        v-model="scope.row.mg_state"
                                        class="mt-2"
                                        style="margin-left: 24px"
                                        inline-prompt
                                        active-icon="Check"
                                        inactive-icon="Close"
                                        @change="switchChange(scope.row)"
                                    />
                            </template>
                    </el-table-column>
                    <el-table-column label="操作">
                            <template #default="scope">
                                <el-button type="primary" @click="editRow(scope.row)">编辑</el-button>
                                <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
                            </template>
                    </el-table-column>
                    </el-table>
                        <el-pagination
                            v-model:currentPage="searchParams.pagenum"
                            v-model:page-size="searchParams.pagesize"
                            :page-sizes="[2,5,10,20]"
                            :small="small"
                            :background="background"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                            @size-change="searchList"
                            @current-change="searchList"
                            />
        </div>
                <el-dialog v-model="dialogFormVisible" title="新建用户">
                       <el-form 
                       ref="userform"
                       :model="formData"
                       :rules="rules">
                            <el-form-item label="用户名称" prop="username">
                                <el-input v-model="formData.username" placeholder="请输入用户名称"/>
                            </el-form-item>
                             <el-form-item label="用户密码" prop="password">
                                <el-input v-model="formData.password" placeholder="请输入用户名称"/>
                            </el-form-item>
                             <el-form-item label="邮箱" prop="email">
                                <el-input v-model="formData.email" placeholder="请输入用户邮箱"/>
                            </el-form-item>
                             <el-form-item label="手机号" prop="mobile">
                                <el-input v-model="formData.mobile" placeholder="请输入用户手机号"/>
                            </el-form-item>

                       </el-form>
                       <template #footer>
                           <div class="flex">
                               <el-button>取消</el-button>
                               <el-button type="primary" @click="submitForm(userform)">确定</el-button>
                           </div>
                       </template>
                </el-dialog>
                <el-dialog v-model="dialogForm2Visible" title="编辑用户">
                       <el-form 
                       ref="userform2"
                       :model="formData2"
                       :rules="rules2">
                           
                             <el-form-item label="邮箱" prop="email">
                                <el-input v-model="formData2.email" placeholder="请输入用户邮箱"/>
                            </el-form-item>
                             <el-form-item label="手机号" prop="mobile">
                                <el-input v-model="formData2.mobile" placeholder="请输入用户手机号"/>
                            </el-form-item>

                       </el-form>
                       <template #footer>
                           <div class="flex">
                               <el-button>取消</el-button>
                               <el-button type="primary" @click="submitForm2(userform2)">确定</el-button>
                           </div>
                       </template>
                </el-dialog>

    </div>
</template>
<script>


import { reactive,toRefs,ref } from 'vue'
import {userListApi,userAddApi,userChangeStateApi,userChangeinfoApi,userDeleteApi} from "../../util/request"
export default{
    name:"user",
    setup() {
        const data=reactive({
            keyWord:"",
            searchParams:{
                query:"",
                pagenum:1,
                pagesize:5
            },
            total:0,
            userList:[],
            dialogFormVisible:false,
            dialogForm2Visible:false,
            formData:{
                username:"",
                password:"",
                email:"",
                mobile:"",
            },
            formData2:{
                id:"",
                email:"",
                mobile:"",
            },
            rules:{
                username:[
                    {required:true,message:'此项为必填',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'此项为必填',trigger:'blur'}
                ],
                email:[
                    {
                    required:false,
                    pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message:'请填写正确邮箱',
                    trigger:'blur'
                    }
                ],
                mobile:[
                    {
                    required:false,
                    pattern:/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
                    message:'请填写正确手机号',
                    trigger:'blur'
                    }
                ],

            },
            rules2:{
                email:[
                    {
                    required:false,
                    pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message:'请填写正确邮箱',
                    trigger:'blur'
                    }
                ],
                mobile:[
                    {
                    required:false,
                    pattern:/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
                    message:'请填写正确手机号',
                    trigger:'blur'
                    }
                ],

            }
        })
        const searchList=()=>{
            
            userListApi(data.searchParams).then(res=>{
                if(res.data){
                    console.log("用户数据"+res.data)
                    data.userList=res.data.users
                    data.total=res.data.total
                }
            })
        }
        const addUser=()=>{
                data.dialogFormVisible=true
        }
        const submitForm=(formEl)=>{
            formEl.validate(res=>{
                if(!res){
                    return
                }
               userAddApi(data.formData).then(res=>{
                   data.dialogFormVisible=false
                   data.formData={
                            username:"",
                            password:"",
                            email:"",
                            mobile:"",
                        }
                    //重新更新List列表 
                    searchList()
               })
            })
        }
        // 状态更改
        const switchChange=row=>{
            console.log("操作的那条数据",row)
            userChangeStateApi(row).then(res=>{
                if(res.data){
                    searchList()
                }
            })
        }
        // 编辑用户
        const editRow=row=>{
            console.log("编辑的那条数据",row)
            data.dialogForm2Visible=true
            const {email,mobile,id}=row
            data.formData2.email=email
            data.formData2.mobile=mobile
            data.formData2.id=id
        }
        const submitForm2=(formEl2)=>{
            
            formEl2.validate(res=>{
                if(!res){
                    return
                }
                userChangeinfoApi(data.formData2).then(res=>{
                    data.dialogForm2Visible=false
                    searchList()
                })
            })
        }
        // 删除用户
        const deleteRow=row=>{
            console.log("删除的那条数据",row)
            userDeleteApi(row).then(res=>{
             
                    console.log(res.data)
                    searchList()
            })

        }
        searchList()
        const userform=ref()
        const userform2=ref()
        return{
            ...toRefs(data),
            searchList,
            addUser,
            submitForm,
            userform,
            userform2,
            switchChange,
            editRow,
            submitForm2,
            deleteRow
        }
    }
}
</script>
<style scoped>
.input_button{
    width: 300px;
    margin-right: 20px;
}
.el-button+.el-button{
    margin-left:0px;
}
</style>