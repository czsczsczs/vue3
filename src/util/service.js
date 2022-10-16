import axios from 'axios'
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'
import store from '../store/index.js'
let loadingObj=null
const Service=axios.create({
    timeout:8000,
    baseURL:"http://127.0.0.1:8888/api/private/v1/",
    headers:{
        "Content-type":"application/json;charset=utf-8",
        Authorization:store.state.uInfo.userInfo.token
    },
})
Service.interceptors.request.use(config=>{

    loadingObj=ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    return config
})
Service.interceptors.response.use(response=>{
    loadingObj.close()
    const data=response.data
    if (!data.data&&data.meta.status!==200) {
        
        ElMessage({
            showClose: true,
            message: data.meta.msg||"服务器出错",
            type: 'error',
          })
        
        return data
    }

    return data
},error=>{
    loadingObj.close()
    ElMessage({
        message:"服务器错误",
        type:"error",
        duration:2000
    })
}) 
export const post=config=>{
    return Service({
       ...config,
       method:"post",
       data:config.data 
    })
}
export const get=config=>{
    return Service({
       ...config,
       method:"get",
       params:config.data 
    })
}
export const put=config=>{
    return Service({
       ...config,
       method:"put",
       params:config.data 
    })
}
export const del=config=>{
    return Service({
       ...config,
       method:"delete"
    })
}