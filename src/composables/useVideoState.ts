import { ref } from 'vue'
import type { Chapter } from '@/types/types.ts'
import type { TranscriptCue } from '@/types/types'

export function useVideoState() {
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(0.5)
  const lastMouseMoveTime = ref(Date.now())
  const chapters = ref<Chapter[]>([])
  const currentChapter = ref<Chapter>({ time: 0, title: '' })
  const transcript = ref<TranscriptCue[]>([])
  const activeCueIndex = ref<number | null>(null)
  const activeCue = ref<TranscriptCue | null>(null)
  const isLoading = ref(true)
  const isPlaying = ref(false)
  const isEnded = ref(false)
  const isMuted = ref(false)
  const isCaptions = ref(false)
  const isPiP = ref(false)
  const isFullscreen = ref(false)
  const isControlsVisible = ref(true)
  const isChapters = ref(false)

  return {
    currentTime,
    duration,
    volume,
    lastMouseMoveTime,
    chapters,
    currentChapter,
    transcript,
    activeCueIndex,
    activeCue,
    isLoading,
    isPlaying,
    isEnded,
    isMuted,
    isCaptions,
    isPiP,
    isFullscreen,
    isControlsVisible,
    isChapters,
  }
}
