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
        loading: false,
        error: null,
    }),

    actions: {
        async fetchTranslators(params = {}) {
            try {
                this.loading = true
                const response = await getAllTranslators(params)
                this.translators = response.content || []
                this.total = response.totalElements || 0
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },

        async addTranslator(data, isCSV = false) {
            return await createTranslator(data, isCSV)
        },

        async getTranslator(id) {
            return await getTranslatorById(id)
        },

        async editTranslator(id, data, isCSV = false) {
            return await updateTranslator(id, data, isCSV)
        },

        async removeTranslator(id) {
            return await deleteTranslator(id)
        }
    }
})