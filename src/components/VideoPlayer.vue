<script setup lang="ts">
import { computed, ref } from 'vue'
import ChapterList from '@/components/ChapterList.vue'
import Controls from '@/components/Controls.vue'
import CustomSubtitles from '@/components/CustomSubtitles.vue'
import Loader from '@/components/Loader.vue'
import TranscriptList from '@/components/TranscriptList.vue'
import VideoElement from '@/components/VideoElement.vue'
import { useVideoPlayer } from '@/composables/useVideoPlayer'
import { useChapters } from '@/composables/useChapters'
import { useTranscript } from '@/composables/useTranscript'
import { useActiveCue } from '@/composables/useActiveCue.ts'

const proxyUrl = import.meta.env.VITE_PROXY_BASE_URL
const videoSource = import.meta.env.VITE_ORIGINAL_VIDEO_URL
const chaptersUrl = `${proxyUrl}?url=${encodeURIComponent(import.meta.env.VITE_ORIGINAL_XML_URL)}`
const transcriptUrl = `${proxyUrl}?url=${encodeURIComponent(import.meta.env.VITE_ORIGINAL_VTT_URL)}`

const videoComponentRef = ref<InstanceType<typeof VideoElement> | null>(null)
const videoRef = computed(() => videoComponentRef.value?.videoRef ?? null)
const videoPlayerRef = ref<HTMLDivElement | null>(null)

const {
  currentTime,
  duration,
  volume,
  chapters,
  currentChapter,
  transcript,
  activeCueIndex,
  activeCue,
  isVideoLoading,
  isChaptersLoading,
  isTranscriptLoading,
  isPlaying,
  isEnded,
  isMuted,
  isCaptions,
  isPiP,
  isFullscreen,
  isControlsVisible,
  isChapters,
  isBuffering,
  isTranscript,
  onPlay,
  onPause,
  onVideoLoaded,
  onVideoEnded,
  onTimeUpdate,
  onSeek,
  onVolumeChange,
  onLoadedMetadata,
  onBuffering,
  onPlaying,
  togglePlay,
  toggleMute,
  toggleCaptions,
  togglePiP,
  toggleFullscreen,
  toggleChapters,
  toggleTranscript,
} = useVideoPlayer(videoRef, videoPlayerRef)

useChapters(chaptersUrl, chapters, currentChapter, isChaptersLoading)
useTranscript(transcriptUrl, transcript, isTranscriptLoading)
useActiveCue(currentTime, transcript, activeCueIndex, activeCue)
</script>

<template>
  <div class="video-player-container" role="main">
    <div class="column column-left">
      <div class="video-player-bg">
        <h1>Experience Events Without Borders</h1>
        <div
          ref="videoPlayerRef"
          class="video-player"
          :class="{ 'full-screen': isFullscreen }"
          role="region"
          aria-label="Custom video player with custom controls"
        >
          <VideoElement
            ref="videoComponentRef"
            :src="videoSource"
            :isVideoLoading="isVideoLoading"
            :isBuffering="isBuffering"
            @ended="onVideoEnded"
            @loadedData="onVideoLoaded"
            @loadedMetadata="onLoadedMetadata"
            @play="onPlay"
            @playing="onPlaying"
            @pause="onPause"
            @timeUpdate="onTimeUpdate"
            @buffering="onBuffering"
          />

          <Controls
            :currentTime="currentTime"
            :duration="duration"
            :volume="volume"
            :currentChapter="currentChapter"
            :isPlaying="isPlaying"
            :isEnded="isEnded"
            :isMuted="isMuted"
            :isCaptions="isCaptions"
            :isPiP="isPiP"
            :isFullscreen="isFullscreen"
            :isControlsVisible="isControlsVisible"
            :isChapters="isChapters"
            @playPause="togglePlay"
            @muteToggle="toggleMute"
            @captionsToggle="toggleCaptions"
            @pipToggle="togglePiP"
            @fullscreenToggle="toggleFullscreen"
            @chaptersToggle="toggleChapters"
            @seek="onSeek"
            @volumeChange="onVolumeChange"
          />

          <Transition name="fade">
            <CustomSubtitles
              v-show="isCaptions"
              :activeCue="activeCue"
              :isFullscreen="isFullscreen"
            />
          </Transition>
        </div>
      </div>

      <TranscriptList
        :activeCueIndex="activeCueIndex"
        :transcript="transcript"
        :isTranscript="isTranscript"
        :isTranscriptLoading="isTranscriptLoading"
        @seek="onSeek"
        @transcriptToggle="toggleTranscript"
      />
    </div>
    <div class="column column-right">
      <Transition name="fade">
        <ChapterList
          v-show="isChapters"
          :chapters="chapters"
          :isChapters="isChapters"
          :isChaptersLoading="isChaptersLoading"
          @seek="onSeek"
          @chaptersToggle="toggleChapters"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-player-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 24px;
  padding-top: 24px;
}

.column-left {
  flex: 2;
  min-width: 320px;

  @media (max-width: 992px) {
    width: 100%;
    flex: 1 1 100%;
  }
}

.column-right {
  flex: 1;
  width: 250px;
  min-width: 150px;

  @media (max-width: 992px) {
    width: 100%;
    flex: 1 1 100%;
  }
}

.video-player-bg {
  width: 100%;
  margin: 0 0 24px;
  background: $color-accent;
  border: 1px solid $color-light;
  border-radius: 30px 30px 12px 12px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);

  @media (max-width: 992px) {
    width: 100%;
  }
}

h1 {
  color: $color-light;
  font-size: 24px;
  padding: 5px;
  text-align: center;
}

.video-player {
  position: relative;
  aspect-ratio: 16 / 9;
  background: $color-dark;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  margin: auto;

  &.full-screen {
    display: flex;
    align-items: center;
    border-radius: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
