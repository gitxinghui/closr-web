import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const usePreviewStore = defineStore('preview', () => {
  const previewData = reactive({
    username: '',
    about: '',
    avatar: '',
    backgroundImage: ''
  })

  const updatePreviewData = (data: Partial<typeof previewData>) => {
    Object.assign(previewData, data)
  }

  return {
    previewData,
    updatePreviewData
  }
})
