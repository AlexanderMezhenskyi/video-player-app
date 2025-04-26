import { onMounted, onUnmounted, watch } from 'vue'
import type { Ref } from 'vue'

export function useControlsVisibility(
  videoRef: Ref<HTMLVideoElement | null | undefined>,
  isFullscreen: Ref<boolean>,
  isControlsVisible: Ref<boolean>,
  lastMouseMoveTime: Ref<number>,
) {
  const edgeThreshold = 10

  const handleMouseMove = (event: MouseEvent) => {
    lastMouseMoveTime.value = Date.now()

    if (!videoRef.value) return

    if (!isFullscreen.value) {
      isControlsVisible.value = true
      return
    }

    const { clientX } = event
    const { width } = videoRef.value.getBoundingClientRect()

    isControlsVisible.value = !(clientX < edgeThreshold || clientX > width - edgeThreshold)
  }

  const checkInactivity = () => {
    const now = Date.now()
    const elapsed = now - lastMouseMoveTime.value

    if (elapsed > 2000 && isFullscreen.value) {
      isControlsVisible.value = false
    }
  }

  const interval = setInterval(checkInactivity, 500)

  watch(isFullscreen, (value) => {
    if (!value) {
      isControlsVisible.value = true
    }
  })

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
  })

  onUnmounted(() => {
    clearInterval(interval)
    window.removeEventListener('mousemove', handleMouseMove)
  })
}
