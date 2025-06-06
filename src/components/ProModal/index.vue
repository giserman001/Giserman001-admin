<script setup lang="ts">
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
import vDragModal from './dragModal'

const { name = '标题' } = defineProps<{ name?: string }>()

const open = defineModel<boolean>('open', { required: true })

const isFull = ref(false)
function handleFull() {
  isFull.value = !isFull.value
}
watch(open, (val) => {
  if (!val) {
    setTimeout(() => {
      isFull.value = false
    }, 200)
  }
})
</script>

<template>
  <div>
    <a-modal v-model:open="open" :wrap-class-name="isFull ? 'full-modal' : ''" v-bind="$attrs">
      <template #title>
        <div v-drag-modal>{{ name }}</div>
      </template>
      <template v-for="(_, keys) in $slots" #[keys]>
        <div v-if="keys === 'default'" :key="keys" ly-absolute ly-top="[17px]" ly-right="[44px]" ly-cursor-pointer>
          <FullscreenOutlined
            v-if="!isFull" ly-flex ly-items-center ly-justify-center class="ly-h-[22px] ly-w-[22px] ly-text-[rgba(0,0,0,0.45)]"
            hover="ly-text-[rgba(0,0,0,0.88)] ly-bg-[rgba(0,0,0,0.06)]"
            @click="handleFull"
          />
          <FullscreenExitOutlined
            v-else ly-flex ly-items-center ly-justify-center class="ly-h-[22px] ly-w-[22px] ly-text-[rgba(0,0,0,0.45)]"
            hover="ly-text-[rgba(0,0,0,0.88)] ly-bg-[rgba(0,0,0,0.06)]"
            @click="handleFull"
          />
        </div>
        <slot :name="keys" />
      </template>
    </a-modal>
  </div>
</template>

<style lang="less" scoped></style>
