<script setup lang="ts">
import { matchType } from "../../utils/general/etl";
import VueOfficePdf from "@vue-office/pdf";
import VueOfficeDocx from "@vue-office/docx";
import VueOfficeExcel from "@vue-office/excel";
import { baseApi } from "@/api/utils";

const props = defineProps({
  file: String
});
const type = matchType(props.file);
const file_addr = baseApi("upload-files") + props.file;
</script>

<template>
  <vue-office-docx :src="file_addr" v-if="type == 'word'" />
  <vue-office-pdf
    :src="file_addr"
    v-else-if="type == 'pdf'"
    :options="{ width: '100%' }"
  />
  <vue-office-excel :src="file_addr" v-else-if="type == 'excel'" />
</template>

<style lang="scss" scoped>
:deep(.vue-office-pdf-wrapper) {
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>
