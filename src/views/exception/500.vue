<script lang="ts" setup name="Exception500">
defineProps({
  title: {
    required: false,
    type: String,
    default: 'exception-Sorry, the server is reporting an error.',
  },
})
function toHome() {
  window.location.href = '/'
}

const router = useRouter()
const { errorMsg } = router.currentRoute.value.params
</script>

<template>
  <a-result status="500" title="500">
    <template #subTitle>
      <pre>
        {{ errorMsg || $t(title) }}
      </pre>
    </template>
    <template #extra>
      <a-button type="primary" @click="toHome"> Back Home </a-button>
    </template>
  </a-result>
</template>
