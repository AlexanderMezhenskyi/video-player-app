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
import { formatTime } from '@/utils/helpers.ts'

const props = defineProps<{
  isPlaying: boolean
  isEnded: boolean
  isMuted: boolean
  isCaptions: boolean
  isPiP: boolean
  isFullscreen: boolean
  currentTime: number
  duration: number
  volume: number
}>()

defineEmits<{
  (e: 'playPause'): void
  (e: 'muteToggle'): void
  (e: 'captionsToggle'): void
  (e: 'pipToggle'): void
  (e: 'fullscreenToggle'): void
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
  <div class="controls">
    <input
      class="seek-bar"
      type="range"
      min="0"
      :max="duration"
      step="0.1"
      v-model="seekValue"
      :style="{ '--progress': `${(seekValue / duration) * 100}%` }"
      @input="$emit('seek', $event)"
    />

    <div class="controls-row">
      <div class="controls-group controls-group-left">
        <button @click="$emit('playPause')">
          <component :is="isEnded ? RepeatIcon : isPlaying ? PauseIcon : PlayIcon" />
        </button>

        <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      </div>

      <div class="controls-group controls-group-right">
        <button @click="$emit('muteToggle')">
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
          @input="$emit('volumeChange', $event)"
        />

        <button @click="$emit('captionsToggle')">
          <component :is="isCaptions ? CaptionsIcon : CaptionsOffIcon" />
        </button>

        <button @click="$emit('pipToggle')">
          <component :is="isPiP ? ArrowOutUpLeft : PictureInPictureIcon" />
        </button>

        <button @click="$emit('fullscreenToggle')">
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
  background: rgba(0, 0, 0, 0.2);
  padding: 0 16px 8px;
}

.controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    transition:
      background 0.2s ease,
      transform 0.2s ease;

    svg {
      width: 24px;
      height: 24px;
      color: $color-light;
    }

    &:hover {
      background: $color-controls-light;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  span {
    color: $color-light;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
}

.controls-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.seek-bar {
  width: 100%;
}

.volume-bar {
  width: 80px;
}

.seek-bar,
.volume-bar {
  appearance: none;
  height: 5px;
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  background: linear-gradient(
    to right,
    $color-controls-light var(--progress),
    rgba(255, 255, 255, 0.2) var(--progress)
  );

  &:hover {
    background: linear-gradient(
      to right,
      $color-controls-light var(--progress),
      rgba(255, 255, 255, 0.4) var(--progress)
    );
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: $color-controls-light;
    transition: background 0.2s ease;
    position: relative;
    z-index: 1;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: $color-controls-light;
    border: none;
  }
}
</style>
