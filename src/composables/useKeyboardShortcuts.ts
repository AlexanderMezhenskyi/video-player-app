import { onBeforeUnmount, onMounted } from 'vue'
import type { Ref } from 'vue'

export function useKeyboardShortcuts(
  actions: Record<string, Function>,
  volume: Ref<number>,
  currentTime: Ref<number>,
  duration: Ref<number>,
): void {
  function handleKeyboardShortcuts(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
      case 'k':
        event.preventDefault()
        actions.togglePlay()
        break
      case 'j':
      case 'ArrowLeft':
        event.preventDefault()
        actions.onSeek(Math.max(currentTime.value - 10, 0))
        break
      case 'l':
      case 'ArrowRight':
        event.preventDefault()
        actions.onSeek(Math.min(currentTime.value + 10, duration.value))
        break
      case 'm':
        event.preventDefault()
        actions.toggleMute()
        break
      case 'ArrowUp':
        event.preventDefault()
        const newVolumeUp = Math.min(volume.value + 0.1, 1)
        actions.onVolumeChange({ target: { value: newVolumeUp } })
        break
      case 'ArrowDown':
        event.preventDefault()
        const newVolumeDown = Math.max(volume.value - 0.1, 0)
        actions.onVolumeChange({ target: { value: newVolumeDown } })
        break
      case 'f':
        event.preventDefault()
        actions.toggleFullscreen()
        break
      case 'c':
        event.preventDefault()
        actions.toggleCaptions()
        break
      default:
        break
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyboardShortcuts)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyboardShortcuts)
  })
}
