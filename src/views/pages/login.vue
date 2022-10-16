<template>
    <div class="login_wrap">
        <div class="from_wrap">
               <el-form
                    ref="formRef"
                    :model="loginData"
                    label-width="100px"
                    class="demo-dynamic"
                >
                    <el-form-item
                    prop="username"
                    label="用户名"
                    :rules="[
                        {
                        required: true,
                        message: '必填',
                        trigger: 'blur',
                        },
                        
                    ]"
                    >
                    <el-input v-model="loginData.username" />
                    </el-form-item>
                    <el-form-item
                    prop="password"
                    label="密码"
                    :rules="[
                        {
                        required: true,
                        message: '必填',
                        trigger: 'blur',
                        },
                        
                    ]"
                    >
                    <el-input type="password" v-model="loginData.password" />
                    </el-form-item>
           </el-form>
           <el-button type="primary" class="login_button" @click="handclick">登录</el-button>
           <!-- {{num}} -->

          
           
        </div>
    </div>
    



    

</template>
<script>
import { ref,toRef,reactive, toRefs } from "vue";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {loginApi} from "../../util/request"
export default {
  name: "login",
  setup() {

    const store=useStore()
    const router=useRouter()

    const count=store.state.number.count

    const data = reactive({
        loginData:{
            username:"",
            password:"",
        },
        num:count,


     
    });

    const handclick=()=>{
        loginApi(data.loginData).then(res=>{
          if(res.data)(
              store.commit('uInfo/setUserInfo',res.data),
              localStorage.setItem("loginData",JSON.stringify(res.data)),
        
              router.push({
                path:"/index"
              })
          )
        })
        // store.commit('uInfo/setUserInfo',data.loginData);
        // localStorage.setItem("loginData",JSON.stringify(data.loginData))
        // router.push({
        //   path:"/user"
        // })
        
    }
    // console.log(store.state.number.count)
    // console.log("修改期",store.getters["number/countStates"])
    // const handclick=()=>{
    //     // store.commit('number/setCount',1000);
    //     // console.log(store.state.count)
    //     store.dispatch('number/setCountPromise',11).then(
    //       res=>{
    //         alert("修改成功")
    //       }
    //     ).catch(err=>{
    //       alert("大哥"+err)
    //     });
    //     console.log(store.state.number.count)
    //     console.log("修改後getters",store.getters["number/countStates"])
    // }
    return {
      ...toRefs(data),
      handclick
      
    };
  },
};
</script>
<style scoped>
.login_wrap {
  width: 100%;
  height: 100vh;
  background: rgb(56, 86, 139);
  position: relative;
}
.from_wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 5px;
  padding:30px 50px;
}
.login_button{
    margin:10px auto;
    display: block;
}
</style>