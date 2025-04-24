import type { Ref } from 'vue'

export function useVideoActions(
  videoRef: Ref<HTMLVideoElement | null | undefined>,
  videoWrapperRef: Ref<HTMLElement | null>,
  state: any,
) {
  const onPlay = () => {
    state.isPlaying.value = true
    state.isEnded.value = false
  }

  const onPause = () => {
    state.isPlaying.value = false
  }

  const onVideoLoaded = () => {
    state.isLoading.value = false
  }

  const onLoadedMetadata = () => {
    if (videoRef.value) {
      state.duration.value = videoRef.value.duration
    }
  }

  const onTimeUpdate = () => {
    if (videoRef.value) {
      state.currentTime.value = videoRef.value.currentTime
    }
  }

  const onSeek = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (videoRef.value) {
      videoRef.value.currentTime = parseFloat(target.value)
    }
  }

  const onVolumeChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    state.volume.value = parseFloat(target.value)
    if (videoRef.value) {
      videoRef.value.volume = state.volume.value

      if (state.volume.value === 0) {
        videoRef.value.muted = true
        state.isMuted.value = true
      } else {
        videoRef.value.muted = false
        state.isMuted.value = false
      }
    }
  }

  const onVideoEnded = () => {
    if (videoRef.value) {
      state.isEnded.value = true
      state.isPlaying.value = false
    }
  }

  const togglePlay = () => {
    const video = videoRef.value

    if (!video) return

    if (state.isEnded.value) {
      video.currentTime = 0
      video.play()
    } else if (state.isPlaying.value) {
      video.pause()
    } else {
      video.play()
    }
  }

  const toggleMute = () => {
    if (videoRef.value) {
      state.isMuted.value = !state.isMuted.value
      videoRef.value.muted = state.isMuted.value
    }
  }

  const toggleCaptions = () => {
    state.isCaptions.value = !state.isCaptions.value
  }

  const togglePiP = async () => {
    if (!videoRef.value) return

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture().then(() => {
          state.isPiP.value = false
        })
      } else {
        await videoRef.value.requestPictureInPicture().then(() => {
          state.isPiP.value = true
        })
      }
    } catch (error) {
      state.isPiP.value = false
      console.error('Picture-in-Picture error:', error)
    }
  }

  const toggleFullscreen = () => {
    const wrapper = videoWrapperRef.value

    if (!wrapper) return

    if (!state.isFullscreen.value) {
      wrapper.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return {
    onPlay,
    onPause,
    onVideoLoaded,
    onLoadedMetadata,
    onTimeUpdate,
    onSeek,
    onVolumeChange,
    onVideoEnded,
    togglePlay,
    toggleMute,
    toggleCaptions,
    togglePiP,
    toggleFullscreen,
  }
}
