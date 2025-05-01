import api from './api'

export const createTranslator = async (data, isCSV) => {
    try {
        if (isCSV) {
            const formData = new FormData()
            formData.append('file', data)
            const response = await api.post('/translators/upload/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return response.data
        } else {
            const response = await api.post('/translators/create', data)
            return response.data
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || error.response?.data || 'Failed to create translator')
    }
}

export const getAllTranslators = async (params = {}) => {
    try {
        const response = await api.get('/translators', { params })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || error.response?.data || 'Failed to fetch translators')
    }
}

export const getTranslatorById = async (id) => {
    try {
        const response = await api.get(`/translators/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || error.response?.data || 'Failed to fetch translator')
    }
}

export const updateTranslator = async (id, data, isCSV = false) => {
    try {
        if (isCSV) {
            const formData = new FormData()
            formData.append('file', data)
            const response = await api.put('/translators/upload/update', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return response.data
        } else {
            const response = await api.put(`/translators/update/${id}`, data)
            return response.data
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || error.response?.data || 'Failed to update translator')
    }
}

export const deleteTranslator = async (id) => {
    try {
        const response = await api.delete(`/translators/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || error.response?.data || 'Failed to delete translator')
    }
}