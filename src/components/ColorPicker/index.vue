<script lang="ts" setup name="EleColorPicker">
import type { ColorAttrs, ColorFormat, ColorInput } from './color'
import ls from '@/utils/Storage'
import { Color, debounceFn, MAX_STORAGE_LENGTH, STORAGE_COLOR_KEY } from './color'
import Alpha from './common/Alpha.vue'
import History from './common/History.vue'
import Hue from './common/Hue.vue'
import Saturation from './common/Saturation.vue'
import VColorInput from './common/VColorInput.vue'

const props = defineProps({
  color: {
    type: [String, Object] as PropType<ColorInput>,
    default: '#000000',
  },
  format: {
    type: String as PropType<ColorFormat>,
  },
  disableAlpha: Boolean,
  disableHue: Boolean,
  disableHistory: Boolean,
  historyRound: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:color', 'change'])
const colorClass = new Color()

const currentColor = ref<ColorAttrs>(colorClass.parseColor(props.color))

const storageColorList = ref<string[]>([])

function onStorageColor() {
  storageColorList.value = storageColorList.value.filter((value) => {
    return value !== currentColor.value.hex8
  })
  if (storageColorList.value.length >= MAX_STORAGE_LENGTH) {
    storageColorList.value.shift()
  }
  storageColorList.value.push(currentColor.value.hex8)
  ls.set(STORAGE_COLOR_KEY, storageColorList.value)
}

function onInitColorList() {
  storageColorList.value = ls.get(STORAGE_COLOR_KEY) || []
}

function doOnChange(data: any, oldHue?: number): void {
  currentColor.value = colorClass.parseColor(data, oldHue)
  debounceFn(onStorageColor)
}

function doUpdate() {
  if (props.format) {
    emit('update:color', colorClass.format(props.format))
    emit('change', colorClass.format(props.format))
  }
  else {
    emit('update:color', currentColor.value)
    emit('change', currentColor.value)
  }
}

function onCompactChange(color: string) {
  doOnChange(color)
  doUpdate()
}

function onAlphaChange(alpha: number) {
  doOnChange(
    {
      h: currentColor.value.hsl.h,
      s: currentColor.value.hsl.s,
      l: currentColor.value.hsl.l,
      a: alpha,
      source: 'alpha',
    },
    currentColor.value.hsl.h,
  )
  doUpdate()
}

function onSaturationChange(saturation: number, bright: number) {
  doOnChange(
    {
      h: currentColor.value.hsv.h,
      s: saturation,
      v: bright,
      a: currentColor.value.hsv.a,
      source: 'saturation',
    },
    currentColor.value.hsv.h,
  )
  doUpdate()
}

function onHueChange(hue: number) {
  const { s: saturation, v: bright, a: alpha } = currentColor.value.hsv
  doOnChange(
    {
      h: hue,
      s: saturation,
      v: bright,
      a: alpha,
      source: 'hue',
    },
    hue,
  )

  doUpdate()
}

function onInputChange(val: ColorAttrs) {
  currentColor.value = val
  doUpdate()
}

watch(
  () => props.color,
  (newVal: ColorInput) => {
    doOnChange(toRaw(newVal))
    onInitColorList()
  },
)

onMounted(() => {
  onInitColorList()
})
</script>

<template>
  <div class="bee-ele-colorPicker">
    <div class="bee-ele-row">
      <Saturation
        class="bee-ele-saturation" :hidden="true" :saturation="currentColor.hsv.s" :hue="currentColor.hsv.h"
        :value="currentColor.hsv.v" @change="onSaturationChange"
      />
      <Hue
        v-if="!disableHue" class="bee-ele-hue" :vertical="true" size="small" :hue="currentColor.hsv.h"
        @change="onHueChange"
      />
    </div>
    <Alpha
      v-if="!disableAlpha" style="width: 257px" :color="currentColor.hex8" :alpha="currentColor.alpha"
      @change="onAlphaChange"
    />

    <VColorInput style="width: 257px" :color="currentColor" @change="onInputChange" />

    <History v-if="!disableHistory" :color-list="storageColorList" :round="historyRound" @change="onCompactChange" />
  </div>
</template>

<style lang="less" scoped>
.bee-ele-colorPicker {
  position: relative;
  box-sizing: border-box;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: white;
  padding: 10px;
  width: 300px;

  .bee-ele-row {
    display: flex;

    .bee-ele-saturation {
      width: 280px;
      height: 180px;
    }

    .bee-ele-hue {
      margin-left: 10px;
      height: 180px;
    }
  }
}
</style>
