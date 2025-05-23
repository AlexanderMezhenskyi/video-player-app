<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import PlayIcon from '@/components/Icons/PlayIcon.vue'
import PauseIcon from '@/components/Icons/PauseIcon.vue'
import RepeatIcon from '@/components/Icons/RepeatIcon.vue'
import VolumeOffIcon from '@/components/Icons/VolumeOffIcon.vue'
import VolumeLowIcon from '@/components/Icons/VolumeLowIcon.vue'
import VolumeHighIcon from '@/components/Icons/VolumeHighIcon.vue'
import CaptionsIcon from '@/components/Icons/CaptionsIcon.vue'
import CaptionsOffIcon from '@/components/Icons/CaptionsOffIcon.vue'
import PictureInPictureIcon from '@/components/Icons/PictureInPictureIcon.vue'
import ArrowOutUpLeft from '@/components/Icons/ArrowOutUpLeft.vue'
import MaximizeIcon from '@/components/Icons/MaximizeIcon.vue'
import MinimizeIcon from '@/components/Icons/MinimizeIcon.vue'
import ChevronsRightIcon from '@/components/Icons/ChevronsRightIcon.vue'
import { formatDuration } from '@/utils/helpers.ts'
import type { Chapter } from '@/types/types.ts'

const props = defineProps<{
  currentTime: number
  duration: number
  volume: number
  currentChapter?: Chapter
  isPlaying: boolean
  isEnded: boolean
  isMuted: boolean
  isCaptions: boolean
  isPiP: boolean
  isFullscreen: boolean
  isControlsVisible: boolean
  isChapters: boolean
}>()

defineEmits<{
  (e: 'playPause'): void
  (e: 'muteToggle'): void
  (e: 'captionsToggle'): void
  (e: 'pipToggle'): void
  (e: 'fullscreenToggle'): void
  (e: 'chaptersToggle'): void
  (e: 'seek', event: Event): void
  (e: 'volumeChange', event: Event): void
}>()

const { currentTime } = toRefs(props)
const seekValue = ref(currentTime.value)

watch(currentTime, (newVal: number): void => {
  seekValue.value = newVal
})
</script>

<template>
  <div class="controls" :class="{ hidden: !isControlsVisible }">
    <input
      v-model="seekValue"
      class="seek-bar"
      type="range"
      min="0"
      :max="duration"
      step="0.1"
      :style="{ '--progress': `${(seekValue / duration) * 100}%` }"
      role="slider"
      :aria-valuemin="0"
      :aria-valuemax="duration"
      :aria-valuenow="seekValue"
      aria-label="Seek video"
      @input="$emit('seek', $event)"
    />

    <div class="controls-row">
      <div class="controls-group controls-group-left">
        <button
          :aria-label="isEnded ? 'Replay video' : isPlaying ? 'Pause video' : 'Play video'"
          @click="$emit('playPause')"
        >
          <component :is="isEnded ? RepeatIcon : isPlaying ? PauseIcon : PlayIcon" />
        </button>

        <span class="time-display" id="time-display">
          <span>{{ formatDuration(currentTime) }}</span>
          <span class="end">&sol;</span>
          <span class="end">{{ formatDuration(duration) }}</span>
        </span>

        <div v-if="currentChapter?.title" class="chapter">
          <span class="chapter-title-wrap">
            <span aria-hidden="true">&middot;</span>
            <span class="chapter-title" id="chapter-title">
              {{ currentChapter.title }}
            </span>
          </span>
          <span class="chapter-title-wrap-mb">
            <span aria-hidden="true">&middot;&nbsp;</span>
            <span>Chapters</span>
          </span>
          <button
            v-if="!isFullscreen"
            :aria-label="isChapters ? 'Hide chapter list' : 'Show chapter list'"
            @click="$emit('chaptersToggle')"
          >
            <ChevronsRightIcon />
          </button>
        </div>
      </div>

      <div class="controls-group controls-group-right">
        <button
          :aria-label="isMuted || volume === 0 ? 'Unmute' : 'Mute'"
          @click="$emit('muteToggle')"
        >
          <component
            :is="
              isMuted || volume === 0
                ? VolumeOffIcon
                : volume < 0.5
                  ? VolumeLowIcon
                  : VolumeHighIcon
            "
          />
        </button>

        <input
          class="volume-bar"
          type="range"
          min="0"
          max="1"
          step="0.01"
          :value="volume"
          :style="{ '--progress': `${volume * 100}%` }"
          role="slider"
          aria-valuemin="0"
          aria-valuemax="1"
          :aria-valuenow="volume"
          aria-label="Volume control"
          @input="$emit('volumeChange', $event)"
        />

        <button
          :aria-label="isCaptions ? 'Hide captions' : 'Show captions'"
          @click="$emit('captionsToggle')"
        >
          <component :is="isCaptions ? CaptionsIcon : CaptionsOffIcon" />
        </button>

        <button
          :aria-label="isPiP ? 'Exit picture-in-picture' : 'Enter picture-in-picture'"
          @click="$emit('pipToggle')"
        >
          <component :is="isPiP ? ArrowOutUpLeft : PictureInPictureIcon" />
        </button>

        <button
          :aria-label="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
          @click="$emit('fullscreenToggle')"
        >
          <component :is="isFullscreen ? MinimizeIcon : MaximizeIcon" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: transparent;
  padding: 0 16px 8px;
  transition: opacity 0.3s ease;

  @media (max-width: 992px) {
    padding: 0 8px 8px;
  }

  @media (max-width: 768px) {
    padding: 0 4px 8px;
  }

  &.hidden {
    opacity: 0;
  }
}

.controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-light;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 8px;
    transition:
      background 0.2s ease,
      transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  svg {
    width: 24px;
    height: 24px;

    @media (max-width: 768px) {
      width: 18px;
      height: 18px;
    }
  }

  .time-display {
    color: $color-light;
    font-size: 14px;
    font-weight: 500;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 12px;
      font-weight: 400;
    }

    .end {
      @media (max-width: 580px) {
        display: none;
      }
    }
  }
}

.controls-group {
  display: flex;
  align-items: center;
  gap: 5px;
}

.seek-bar,
.volume-bar {
  position: relative;
  width: 100%;
  height: 8px;
  appearance: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  background: linear-gradient(
    to right,
    $color-accent var(--progress),
    rgba(255, 255, 255, 0.2) var(--progress)
  );

  &:hover {
    background: linear-gradient(
      to right,
      $color-accent var(--progress),
      rgba(255, 255, 255, 0.4) var(--progress)
    );
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: $color-light;
    transition: background 0.2s ease;
    position: relative;
    z-index: 1;
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: $color-light;
    border: none;
  }
}

.volume-bar {
  width: 80px;
  height: 6px;

  @media (max-width: 768px) {
    width: 70px;
  }

  @media (max-width: 568px) {
    width: 50px;
  }
}

.chapter {
  display: flex;
  align-items: center;
  color: $color-light;

  &-title {
    display: inline-block;
    max-width: 190px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
    margin: 0 5px;

    @media (max-width: 992px) {
      max-width: 180px;
    }

    @media (max-width: 768px) {
      max-width: 180px;
    }
  }

  button {
    padding: 0;
  }

  svg {
    width: 18px;
    height: 18px;
    margin-top: 2px;
  }
}

.chapter-title-wrap {
  @media (max-width: 568px) {
    display: none;
  }
}

.chapter-title-wrap-mb {
  display: none;

  @media (max-width: 568px) {
    display: block;
  }
}
</style>
