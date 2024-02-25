<script setup lang="ts">
import { match } from "pinyin-pro";
import { onMounted, ref } from "vue";
import { getUserOptions } from "@/api/system/user";

const props = defineProps({
  user: String
});

// 用户级联: 方法
const staff = ref(props.user);

const userList = ref([]);

const userOptions = ref([]);

const usersFilter = val => {
  if (!val) {
    userOptions.value = userList.value;
    return;
  }

  const searchTerm = val.toLowerCase();
  const isNumeric = !isNaN(searchTerm.charAt(0));

  userOptions.value = userList.value.filter(user => {
    const targetString = isNumeric
      ? user.value.toLowerCase()
      : user.label.toLowerCase();
    return match(targetString.toLowerCase(), searchTerm);
  });
};

const emit = defineEmits(["on-click"]);

const handleClick = () => {
  const filter = userList.value.filter(user => {
    if (staff.value == user.value) return user;
  });
  const label = filter.length > 0 ? filter[0].label : "";
  emit("on-click", { value: staff.value, label: label });
};

onMounted(async () => {
  await getUserOptions().then(res => {
    userList.value = res.data;
    userOptions.value = res.data;
  });
});
</script>

<template>
  <el-select
    v-model="staff"
    clearable
    filterable
    style="width: 150px"
    :filter-method="usersFilter"
    @change="handleClick"
  >
    <el-option
      v-for="item in userOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span style="float: left">{{ item.label }}</span>
      <span
        style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
        >{{ item.value }}
      </span>
    </el-option>
  </el-select>
</template>

<style lang="scss" scoped></style>
