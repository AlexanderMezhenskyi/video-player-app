<script setup lang="ts">
import { ref } from 'vue'
import Loader from '@/components/Loader.vue'

const videoSource =
  'https://meetyoo-code-challenge.s3.eu-central-1.amazonaws.com/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/video.webm'
const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const isLoading = ref(true)

const togglePlay = () => {
  if (!videoRef.value) return

  if (videoRef.value.paused) {
    videoRef.value.play()
  } else {
    videoRef.value.pause()
  }
}

const onPlay = () => {
  isPlaying.value = true
}

const onPause = () => {
  isPlaying.value = false
}

const onVideoLoaded = () => {
  isLoading.value = false
}

const onLoadedMetadata = () => {
  console.log('Metadata loaded:', videoRef.value?.duration)
}

const onTimeUpdate = () => {
  console.log('Current time:', videoRef.value?.currentTime)
}
</script>

<template>
  <div class="video-player">
    <Loader v-if="isLoading" />
    <video
      ref="videoRef"
      class="video"
      :class="{ hide: isLoading }"
      @loadeddata="onVideoLoaded"
      @loadedmetadata="onLoadedMetadata"
      @pause="onPause"
      @play="onPlay"
      @timeupdate="onTimeUpdate"
    >
      <source :src="videoSource" type="video/webm" />
      Your browser does not support the video tag.
    </video>
    <button v-if="!isLoading" class="play-button" @click="togglePlay">
      {{ isPlaying ? 'Pause' : 'Play' }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.video-player {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  aspect-ratio: 16 / 9;
  padding: 16px;
  background: $color-dark;
  margin: auto;

  .video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-bottom: 16px;

    &.hide {
      display: none;
    }
  }

  .play-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: $color-accent-light;
    color: $color-light;
    border: none;
    border-radius: $border-radius-md;
    cursor: pointer;

    &:hover {
      background-color: $color-accent;
    }
  }
}
</style>
