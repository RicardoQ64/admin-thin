<script lang="ts" setup>
import { getConfig } from "@/config";
const TITLE = getConfig("Title");
</script>

<template>
  <footer class="layout-footer">
    © 2023-PRESENT
    <span>
      {{ TITLE }}
    </span>
  </footer>
</template>

<style lang="scss" scoped>
.layout-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 0 0 8px;
  color: #c0c4cc;
}
</style>
