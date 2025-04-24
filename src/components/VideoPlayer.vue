<script setup lang="ts">
import { computed, ref } from 'vue'
import VideoElement from '@/components/VideoElement.vue'
import Controls from '@/components/Controls.vue'
import Loader from '@/components/Loader.vue'
import { useVideoPlayer } from '@/composables/useVideoPlayer'

const videoSource =
  'https://meetyoo-code-challenge.s3.eu-central-1.amazonaws.com/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/video.webm'

const videoComponentRef = ref<InstanceType<typeof VideoElement> | null>(null)
const videoRef = computed(() => videoComponentRef.value?.videoRef ?? null)
const videoPlayerRef = ref<HTMLDivElement | null>(null)

const {
  currentTime,
  duration,
  volume,
  seekValue,
  isLoading,
  isPlaying,
  isEnded,
  isMuted,
  isCaptions,
  isPiP,
  isFullscreen,
  onPlay,
  onPause,
  onVideoEnded,
  onTimeUpdate,
  onSeek,
  onVolumeChange,
  onLoadedMetadata,
  togglePlay,
  toggleMute,
  toggleCaptions,
  togglePiP,
  toggleFullscreen,
} = useVideoPlayer(videoRef, videoPlayerRef)
</script>

<template>
  <div class="video-player-wrapper">
    <h1>Experience Events Without Borders</h1>
    <div class="video-player" ref="videoPlayerRef">
      <Loader v-if="isLoading" />

      <VideoElement
        ref="videoComponentRef"
        :src="videoSource"
        @ended="onVideoEnded"
        @loadedData="isLoading = false"
        @loadedMetadata="onLoadedMetadata"
        @play="onPlay"
        @pause="onPause"
        @timeUpdate="onTimeUpdate"
      />

      <Controls
        :isPlaying="isPlaying"
        :isEnded="isEnded"
        :isMuted="isMuted"
        :isCaptions="isCaptions"
        :isPiP="isPiP"
        :isFullscreen="isFullscreen"
        :currentTime="currentTime"
        :duration="duration"
        :volume="volume"
        :seekValue="seekValue"
        @playPause="togglePlay"
        @muteToggle="toggleMute"
        @captionsToggle="toggleCaptions"
        @pipToggle="togglePiP"
        @fullscreenToggle="toggleFullscreen"
        @seek="onSeek"
        @volumeChange="onVolumeChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-player-wrapper {
  background: $color-controls-light;
  border-radius: 60px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
}

h1 {
  color: $color-light;
  font-size: 24px;
  margin: 0;
  padding: 2px;
}

.video-player {
  position: relative;
  width: 800px;
  aspect-ratio: 16 / 9;
  background: $color-dark;
  border-radius: 30px 30px $border-radius-lg $border-radius-lg;
  overflow: hidden;
  margin: auto;

  @media (max-width: 992px) {
    width: 100%;
  }
}
</style>
