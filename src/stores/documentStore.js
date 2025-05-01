import { defineStore } from 'pinia'
import {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
} from '@/services/documentService'

export const useDocumentStore = defineStore('document', {
    state: () => ({
        documents: [],
        total: 0,
        totalPages: 0,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchDocuments(params = {}) {
            try {
                this.loading = true
                const response = await getAllDocuments(params)
                this.documents = response.content || []
                this.total = response.page.totalElements || 0
                this.totalPages = response.page.totalPages
                this.error = null
            } catch (err) {
                this.error = `${err.message} Please, create them.`
                this.documents = []
            } finally {
                this.loading = false
            }
        },

        async addDocument(data, isCSV = false) {
            return await createDocument(data, isCSV)
        },

        async getDocument(id) {
            return await getDocumentById(id)
        },

        async editDocument(id, data, isCSV = false) {
            return await updateDocument(id, data, isCSV)
        },

        async removeDocument(id) {
            return await deleteDocument(id)
        }
    }
})