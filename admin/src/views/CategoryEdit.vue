<template>
  <div class="create">
    <h1>新建分类</h1>
    <!--  native 原生表单  prevent 阻止事件-->
    <el-form label-width="120px" @submit.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-tpye="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return { model: {} };
  },
  methods: {
    save() {
      // this.$http.post();
    },
  },
};
</script>
