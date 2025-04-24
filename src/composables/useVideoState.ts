import { ref } from 'vue'

export function useVideoState() {
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(0.5)
  const seekValue = ref(0)
  const isLoading = ref(true)
  const isPlaying = ref(false)
  const isEnded = ref(false)
  const isMuted = ref(false)
  const isCaptions = ref(false)
  const isPiP = ref(false)
  const isFullscreen = ref(false)

  return {
    currentTime,
    duration,
    volume,
    seekValue,
    isLoading,
    isPlaying,
    isEnded,
    isMuted,
    isCaptions,
    isPiP,
    isFullscreen,
  }
}
