import type { Ref } from 'vue'
import { useVideoState } from '@/composables/useVideoState'
import { useVideoActions } from '@/composables/useVideoActions'
import { useFullscreenListener } from '@/composables/useFullscreenListener'

export function useVideoPlayer(
  videoRef: Ref<HTMLVideoElement | null | undefined>,
  videoWrapperRef: Ref<HTMLElement | null>,
) {
  const state = useVideoState()
  const actions = useVideoActions(videoRef, videoWrapperRef, state)

  useFullscreenListener(state.isFullscreen)

  return { ...state, ...actions }
}
