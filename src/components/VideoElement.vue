<script setup lang="ts">
import { computed, ref } from 'vue'
import Loader from '@/components/Loader.vue'

const props = defineProps<{
  src: string
  isVideoLoading: boolean
  isBuffering: boolean
}>()
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

const canPlayWebm = computed(() => {
  if (!videoRef.value) return false
  return videoRef.value.canPlayType('video/webm; codecs="vp8, opus"')
})

const shouldShowLoader = computed(() => {
  return !canPlayWebm.value && (props.isVideoLoading || props.isBuffering)
})

defineExpose({ videoRef })
</script>

<template>
  <div>
    <Loader v-if="shouldShowLoader" />
    <video
      v-show="canPlayWebm"
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
      <source :src="src" type='video/webm; codecs="vp8, opus"' />
      Your browser does not support the video tag.
    </video>
    <div v-show="!canPlayWebm" class="unsupported-message">
      Your browser does not support this video format.
    </div>
  </div>
</template>

<style scoped lang="scss">
.video {
  width: 100%;
  height: auto;
  display: block;
}

.unsupported-message {
  color: red;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
}
</style>
