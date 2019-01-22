<template>
  <div>
    <el-form label-width="80px" :model="formLabelAlign">
      <el-form-item label="名称">
        <!-- <el-input v-model="formLabelAlign.name"></el-input> -->
        <el-checkbox v-model="formLabelAlign.name.inner"></el-checkbox>
      </el-form-item>
      <el-form-item label="number">
        <el-input-number v-model="formLabelAlign.number.one"></el-input-number>
      </el-form-item>
      <!-- <el-form-item label="活动区域">
    <el-input v-model="formLabelAlign.region"></el-input>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input v-model="formLabelAlign.type"></el-input>
  </el-form-item> -->
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formLabelAlign: {
        name: {
          inner: false
        },
        number: {
          one: 123
        }
      }
    };
  }
};
</script>