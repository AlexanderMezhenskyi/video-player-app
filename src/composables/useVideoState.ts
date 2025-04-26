import { ref } from 'vue'

export function useVideoState() {
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(0.5)
  const lastMouseMoveTime = ref(Date.now())
  const isLoading = ref(true)
  const isPlaying = ref(false)
  const isEnded = ref(false)
  const isMuted = ref(false)
  const isCaptions = ref(false)
  const isPiP = ref(false)
  const isFullscreen = ref(false)
  const isControlsVisible = ref(true)

  return {
    currentTime,
    duration,
    volume,
    lastMouseMoveTime,
    isLoading,
    isPlaying,
    isEnded,
    isMuted,
    isCaptions,
    isPiP,
    isFullscreen,
    isControlsVisible,
  }
}
