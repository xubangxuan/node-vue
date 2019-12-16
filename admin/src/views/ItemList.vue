<template>
  <div>
      <h3>物品列表</h3>
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="220"></el-table-column>
        <el-table-column prop="name" label="物品名称"></el-table-column>
        <el-table-column prop="icon" label="物品图标">
          <template slot-scope="scope">
            <img :src="scope.row.icon" alt="" style="height: 3rem">
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small"
              @click="$router.push(`/items/edit/${scope.row._id}`)"
            >编辑</el-button>
            <el-button type="text" size="small"
              @click="remove(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: []
      }
    },
    created() {
      this.fetch()
    },
    methods: {
      remove(row){
        this.$confirm(`是否确认删除该分类 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          const res = await this.$http.delete(`rest/items/${row._id}`);
          if(res.data.success){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetch();
          }else{
            this.$message({
              type: 'erro',
              message: '删除失败!'
            });
          }
          
        })
      },
      async fetch(){
        const res = await this.$http.get('rest/items');
        window.console.log(res)
        this.items = res.data
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>