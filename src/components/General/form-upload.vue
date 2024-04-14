<script setup lang="ts">
import { computed, ref } from "vue";
import { InputNumberEmits, UploadFile, UploadProps } from "element-plus";
import { getKeyList } from "@pureadmin/utils";
import { baseApi } from "@/api/utils";
import { message } from "@/utils/message";

import Add from "@iconify-icons/ep/plus";
import Eye from "@iconify-icons/ri/eye-line";
import Delete from "@iconify-icons/ri/delete-bin-7-line";

interface Props {
  user: String;
  limit: Number;
  label: String;
  max: Number;
}

const props = withDefaults(defineProps<Props>(), {
  label: "点击上传文件",
  max: 2
});

// 上传
const file_list = ref([]);
const cur_open_img_index = ref(0);
const dialogVisible = ref(false);
const file_return = ref("");

const url_list = computed(() => getKeyList(file_list.value, "url"));

const file_addr = baseApi("upload-files");

/** 上传文件前校验 */
const onBefore = file => {
  if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
    message("只能上传图片");
    return false;
  }
  const isExceed = file.size / 1024 / 1024 > props.max;
  if (isExceed) {
    message(`单个图片大小不能超过${props.max}MB`);
    return false;
  }
};

/** 超出最大上传数时触发 */
const onExceed = () => {
  message("最多上传" + props.limit + "张图片，请先删除在上传");
};

const onSuccess: UploadProps["onSuccess"] = res => {
  const files = [];
  file_list.value.forEach(file => {
    if (file.status == "success") {
      files.push(
        file.url && !file.url.startsWith("blob")
          ? file.url.replace(file_addr, "")
          : file.response
            ? // @ts-ignore
              file.response.data
            : ""
      );
    }
  });
  file_return.value = files.join("#");
  message(res.message, {
    type: "success"
  });
};

/** 移除上传的文件 */
const onRemove = (file: UploadFile) => {
  file_list.value.splice(file_list.value.indexOf(file), 1);
  const files = [];
  file_list.value.forEach(file => {
    if (file.status == "success") {
      files.push(
        file.url && !file.url.startsWith("blob")
          ? file.url.replace(file_addr, "")
          : file.response
            ? // @ts-ignore
              file.response.data
            : ""
      );
    }
  });

  if (files.length > 0) file_return.value = files.join("#");
  else file_return.value = "";
  emit("on-click", file_return.value);
};

const onChange = () => {
  emit("on-click", file_return.value);
};

/** 大图预览 */
const handlePictureCardPreview = (file: UploadFile) => {
  cur_open_img_index.value = file_list.value.findIndex(
    img => img.uid === file.uid
  );
  dialogVisible.value = true;
};

const emit = defineEmits(["on-click"]);
</script>

<template>
  <div style="display: inline-grid">
    <el-upload
      :action="baseApi('upload/' + props.user)"
      v-model:file-list="file_list"
      drag
      multiple
      list-type="picture-card"
      accept="image/jpeg,image/png,image/gif"
      :limit="props.limit"
      :before-upload="onBefore"
      :on-exceed="onExceed"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :on-change="onChange"
    >
      <IconifyIconOffline :icon="Add" class="m-auto" width="30" />
      <el-text>{{ props.label }}</el-text>
      <template #file="{ file }">
        <div
          v-if="file.status == 'ready' || file.status == 'uploading'"
          class="mt-[35%] m-auto"
        >
          <p class="font-medium">文件上传中</p>
          <el-progress
            class="mt-2"
            :stroke-width="2"
            :text-inside="true"
            :show-text="false"
            :percentage="file.percentage"
          />
        </div>
        <div v-else>
          <img
            class="el-upload-list__item-thumbnail select-none"
            :src="file.url"
          />
          <span
            id="pure-upload-item"
            :class="[
              'el-upload-list__item-actions',
              file_list.length > 1 && '!cursor-move'
            ]"
          >
            <span
              title="查看"
              class="hover:text-primary"
              @click="handlePictureCardPreview(file)"
            >
              <IconifyIconOffline
                :icon="Eye"
                class="hover:scale-125 duration-100"
              />
            </span>
            <span class="el-upload-list__item-delete" @click="onRemove(file)">
              <span title="移除" class="hover:text-[var(--el-color-danger)]">
                <IconifyIconOffline
                  :icon="Delete"
                  class="hover:scale-125 duration-100"
                />
              </span>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <el-image-viewer
      v-if="dialogVisible"
      :initialIndex="cur_open_img_index"
      :url-list="url_list"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      @close="dialogVisible = false"
      @switch="index => (cur_open_img_index = index)"
    />
    <teleport to="body">
      <div
        v-if="file_list[cur_open_img_index] && dialogVisible"
        effect="dark"
        round
        size="large"
        type="info"
        class="img-name"
      >
        <p class="text-[#fff] dark:text-black">
          {{ file_list[cur_open_img_index].name }}
        </p>
      </div>
    </teleport>
  </div>
</template>
<style scoped>
:deep(.el-upload-dragger) {
  border: 0px;
  background-color: var(--el-fill-color-lighter);
  padding: 40px 10px 0;
}
</style>
