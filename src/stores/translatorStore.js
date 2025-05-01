import { defineStore } from 'pinia'
import {
    createTranslator,
    getAllTranslators,
    getTranslatorById,
    updateTranslator,
    deleteTranslator
} from '@/services/translatorService'

export const useTranslatorStore = defineStore('translator', {
    state: () => ({
        translators: [],
        total: 0,
        totalPages: 0,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchTranslators(params = {}) {
            try {
                this.loading = true
                const response = await getAllTranslators(params)
                this.translators = response.content || []
                this.total = response.page.totalElements || 0
                this.totalPages = response.page.totalPages
                this.error = null
            } catch (err) {
                this.error = `${err.message} Please, create them.`
                this.translators = []
            } finally {
                
                this.loading = false
            }
        },

        async addTranslator(data, isCSV) {
            return await createTranslator(data, isCSV)
        },

        async getTranslator(id) {
            return await getTranslatorById(id)
        },

        async editTranslator(id, data, isCSV) {
            return await updateTranslator(id, data, isCSV)
        },

        async removeTranslator(id) {
            return await deleteTranslator(id)
        }
    }
})