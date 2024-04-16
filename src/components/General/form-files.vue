<script setup lang="ts">
import { computed, ref } from "vue";
import { InputNumberEmits, UploadFile, UploadProps } from "element-plus";
import { getKeyList } from "@pureadmin/utils";
import { matchType } from "@/utils/general/etl";
import { baseApi } from "@/api/utils";
import { message } from "@/utils/message";

interface Props {
  user: String;
  files: String;
  limit: Number;
  max: Number;
}

const props = withDefaults(defineProps<Props>(), {
  files: "",
  limit: 1,
  max: 2
});

// 上传
const upload = ref<UploadInstance>();

const files = ref<UploadUserFile[]>(
  props.files
    ? props.files.split("#").map(item => {
        return {
          url: item,
          name: item.split("_")[1]
        };
      })
    : []
);

console.log(files);

const file_return = ref("");

const file_addr = baseApi("upload-files");

const handleSuccess: UploadProps["onSuccess"] = res => {
  const file_list = [];
  files.value.forEach(file => {
    if (file.status == "success") {
      // @ts-ignore
      file_list.push(file.response ? file.response.data : "");
    }
  });
  file_return.value = file_list.join("#");
  message("上传成功！", {
    type: "success"
  });
};

const beforeUpload: UploadProps["beforeUpload"] = rawFile => {
  if (matchType(rawFile.name) == "pdf" || matchType(rawFile.name) == "word") {
    return true;
  } else message("限制文件格式(.doc,.docx,.pdf)！", { type: "error" });
  return false;
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

/** 超出最大上传数时触发 */
const onExceed = () => {
  message(`最多上传${props.limit}个文件，请先删除在上传！`);
};

const onChange = () => {
  emit("on-click", file_return.value);
};

const emit = defineEmits(["on-click"]);
</script>

<template>
  <div style="display: inline-grid">
    <el-upload
      ref="upload"
      drag
      accept=".doc,.docx,.pdf"
      :action="baseApi('upload/' + props.user)"
      :on-exceed="onExceed"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-change="onChange"
      :limit="props.limit"
      v-model:file-list="files"
      :show-file-list="true"
    >
      <div class="el-upload__text" style="padding: 10px 20px">
        将文件拖拽至此或 <em>点击</em>
      </div>
      <template #tip>
        <div class="el-upload__tip text-red" style="margin-top: 15px">
          限制文件格式(.doc,.docx,.pdf)
        </div>
      </template>
    </el-upload>
  </div>
</template>
<style scoped>
:deep(.el-upload-list__item-file-name) {
  white-space: normal;
}
</style>
