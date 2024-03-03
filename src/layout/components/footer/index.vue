<script lang="ts" setup>
import { getConfig } from "@/config";
const TITLE = getConfig("Title");
</script>

<template>
  <footer
    class="layout-footer text-[rgba(0,0,0,0.6)] dark:text-[rgba(220,220,242,0.8)]"
  >
    Copyright © 2023-present&nbsp;{{ TITLE }}
  </footer>
</template>

<style lang="scss" scoped>
.layout-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 0 0 8px;
  font-size: 14px;
}
</style>
