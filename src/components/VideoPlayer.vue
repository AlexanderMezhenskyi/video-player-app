<script setup lang="ts">
import { computed, ref } from 'vue'
import VideoElement from '@/components/VideoElement.vue'
import Controls from '@/components/Controls.vue'
import Loader from '@/components/Loader.vue'
import { useVideoPlayer } from '@/composables/useVideoPlayer'

const videoSource = import.meta.env.VITE_ORIGINAL_VIDEO_URL

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
  isControlsVisible,
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
  margin-bottom: 24px;
  background: $color-accent;
  border: 1px solid $color-light;
  border-radius: 60px 60px 12px 12px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
}

h1 {
  color: $color-light;
  font-size: 24px;
  margin: 0;
  padding: 5px;
}

.video-player {
  position: relative;
  width: 800px;
  aspect-ratio: 16 / 9;
  background: $color-dark;
  border-radius: 30px 30px 10px 10px;
  overflow: hidden;
  margin: auto;

  &.full-screen {
    display: flex;
    align-self: center;
    border-radius: 0;
  }

  @media (max-width: 992px) {
    width: 100%;
  }
}
</style>
