<template>
  <div>
    <el-dialog v-model="visible" title="孙子组件"  width="30%"  @close="closeDialog">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emit: ["update:visible"],
  data() {
    return {};
  },
  methods: {
    closeDialog() {
        this.$emit("update:visible",false)
    },
  },
};
</script>
