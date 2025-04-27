<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import type { TranscriptCue } from '@/types/types.ts'
import { formatTime } from '@/utils/helpers.ts'

const props = defineProps<{
  activeCueIndex: number | null
  transcript: TranscriptCue[]
}>()

defineEmits<{
  (e: 'seek', time: number): void
}>()

const { activeCueIndex } = toRefs(props)
const cueRefs = ref<HTMLElement[]>([])
const transcriptList = ref<HTMLDivElement | null>(null)

watch(activeCueIndex, (newIndex) => {
  if (newIndex !== null && cueRefs.value[newIndex]) {
    cueRefs.value[newIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
})
</script>

<template>
  <div ref="transcriptList" class="transcript-list" role="list">
    <h2>Full Transcript</h2>
    <div
      v-for="(cue, index) in transcript"
      :key="index"
      :ref="(el) => (cueRefs[index] = el)"
      :class="['transcript-line', { active: index === activeCueIndex }]"
      role="listitem"
      tabindex="0"
      :aria-current="index === activeCueIndex ? 'true' : undefined"
      @click="$emit('seek', cue.start)"
      @keydown.enter="$emit('seek', cue.start)"
      @keydown.space.prevent="$emit('seek', cue.start)"
    >
      <span class="transcript-time">{{ formatTime(cue.start) }}</span>
      <span>{{ cue.text }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.transcript-list {
  width: 800px;
  max-height: 200px;
  overflow-y: auto;
  padding: 16px;
  margin: 0 auto;
  background: $color-light;
  border-radius: $border-radius-lg;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  scroll-behavior: smooth;
}

h2 {
  padding-left: 8px;
}

.transcript-line {
  padding: 6px 8px;
  cursor: pointer;
  border-radius: $border-radius-sm;
  transition: background 0.2s;

  &.active {
    background: rgba($color-accent-light, 0.7);
    color: $color-light;
    font-weight: bold;

    .transcript-time {
      color: $color-light;
    }
  }

  &:hover {
    background: rgba($color-accent-light, 0.2);
  }
}

.transcript-time {
  color: $color-accent;
  margin-right: 5px;
}
</style>
