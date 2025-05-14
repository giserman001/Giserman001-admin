<script lang="ts" setup name="DynamicForm">
const props = defineProps({
  disabledAll: {
    type: Boolean,
    default: true,
    required: false,
  },
  formProps: {
    default: [],
    required: false,
  },
  // 列数,默认每行2列
  colNumber: {
    type: Number,
    default: 2,
    required: false,
  },
  formModel: {
    type: Object,
    default() {},
    required: false,
  },
})
const formProps = props.formProps
function onFieldChange(value, fn) {
  if (fn) {
    fn(value)
  }
}
</script>

<template>
  <a-form class="dynamicForm" :model="formModel">
    <a-row :gutter="24">
      <template v-for="{ type, label, options, onChange, name } in formProps" :key="name">
        <a-col :span="24 / colNumber">
          <a-form-item :name="name">
            <template #label>
              <span>{{ label }}</span>
            </template>
            <a-input v-if="type === 'input'" v-model:value="formModel![name]" style="width: 100%" />
            <a-select v-else-if="type === 'select'" v-model:value="formModel![name]" style="width: 100%" :allow-clear="true" @change="onFieldChange($event, onChange)">
              <a-select-option v-for="item in options" :key="item.value" :label="item.label">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </template>
    </a-row>
    <slot name="zidingyi" />
  </a-form>
</template>

<style lang="less"></style>
