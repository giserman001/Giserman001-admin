<script>
export default {
  name: 'ChartCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    total: {
      type: [Function, Number, String],
      required: false,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <a-card :loading="loading" :body-style="{ padding: '20px 24px 8px' }" :bordered="false">
    <div class="chart-card-header">
      <div class="meta">
        <span class="chart-card-title">
          <slot name="title">{{ title }}</slot>
        </span>
        <span class="chart-card-action">
          <slot name="action" />
        </span>
      </div>
      <div class="total">
        <slot name="total">
          <span>{{ (typeof total === 'function' && total()) || total }}</span>
        </slot>
      </div>
    </div>
    <div class="chart-card-content">
      <div class="content-fix">
        <slot />
      </div>
    </div>
    <div class="chart-card-footer">
      <div class="field">
        <slot name="footer" />
      </div>
    </div>
  </a-card>
</template>

<style lang="less" scoped>
@import '@/style/variables.less';
.chart-card-header {
  position: relative;
  overflow: hidden;
  width: 100%;

  .meta {
    position: relative;
    overflow: hidden;
    width: 100%;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }
}

.chart-card-action {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}

.chart-card-footer {
  border-top: 1px solid #e8e8e8;
  padding-top: 9px;
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.65);

  > * {
    position: relative;
  }

  .field {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
}

.chart-card-content {
  margin-bottom: 12px;
  position: relative;
  height: 46px;
  width: 100%;

  .content-fix {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}

.total {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  color: #000;
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 30px;
  line-height: 38px;
  height: 38px;
}

.darkMode {
  .chart-card-header {
    .meta {
      // color: @dark-active-font-color;
    }
  }
  .total {
    // color: @dark-active-font-color;
  }
  .chart-card-footer {
    // color: @dark-active-font-color;
  }
}
</style>
