<template>
    <div class="container mt-4 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
            <h2 class="text-white m-0 text-break">
                Documents <span v-if="author"> by {{ author }}</span>
            </h2>
            <div class="d-flex gap-3">
                <BaseButton @click="openCreateModal" :disabled="isCreateTranslatorEnabled">New Document</BaseButton>
                <BaseButton @click="openEditModal(null, true)" :disabled="isCreateTranslatorEnabled || isDocumentsEmpty">Update from CSV</BaseButton>
                <div v-if="createDisabled">
                    <BaseButton @click="openCreateTranslatorModal">Create Translators!</BaseButton>
                    <CreateUpdateTranslatorModal 
                        :visible="showCreateTranslatorModal"
                        :isEdit="false"
                        :isEditCsv="false"
                        :initialData="null"
                        @close="showCreateTranslatorModal = false"
                        @created="handleCreatedTranslator"
                    />
                </div>
            </div>
        </div>
        
        <div class="flex-grow-1 overflow-y-auto mb-2">
            <div v-if="store.loading" class="d-flex justify-content-center align-items-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div v-else class="overflow-y-auto d-flex flex-wrap justify-content-center gap-4 py-4">
                <DocumentCard
                    v-for="document in store.documents"
                    :key="document.id"
                    :document="document"
                    @view-details="openDetails(document)"
                    @update="openEditModal(document, false)"
                    @delete="handleDelete(document.id)"
                />
            </div>
        </div>

        <BasePagination
            :currentPage="currentPage"
            :totalPages="store.totalPages"
            :pageSize="pageSize"
            @update:page="handlePageChange"
        />

        <CreateUpdateDocumentModal 
            :visible="showModal"
            :isEdit="isEditMode"
            :isEditCsv="isEditCsv"
            :initialData="selectedDocument"
            @close="showModal = false"
            @created="handleCreated"
            @updated="handleUpdated"
        />

        <DocumentDetailsModal
            :visible="showDetailsModal"
            :document="selectedDocument"
            @close="showDetailsModal = false"
        />
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import { useDocumentStore } from '@/stores/documentStore'
    import { useTranslatorStore } from '@/stores/translatorStore'
    import { useToast } from 'vue-toastification'
    import BaseButton from '@/components/base/BaseButton.vue'
    import CreateUpdateDocumentModal from '@/components/document/CreateUpdateDocumentModal.vue'
    import CreateUpdateTranslatorModal from '@/components/translator/CreateUpdateTranslatorModal.vue'
    import DocumentCard from '@/components/document/DocumentCard.vue'
    import DocumentDetailsModal from '@/components/document/DocumentDetailsModal.vue'
    import BasePagination from '@/components/base/BasePagination.vue'

    const route = useRoute()
    const toast = useToast()
    const store = useDocumentStore()
    const translatorStore = useTranslatorStore()

    const currentPage = ref(1)
    const pageSize = 9
    const showModal = ref(false)
    const showDetailsModal = ref(false)
    const showCreateTranslatorModal = ref(false)
    const selectedDocument = ref(null)
    const isEditMode = ref(false)
    const isEditCsv = ref(false)
    const isCreateTranslatorEnabled = ref(false)
    const isDocumentsEmpty = ref(false)

    const author = computed(() => route.query.author || '')
    const locale = computed(() => route.query.locale || '')

    watch([author, locale], () => {
        currentPage.value = 1
        fetchDocuments()
    })

    const handlePageChange = (newPage) => {
        currentPage.value = newPage
        fetchDocuments()
    }

    const fetchDocuments = async () => {
        await translatorStore.fetchTranslators({
            page: 0,
            size: pageSize,
            sort: 'createdAt,desc',
        })
        if (translatorStore.translators.length === 0) {
            toast('There is no Translators, you should create them before creating a Document!', { timeout: 5000 })
            isCreateTranslatorEnabled.value = true
            isDocumentsEmpty.value = true
            return
        } else {
            isCreateTranslatorEnabled.value = false
        }
        await store.fetchDocuments({
            page: currentPage.value - 1,
            size: pageSize,
            author: author.value || undefined,
            locale: locale.value || undefined,
            sort: 'createdAt,desc'
        })
        isDocumentsEmpty.value = false
        if (store.error) {
            isDocumentsEmpty.value = true
            toast(`${store.error}`)
        }
    }

    const handleCreated = async (data, isCSV) => {
        try {
            await store.addDocument(data, isCSV)
            toast.success("Document(s) created!")
            await fetchDocuments()
        } catch (err) {
            toast.error(`${err.message}`)
        } finally {
            showModal.value = false
        }
    }

    const handleCreatedTranslator = async (data, isCSV = false) => {
        try {
            await translatorStore.addTranslator(data, isCSV)
            toast.success("Translator(s) created!")
            translatorStore.fetchTranslators({
                page: 0,
                size: pageSize,
                sort: 'createdAt,desc',
            })
            isCreateTranslatorEnabled.value = false
        } catch (err) {
            toast.error(`${err.message}`)
        } finally {
            showCreateTranslatorModal.value = false
        }
    }

    const handleUpdated = async (data, isCSV) => {
        try{
            let id = null
            if (!isCSV) {
                id = selectedDocument.value?.id
                if (!id) throw new Error('No id has been passed!')
            }
            await store.editDocument(id, data, isCSV)
            toast.success("Document(s) updated!")
            fetchDocuments()
        } catch (err) {
            toast.error(`${err.message}`)
        } finally {
            showModal.value = false
        }
    }

    const handleDelete = async (id) => {
        try {
            await store.removeDocument(id)
            toast.success("Document deleted!")
            fetchDocuments()
        } catch (err) {
            toast.error(`${err.message}`)
        }
    }

    const openCreateModal = () => {
        isEditMode.value = false
        isEditCsv.value = false
        selectedDocument.value = null
        showModal.value = true
    }

    const openCreateTranslatorModal = () => {
        showCreateTranslatorModal.value = true
    }

    const openEditModal = (document, isCsv) => {
        if(isCsv){
            isEditCsv.value = true
            isEditMode.value = false
        }else{
            isEditMode.value = true
            isEditCsv.value = false
            selectedDocument.value = document
        }
        showModal.value = true
    }

    const openDetails = (document) => {
        selectedDocument.value = document
        showDetailsModal.value = true
    }

    onMounted(() => {
        fetchDocuments()
    })
</script>

<style scoped>
    .container {
        height: calc(100vh - 135px);
    }
</style>