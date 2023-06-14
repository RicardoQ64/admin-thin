<script setup lang="ts">
import { type CSSProperties, ref, computed } from "vue";
import { useUserStoreHook } from "@/store/modules/user";
import { hasAuth, getAuths } from "@/router/utils";

defineOptions({
  name: "TestPage"
});

const elStyle = computed((): CSSProperties => {
  return {
    width: "85vw",
    justifyContent: "start"
  };
});

const userno = ref(useUserStoreHook()?.userNo);

const username = ref(useUserStoreHook()?.username);
</script>

<template>
  <el-space direction="vertical" size="large">
    <div class="card-header">
      <span>{{ userno }} -- {{ username }}</span>
    </div>
    <el-tag :style="elStyle" size="large" effect="dark">
      当前拥有的code列表：{{ getAuths() }}
    </el-tag>

    <el-card shadow="never" :style="elStyle">
      <template #header>
        <div class="card-header">组件方式判断权限</div>
      </template>
      <Auth value="add">
        <el-button type="success"> 拥有code：'add' 权限可见 </el-button>
      </Auth>
      <Auth :value="['edit']">
        <el-button type="primary"> 拥有code：['edit'] 权限可见 </el-button>
      </Auth>
      <Auth :value="['add', 'edit', 'delete']">
        <el-button type="danger">
          拥有code：['add', 'edit', 'delete'] 权限可见
        </el-button>
      </Auth>
    </el-card>

    <el-card shadow="never" :style="elStyle">
      <template #header>
        <div class="card-header">函数方式判断权限</div>
      </template>
      <el-button type="success" v-if="hasAuth('add')">
        拥有code：'add' 权限可见
      </el-button>
      <el-button type="primary" v-if="hasAuth(['edit'])">
        拥有code：['edit'] 权限可见
      </el-button>
      <el-button type="danger" v-if="hasAuth(['add', 'edit', 'delete'])">
        拥有code：['add', 'edit', 'delete'] 权限可见
      </el-button>
    </el-card>

    <el-card shadow="never" :style="elStyle">
      <template #header>
        <div class="card-header">
          指令方式判断权限（该方式不能动态修改权限）
        </div>
      </template>
      <el-button type="success" v-auth="'add'">
        拥有code：'add' 权限可见
      </el-button>
      <el-button type="primary" v-auth="['edit']">
        拥有code：['edit'] 权限可见
      </el-button>
      <el-button type="danger" v-auth="['add', 'edit', 'delete']">
        拥有code：['add', 'edit', 'delete'] 权限可见
      </el-button>
    </el-card>
  </el-space>
</template>
<style></style>
