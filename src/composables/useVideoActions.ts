import type { Ref } from 'vue'
import type { Chapter } from '@/types/types.ts'

export function useVideoActions(
  videoRef: Ref<HTMLVideoElement | null | undefined>,
  videoWrapperRef: Ref<HTMLElement | null>,
  state: Record<string, Ref<any>>,
) {
  const onPlay = () => {
    state.isPlaying.value = true
    state.isEnded.value = false
  }

  const onPause = () => {
    state.isPlaying.value = false
  }

  const onVideoLoaded = () => {
    state.isVideoLoading.value = false
  }

  const onVideoError = () => {
    state.isVideoLoading.value = false
    state.isBuffering.value = false
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

  const onSeek = (valueOrEvent: Event | number) => {
    if (!videoRef.value) return

    let time: number

    if (typeof valueOrEvent === 'number') {
      time = valueOrEvent
    } else {
      const target = valueOrEvent.target as HTMLInputElement
      time = parseFloat(target.value)
    }

    videoRef.value.currentTime = time

    const chapters = [...state.chapters.value]
    state.currentTime.value = time
    state.currentChapter.value = chapters.reverse().find((chapter: Chapter) => chapter.time <= time)
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

  const onBuffering = () => {
    if (videoRef.value) {
      state.isBuffering.value = true
    }
  }

  const onPlaying = () => {
    if (videoRef.value) {
      state.isBuffering.value = false
    }
  }

  const togglePlay = () => {
    const video = videoRef.value

    if (!video) return

    if (state.isEnded.value) {
      video.currentTime = 0
      state.currentChapter.value = state.chapters.value[0]
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
    const video = videoRef.value

    if (!video) return

    try {
      if (document.pictureInPictureElement === video) {
        await document.exitPictureInPicture()
        state.isPiP.value = false
      } else {
        await video.requestPictureInPicture()
        state.isPiP.value = true
      }
    } catch (error) {
      console.error('Picture-in-Picture error:', error)
      state.isPiP.value = document.pictureInPictureElement === video
    }
  }

  const toggleFullscreen = () => {
    const wrapper = videoWrapperRef.value

    if (!wrapper) return

    if (!document.fullscreenElement) {
      wrapper.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
      })
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to disable full-screen mode: ${err.message} (${err.name})`)
      })
    }
  }

  const toggleChapters = () => {
    const video = videoRef.value

    if (!video) return

    state.isChapters.value = !state.isChapters.value
  }

  const toggleTranscript = () => {
    state.isTranscript.value = !state.isTranscript.value
  }

  return {
    onPlay,
    onPause,
    onVideoLoaded,
    onVideoError,
    onLoadedMetadata,
    onTimeUpdate,
    onSeek,
    onVolumeChange,
    onVideoEnded,
    onBuffering,
    onPlaying,
    togglePlay,
    toggleMute,
    toggleCaptions,
    togglePiP,
    toggleFullscreen,
    toggleChapters,
    toggleTranscript,
  }
}
