import { onMounted } from 'vue'
import type { Ref } from 'vue'
import type { Chapter } from '@/types/types.ts'

export function useChapters(
  xmlUrl: string,
  chapters: Ref<Chapter[]>,
  currentChapter: Ref<Chapter>,
) {
  const fetchChapters = async () => {
    try {
      const response = await fetch(xmlUrl)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const xmlText = await response.text()
      const parser = new DOMParser()
      const xml = parser.parseFromString(xmlText, 'application/xml')

      const eventStream = xml.querySelector(
        'EventStream[value="chapters"][schemeIdUri="urn:mpeg:dash:event:2012"]',
      )

      if (!eventStream) return []

      const events = Array.from(eventStream.getElementsByTagName('Event'))

      chapters.value = events.map((event) => ({
        title: event.getAttribute('title') ?? 'Untitled',
        time: Number(event.getAttribute('presentationTime')) / 1000,
      }))
      currentChapter.value = chapters.value[0]
    } catch (error) {
      console.error('Failed to fetch chapters:', error)
    }
  }

  onMounted(fetchChapters)
}
