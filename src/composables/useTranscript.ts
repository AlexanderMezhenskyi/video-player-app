import { onMounted } from 'vue'
import type { Ref } from 'vue'
import type { TranscriptCue } from '@/types/types.ts'

export function useTranscript(url: string, transcript: Ref<TranscriptCue[]>) {
  const fetchTranscript = async () => {
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const vttText = await response.text()
      transcript.value = parseVTT(vttText)
    } catch (error) {
      console.error('Failed to fetch transcript:', error)
    }
  }

  const parseVTT = (vtt: string): TranscriptCue[] => {
    const cues: TranscriptCue[] = []

    const lines = vtt.split('\n')
    let start = 0
    let end = 0
    let text = ''
    let parsingCue = false

    for (const line of lines) {
      if (line.trim() === '' || /^\d+$/.test(line.trim())) {
        continue
      }

      if (line.includes('-->')) {
        const [startTime, endTime] = line.split(' --> ')
        start = parseVttTime(startTime.trim())
        end = parseVttTime(endTime.trim())
        parsingCue = true
      } else if (parsingCue) {
        text = line.trim()
        cues.push({ start, end, text })
        parsingCue = false
      }
    }

    return cues
  }

  const parseVttTime = (timeString: string): number => {
    const cleanedTime = timeString.replace(',', '.')
    const parts = cleanedTime.split(':')

    if (parts.length === 3) {
      const [hours, minutes, seconds] = parts
      return +hours * 3600 + +minutes * 60 + parseFloat(seconds)
    } else if (parts.length === 2) {
      const [minutes, seconds] = parts
      return +minutes * 60 + parseFloat(seconds)
    } else {
      return parseFloat(parts[0])
    }
  }

  onMounted(fetchTranscript)
}
