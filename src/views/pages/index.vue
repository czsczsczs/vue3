<template>
    <div>
       <h1>欢迎来到用户管理系统</h1>
       <!-- <button @click="jumpToAbout">关于</button>
    <button @click="forwardOneStep">前进一步</button> -->
    </div>
</template>
<script>
import {reactive} from 'vue'
import {useRouter} from 'vue-router'
export default{
    name:"user",
   setup(){
    const router=useRouter()
    const jumpToAbout = () => {
          router.push("/about")
            //我们也可以传入一个对象，也可以添加参数
          router.push({
            path: "/about",
            query: {
              name: "why",
              age: 18
            }
          })
        //   router.replace("/about")
        }
        const forwardOneStep = () => {
            router.go(-1)
    //   router.go(1)
    //   router.go(-1)
    //   router.forward()
    //   router.back()
    }
 
    return {
      jumpToAbout,
      forwardOneStep
    }
   }
}
</script>