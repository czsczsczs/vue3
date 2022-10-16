<template>
 <router-view></router-view>

</template>

<script>
import HomeView from './views/HomeView'
export default {
      components:{
        HomeView
      },
      name:"App",

}
</script>

<style>


body,html{
  margin:0px;
  padding:0px;
}
.flex-float{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex{
  display: flex;
}
.page_content{
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  background: rgb(255, 255, 255);
  display: block;
  margin-top:30px;
}
</style>
