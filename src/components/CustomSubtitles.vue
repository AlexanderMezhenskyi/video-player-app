<script setup lang="ts">
import type { TranscriptCue } from '@/types/types'

defineProps<{
  activeCue: TranscriptCue | null
  isFullscreen: boolean
}>()
</script>

<template>
  <div v-if="activeCue" class="custom-subtitles">
    <div class="custom-subtitles-text">{{ activeCue.text }}</div>
  </div>
</template>

<style scoped lang="scss">
.custom-subtitles {
  position: absolute;
  bottom: 20%;
  width: 100%;
  pointer-events: none;
  user-select: none;

  .full-screen & {
    bottom: 10%;
  }

  &-text {
    width: 50%;
    font-size: 16px;
    font-weight: 500;
    color: $color-light;
    background: rgba(0, 0, 0, 0.7);
    border-radius: $border-radius-md;
    padding: 5px 20px;
    margin: 0 auto;
    text-align: center;

    .full-screen & {
      font-size: 18px;
    }
  }

  @media (max-width: 600px) {
    width: 80%;
    font-size: 16px;
    padding: 5px 16px;

    .full-screen & {
      font-size: 16px;
    }
  }
}
</style>
