export function formatDuration(seconds: number): string {
  const fullMinutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${String(fullMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')
  return `${minutes}:${secs}`
}
