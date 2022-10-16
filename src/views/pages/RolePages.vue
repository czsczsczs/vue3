<template>
    <div>
            <div>
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>角色列表</el-breadcrumb-item>

                </el-breadcrumb>
            </div>
        <div class="page_content">
            <el-button @click="addroles">
                新建角色
            </el-button>
            <el-table :data="roleList" style="width: 100%">
                <el-table-column prop="roleName" label="角色名"/>
                <el-table-column prop="roleDesc" label="角色描述"/>
                <el-table-column>
                    <template #default="scope">
                        <el-button type="primary" @click="editRow(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
    
        </div>

                <!-- 新建角色弹窗 -->
                <el-dialog 
                v-model="dialogFormVisible" 
                @close="clearForm"
                :title='formData.id?"编辑角色":"新建角色"'>
                    <el-form 
                       ref="roleform"
                       :model="formData"
                       :rules="rules">
                             <el-form-item label="名" prop="roleName">
                                <el-input v-model="formData.roleName" placeholder="请输入角色名"/>
                            </el-form-item>
                             <el-form-item label="描述" prop="roleDesc">
                                <el-input v-model="formData.roleDesc" placeholder="请输入用户描述"/>
                            </el-form-item>

                       </el-form>
                       <template #footer>
                           <div class="flex">
                               <el-button @click="dialogFormVisible=false">取消</el-button>
                               <el-button type="primary" @click="submitForm(roleform)">确定</el-button>
                           </div>
                       </template>
                </el-dialog>
    </div>
</template>
<script>
import { ref,reactive,toRefs } from 'vue'
import {getRolesApi,rolesAddApi,rolesChangeApi,rolesDeleteApi} from '../../util/request'
export default{
    name:"roles",
    setup(){
        const data=reactive({
            roleList:[],
            dialogFormVisible:false,
            formData:{
                roleName:"",
                roleDesc:""
            },
            rules:{
                roleName:[
                    {required:true,message:"角色名必填",trigger:blur}
                ]
            },
           
        })
        const getList=()=>{
            getRolesApi().then(res=>{
                data.roleList=res.data
            })
        }
        getList()
        const addroles=()=>{
            data.dialogFormVisible=true

        }
        const submitForm=(formEl)=>{
            
            formEl.validate(res=>{
                if(!res){
                    return
                }
                if(data.formData.id){
                    rolesChangeApi(data.formData).then(res=>{
                        data.dialogFormVisible=false
                    getList()
                    })
                }else{
                    rolesAddApi(data.formData).then(res=>{
                    data.dialogFormVisible=false
                    getList()
                })
                }
                
            })
        }
        const editRow=(res)=>{
           
            data.dialogFormVisible=true
            const {roleName,roleDesc,id} =res
            data.formData={
                id,
                roleName,
                roleDesc
            }
        }
        const deleteRow=(res)=>{
            rolesDeleteApi(res).then(res=>{
                getList()
            })
        }
        const clearForm=()=>{
            setTimeout(()=>{
                data.formData={
                id:"",
                roleName:"",
                roleDesc:""
            }
            },100)
           
        }
        const roleform=ref()
        return {
            ...toRefs(data),
            editRow,
            deleteRow,
            addroles,
            submitForm,
            roleform,
            clearForm
        }
    }
}
</script>