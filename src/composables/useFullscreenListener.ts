import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export function useFullscreenListener(isFullscreen: Ref<boolean>) {
  const onFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement
  }

  onMounted(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange)
  })

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', onFullscreenChange)
  })
}
