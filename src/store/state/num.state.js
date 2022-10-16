export default{
    namespaced:true,
    state: { 
        count:10,
        student:[{name:1,age:18},{name:2,age:34},{name:3,age:12}]
      },
      getters: {
        countStates(state){
          return state.count<=10
        },
        aage(state){
            return state.student.filter(item=>item.age>20)
        },
        moreage(state){
            return function (Age){
                return state.student.count>Age
            }
        },
        moreAaa:state=>{
            return Age=>{
                return state.student.filter(item=>item.age>=Age)
            }
        }
    
      },
      mutations: {
        setCount(state,num){
          state.count=num
    
        }
      },
      actions: {
          setCountPromise(context,num){
              return new Promise((resolve,reject)=>{
                if(num>100){
                  reject("值太大了")
                }else{
                  context.commit("setCount",num)
                  resolve()
                }
              })
          }
      },
}