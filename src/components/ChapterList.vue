<script setup lang="ts">
import CloseIcon from '@/components/Icons/CloseIcon.vue'
import Loader from '@/components/Loader.vue'
import { formatTime } from '@/utils/helpers.ts'
import type { Chapter } from '@/types/types.ts'
import chapter1 from '@/assets/chapters/chapter1.png'
import chapter2 from '@/assets/chapters/chapter2.png'
import chapter3 from '@/assets/chapters/chapter3.png'
import chapter4 from '@/assets/chapters/chapter4.png'
import chapter5 from '@/assets/chapters/chapter5.png'

const chapterImages = [chapter1, chapter2, chapter3, chapter4, chapter5]

defineProps<{
  chapters: Chapter[]
  isChapters: boolean
  isChaptersLoading: boolean
}>()

defineEmits<{
  (e: 'seek', time: number): void
  (e: 'chaptersToggle'): void
}>()
</script>

<template>
  <div class="chapters">
    <div class="chapters-title">
      <h2>Chapters</h2>
      <button aria-label="Close chapter list" @click="$emit('chaptersToggle')">
        <CloseIcon />
      </button>
    </div>
    <div class="chapter-list-wrap">
      <Loader v-if="isChaptersLoading" />
      <div v-else class="chapter-list">
        <template v-if="chapters.length > 0">
          <button
            v-for="(chapter, index) in chapters"
            :key="index"
            class="chapter-item"
            type="button"
            @click="$emit('seek', chapter.time)"
            @keydown.enter="$emit('seek', chapter.time)"
            @keydown.space.prevent="$emit('seek', chapter.time)"
          >
            <img :src="chapterImages[index]" :alt="chapter.title" class="chapter-image" />
            <span class="chapter-content">
              <span class="chapter-title">{{ chapter.title }}</span>
              <span class="chapter-time">{{ formatTime(chapter.time) }}</span>
            </span>
          </button>
        </template>
        <template v-else>
          <div class="empty">No chapters available</div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chapters {
  margin: 0 0 24px;
  background: $color-light;
  border: 1px solid $color-light;
  border-radius: 30px 30px 12px 12px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
}

.chapter-list-wrap {
  position: relative;
  min-height: 200px;
  border-radius: 30px 30px 12px 12px;
}

.chapter-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.chapters-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 16px;
  background: $color-accent;
  border-radius: 30px 30px 0 0;
  color: $color-light;

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
}

.chapter-item {
  width: 100%;
  display: flex;
  align-items: center;
  font: inherit;
  cursor: pointer;
  padding: 8px;
  border: none;
  border-radius: $border-radius-md;
  white-space: nowrap;
  background: transparent;
  text-align: left;
  transition: background 0.3s ease;

  &:hover,
  &:focus {
    background: rgba($color-accent-light, 0.2);
    outline: none;
  }
}

.chapter-image {
  width: 80px;
  height: 45px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.chapter-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
}

.chapter-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: normal;
}

.chapter-time {
  font-size: 12px;
  color: $color-accent;
}

.empty {
  text-align: center;
}
</style>
