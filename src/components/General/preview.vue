<script setup lang="ts">
import { matchType } from "../../utils/general/fileFuc";
import VueOfficePdf from "@vue-office/pdf";
import VueOfficeDocx from "@vue-office/docx";
import VueOfficeExcel from "@vue-office/excel";

const { VITE_UPLOAD_SERVER } = import.meta.env;

const props = defineProps({
  file: String
});
const type = matchType(props.file);
const file_addr = VITE_UPLOAD_SERVER + props.file;
</script>

<template>
  <el-scrollbar height="720px" v-bind:class="{ 'my-scroll': true }">
    <vue-office-docx :src="file_addr" v-if="type == 'word'" />
    <vue-office-pdf :src="file_addr" v-else-if="type == 'pdf'" />
    <vue-office-excel :src="file_addr" v-else-if="type == 'excel'" />
  </el-scrollbar>
</template>

<style lang="scss" scoped>
:deep(.vue-office-pdf-wrapper) {
  display: flex;
  flex-flow: column;
  align-items: center;
}
:deep(.el-scrollbar__thumb) {
  background-color: #fff !important;
}
</style>
