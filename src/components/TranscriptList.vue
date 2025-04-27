<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
import ChevronUpIcon from '@/components/Icons/ChevronUpIcon.vue'
import ChevronDownIcon from '@/components/Icons/ChevronDownIcon.vue'
import Loader from '@/components/Loader.vue'
import type { TranscriptCue } from '@/types/types.ts'
import { formatTime } from '@/utils/helpers.ts'

const props = defineProps<{
  activeCueIndex: number | null
  transcript: TranscriptCue[]
  isTranscript: boolean
  isTranscriptLoading: boolean
}>()

defineEmits<{
  (e: 'seek', time: number): void
  (e: 'transcriptToggle'): void
}>()

const { activeCueIndex } = toRefs(props)
const cueRefs = ref<HTMLElement[]>([])
const transcriptList = ref<HTMLDivElement | null>(null)

const SCROLL_OFFSET = 20
const SCROLL_INACTIVE_DELAY = 2000

let isUserScrolling = ref(false)
let scrollTimeoutId: number | null = null

const onUserScroll = () => {
  isUserScrolling.value = true

  if (scrollTimeoutId !== null) {
    clearTimeout(scrollTimeoutId)
  }

  scrollTimeoutId = window.setTimeout(() => {
    isUserScrolling.value = false
  }, SCROLL_INACTIVE_DELAY)
}

watch(activeCueIndex, (newIndex) => {
  if (
    !isUserScrolling.value &&
    newIndex !== null &&
    cueRefs.value[newIndex] &&
    transcriptList.value
  ) {
    const container = transcriptList.value
    const activeElement = cueRefs.value[newIndex]

    const elementTop = activeElement.offsetTop
    const scrollPosition = elementTop - SCROLL_OFFSET

    container.scrollTo({
      top: scrollPosition >= 0 ? scrollPosition : 0,
      behavior: 'smooth',
    })
  }
})

onMounted(() => {
  transcriptList.value?.addEventListener('scroll', onUserScroll)
})

onBeforeUnmount(() => {
  transcriptList.value?.removeEventListener('scroll', onUserScroll)

  if (scrollTimeoutId !== null) {
    clearTimeout(scrollTimeoutId)
  }
})
</script>

<template>
  <div class="transcript" role="list">
    <div class="transcript-title">
      <h2>Full Transcript</h2>
      <button
        :aria-label="isTranscript ? 'Hide transcript list' : 'Show transcript list'"
        @click="$emit('transcriptToggle')"
      >
        <component :is="isTranscript ? ChevronUpIcon : ChevronDownIcon" />
      </button>
    </div>
    <div class="transcript-list-wrap">
      <Loader v-if="isTranscriptLoading" />
      <Transition v-else name="accordion">
        <div v-show="isTranscript">
          <div v-if="transcript.length > 0" ref="transcriptList" class="transcript-list">
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
          <div v-else class="empty">No transcript available</div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.transcript {
  background: $color-light;
  border: 1px solid $color-light;
  border-radius: 30px 30px 12px 12px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
}

h2 {
  padding-left: 8px;
}

.transcript-list-wrap {
  position: relative;
  min-height: 200px;
  border-radius: 30px 30px 12px 12px;
}

.transcript-list {
  position: relative;
  max-height: 200px;
  overflow-y: auto;
  padding: 16px;
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

.transcript-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 16px;
  background: $color-accent;
  border-radius: 30px 30px 0 0;

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

h2 {
  color: $color-light;
}

.accordion-enter-active,
.accordion-leave-active {
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  max-height: 200px;
  opacity: 1;
}

.empty {
  padding: 16px;
  text-align: center;
}
</style>
