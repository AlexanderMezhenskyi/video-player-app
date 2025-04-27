<script setup lang="ts">
import { formatTime } from '@/utils/helpers.ts'
import type { Chapter } from '@/types/types.ts'

defineProps<{
  chapters: Chapter[]
  isChapters: boolean
}>()

defineEmits<{
  (e: 'seek', time: number): void
}>()
</script>

<template>
  <div class="chapter-list">
    <h2>Chapters</h2>
    <button
      v-for="(chapter, index) in chapters"
      :key="index"
      class="chapter-item"
      @click="$emit('seek', chapter.time)"
      type="button"
    >
      <span class="chapter-time">{{ formatTime(chapter.time) }}</span>
      <span class="chapter-title">{{ chapter.title }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.chapter-list {
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 0 auto 24px;
  gap: 8px;
  padding: 16px 0;
  text-align: left;
  background: $color-light;
  border-radius: $border-radius-lg;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  opacity: 1;
  transition: opacity 0.3s ease;

  &[style*='display: none'] {
    opacity: 0;
  }

  @media (max-width: 992px) {
    width: 100%;
  }
}

h2 {
  padding: 0 24px;
}

.chapter-item {
  width: 100%;
  display: flex;
  align-items: center;
  font: inherit;
  cursor: pointer;
  padding: 4px 24px;
  border-radius: $border-radius-md;
  white-space: nowrap;
  background: none;
  border: none;
  text-align: left;

  &:hover,
  &:focus {
    background: rgba($color-accent-light, 0.2);
    outline: none;
  }
}

.chapter-time {
  color: $color-accent;
  margin-right: 5px;
}
</style>
