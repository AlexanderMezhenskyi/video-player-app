import type { Ref } from 'vue'
import { useVideoState } from '@/composables/useVideoState'
import { useVideoActions } from '@/composables/useVideoActions'
import { useFullscreenListener } from '@/composables/useFullscreenListener'
import { useControlsVisibility } from '@/composables/useControlsVisibility'
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts'

export function useVideoPlayer(
  videoRef: Ref<HTMLVideoElement | null | undefined>,
  videoWrapperRef: Ref<HTMLElement | null>,
) {
  const state = useVideoState()
  const actions = useVideoActions(videoRef, videoWrapperRef, state)

  useFullscreenListener(state.isFullscreen)
  useControlsVisibility(
    videoRef,
    state.isFullscreen,
    state.isControlsVisible,
    state.lastMouseMoveTime,
  )
  useKeyboardShortcuts(actions, state.volume, state.currentTime, state.duration)

  return { ...state, ...actions }
}
