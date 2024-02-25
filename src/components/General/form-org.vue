<script setup lang="ts">
import { match } from "pinyin-pro";
import { onMounted, ref } from "vue";
import { getOrgtListUpper } from "@/api/system/org";
import { filter } from "xe-utils";

const props = withDefaults(
  defineProps<{
    organ: string;
    filter: string;
    is_low: boolean; // 仅查询6位号码机构
    is_org: boolean; // 仅查询支行
    disabled: boolean;
    clearable: boolean;
  }>(),
  {
    filter: "",
    is_low: true,
    is_org: true,
    disabled: false,
    clearable: false
  }
);

// 机构级联
const org = ref(props.organ);

const orgList = ref([]);

const orgOptions = ref([]);

const OrgFilter = val => {
  if (!val) {
    orgOptions.value = orgList.value;
    return;
  }
  const inputValue = val.toLowerCase();

  const filterOptions = (options, key) =>
    options
      .map(group => ({
        label: group.label,
        options: group.options.filter(
          option =>
            option[key] &&
            match(option[key].toString().toLowerCase(), inputValue)
        )
      }))
      .filter(group => group.options.length > 0);

  orgOptions.value = !isNaN(inputValue.charAt(0))
    ? filterOptions(orgList.value, "value")
    : filterOptions(orgList.value, "label");
};

const emit = defineEmits(["on-click"]);

const handleClick = () => {
  const filter = orgList.value.filter(item => {
    if (org.value == item.value) return item;
  });
  const label = filter.length > 0 ? filter[0].label : "";
  emit("on-click", { value: org.value, label: label });
};

onMounted(async () => {
  await getOrgtListUpper({ is_lower: props.is_low, is_org: props.is_org }).then(
    res => {
      const data = res.data;
      if (props.filter) {
        const f = props.filter;
        const filters = data
          .map(group => ({
            label: group.label,
            options: group.options.filter(option => {
              if (option.value.substring(1, 5) == f.substring(1, 5))
                return option;
            })
          }))
          .filter(group => group.options.length > 0);
        orgList.value = filters;
        orgOptions.value = filters;
      } else {
        orgList.value = res.data;
        orgOptions.value = res.data;
      }
    }
  );
});
</script>

<template>
  <el-select
    v-model="org"
    style="width: 150px"
    filterable
    :clearable="props.clearable"
    :disabled="props.disabled"
    :filter-method="OrgFilter"
    @change="handleClick"
  >
    <el-option-group
      v-for="group in orgOptions"
      :key="group.value"
      :label="group.label"
      :value="group.value"
    >
      <el-option
        v-for="item in group.options"
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
          >{{ item.value }}</span
        >
      </el-option>
    </el-option-group>
  </el-select>
</template>

<style lang="scss" scoped></style>
