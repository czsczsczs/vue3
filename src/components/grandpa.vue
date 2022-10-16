<template>
  <div>
    <h3 style="margin-bottom: 20px">爷爷组件</h3>
    <el-button type="primary" @click="lookDetail">查看</el-button>
    <!-- 儿子组件 -->
    <son v-model:visible="openDialog"></son>
  </div>
</template>

<script>
import Son from "./son.vue";
export default {
  components: { Son },
  data() {
    return {
      message: "aa",
      openDialog: false,
    };
  },
  methods: {
    lookDetail() {
      this.openDialog = true;
    },
  },
};
</script>
