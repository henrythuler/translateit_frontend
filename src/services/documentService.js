import api from './api'

export const createDocument = async (data, isCSV) => {
    try {
        if (isCSV) {
            const formData = new FormData()
            formData.append('file', data)
            const response = await api.post('/documents/upload/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return response.data
        } else {
            const response = await api.post('/documents/create', data)
            return response.data
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || error.response?.data || 'Failed to create document')
    }
}

export const getAllDocuments = async (params = {}) => {
    try {
        const response = await api.get('/documents', { params })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || error.response?.data || 'Failed to fetch documents')
    }
}

export const getDocumentById = async (id) => {
    try {
        const response = await api.get(`/documents/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || error.response?.data || 'Failed to fetch document')
    }
}

export const updateDocument = async (id, data, isCSV = false) => {
    try {
        if (isCSV) {
            const formData = new FormData()
            formData.append('file', data)
            const response = await api.put('/documents/upload/update', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return response.data
        } else {
            const response = await api.put(`/documents/update/${id}`, data)
            return response.data
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || error.response?.data || 'Failed to update document')
    }
}

export const deleteDocument = async (id) => {
    try {
        const response = await api.delete(`/documents/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || error.response?.data || 'Failed to delete document')
    }
}