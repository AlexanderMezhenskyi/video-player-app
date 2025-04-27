<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ src: string }>()
defineEmits<{
  (e: 'ended'): void
  (e: 'loadedData'): void
  (e: 'loadedMetadata', event: Event): void
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'playing'): void
  (e: 'timeUpdate', event: Event): void
  (e: 'buffering'): void
}>()

const videoRef = ref<HTMLVideoElement | null>(null)

defineExpose({ videoRef })
</script>

<template>
  <video
    ref="videoRef"
    class="video"
    preload="metadata"
    aria-label="Video player with custom controls"
    @ended="$emit('ended')"
    @loadeddata="$emit('loadedData')"
    @loadedmetadata="$emit('loadedMetadata', $event)"
    @play="$emit('play')"
    @playing="$emit('playing')"
    @pause="$emit('pause')"
    @timeupdate="$emit('timeUpdate', $event)"
    @waiting="$emit('buffering')"
  >
    <source :src="src" type="video/webm" />
    Your browser does not support the video tag.
  </video>
</template>

<style scoped lang="scss">
.video {
  width: 100%;
  height: auto;
  display: block;
}
</style>
