<script>
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons-vue'

export default {
  name: 'NumberInfo',
  components: {
    CaretUpOutlined,
    CaretDownOutlined,
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-number-info',
    },
    total: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    subTitle: {
      type: [String, Function],
      default: '',
    },
    status: {
      type: String,
      default: 'up',
    },
  },
}
</script>

<template>
  <div :class="[prefixCls]">
    <span style="color: rgba(0, 0, 0, 0.65)" class="subtitle">
      <slot name="subtitle" />
    </span>
    <div class="number-info-value">
      <span class="total">{{ total }}</span>
      <span class="sub-total">
        <span class="txt">{{ subTotal }}</span>
        <CaretUpOutlined v-if="status === 'up'" />
        <CaretDownOutlined v-else />
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import 'index';
</style>
