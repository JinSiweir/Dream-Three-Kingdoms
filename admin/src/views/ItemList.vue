<template>
  <div class="about">
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="物品名称"> </el-table-column>
      <el-table-column prop="icon" label="图标">
        <template #default="scope">
          <img :src="scope.row.icon" style="height:3rem;" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="$router.push(`/items/edit/${scope.row._id}`)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              @click="remove(scope.row)"
            ></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    },
    async remove(row) {
      await this.$confirm(`确定要删除物品"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // const res =
        await this.$http.delete(`rest/items/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>
