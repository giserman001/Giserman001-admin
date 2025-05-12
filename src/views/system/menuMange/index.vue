<template>
  <div class="table-box">
    <!-- <ProTable ref="proTable" title="菜单列表" row-key="path" :indent="20" :columns="columns" :data="menuData">
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus">新增菜单 </el-button>
      </template>
      <template #icon="scope">
        <el-icon :size="18">
          <component :is="scope.row.meta.icon"></component>
        </el-icon>
      </template>
      <template #operation>
        <el-button type="primary" link :icon="EditPen"> 编辑 </el-button>
        <el-button type="primary" link :icon="Delete"> 删除 </el-button>
      </template>
    </ProTable> -->
    <span class="text"> 菜单管理（待完善） 🍓🍇🍈🍉</span>
  </div>
</template>

<script setup lang="ts" name="menuMange">
// import { ColumnProps } from "@/components/ProTable/interface";
// import { Delete, EditPen, CirclePlus } from "@element-plus/icons-vue";
// import authMenuList from "@/assets/json/authMenuList.json";
// import ProTable from "@/components/ProTable/index.vue";

// const proTable = ref();

// const menuData = ref(authMenuList.data);

// 表格配置项
// const columns: ColumnProps[] = [
//   { prop: "meta.title", label: "菜单名称", align: "left", search: { el: "input" } },
//   { prop: "meta.icon", label: "菜单图标" },
//   { prop: "name", label: "菜单 name", search: { el: "input" } },
//   { prop: "path", label: "菜单路径", width: 300, search: { el: "input" } },
//   { prop: "component", label: "组件路径", width: 300 },
//   { prop: "operation", label: "操作", width: 250, fixed: "right" }
// ];
</script>
