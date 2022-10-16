<template>
  <div>
    <el-dialog  v-model="visible" title="父组件" width="50%" append-to-body @close="closeDialog">
      <el-button type="primary" @click="lookDetail">查看</el-button>
    </el-dialog>
    <!-- 孙子组件 -->
    <grandson v-model:visible="openDialog"></grandson>
  </div>
</template>

<script>
//孙子组件
import grandson from "./grandson.vue";
export default {
  components: {
    grandson,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emit: ["update:visible"],
  data() {
    return {
      openDialog: false,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
    lookDetail() {
      this.openDialog = true;
    },
  },
};
</script>
