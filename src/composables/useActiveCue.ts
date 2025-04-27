import { computed, watch } from 'vue'
import type { Ref } from 'vue'
import type { TranscriptCue } from '@/types/types'

export function useActiveCue(
  currentTime: Ref<number>,
  cues: Ref<TranscriptCue[]>,
  activeCueIndex: Ref<number | null>,
  activeCue: Ref<TranscriptCue | null>,
) {
  const findActiveCueIndex = (time: number, cues: TranscriptCue[]): number | null => {
    for (let i = 0; i < cues.length; i++) {
      if (time >= cues[i].start && time <= cues[i].end) {
        return i
      }
    }
    return null
  }

  const computedActiveCueIndex = computed(() => {
    return findActiveCueIndex(currentTime.value, cues.value)
  })

  const computedActiveCue = computed(() => {
    return computedActiveCueIndex.value !== null ? cues.value[computedActiveCueIndex.value] : null
  })

  watch(computedActiveCueIndex, (newIndex) => {
    activeCueIndex.value = newIndex
  })

  watch(computedActiveCue, (cue) => {
    activeCue.value = cue
  })
}
