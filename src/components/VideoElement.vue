<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ src: string }>()
defineEmits<{
  (e: 'ended'): void
  (e: 'loadedData'): void
  (e: 'loadedMetadata', event: Event): void
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'timeUpdate', event: Event): void
}>()

const videoRef = ref<HTMLVideoElement | null>(null)

defineExpose({ videoRef })
</script>

<template>
  <video
    ref="videoRef"
    :src="src"
    class="video"
    @ended="$emit('ended')"
    @loadeddata="$emit('loadedData')"
    @loadedmetadata="$emit('loadedMetadata', $event)"
    @play="$emit('play')"
    @pause="$emit('pause')"
    @timeupdate="$emit('timeUpdate', $event)"
  >
    Your browser does not support the video tag.
  </video>
</template>

<style scoped lang="scss">
.video {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}
</style>
