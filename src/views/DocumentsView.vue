<template>
    <div class="container mt-4 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
            <h2 class="text-white m-0">
                Documents <span v-if="author"> by {{ author }}</span>
            </h2>
            <BaseButton @click="showCreateModal = true">New Document</BaseButton>
        </div>
        
        <div class="flex-grow-1 overflow-y-auto mb-2">
            <div v-if="store.documents.length === 0" class="h3 text-white text-center mt-5">
                No Documents found, please insert them first by clicking on "New Document".
            </div>

            <div v-else class="overflow-y-auto d-flex flex-wrap justify-content-center gap-4 py-4">
                <DocumentCard
                    v-for="document in store.documents"
                    :key="document.id"
                    :document="document"
                    @view-details="openDetails(document)"
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

        <CreateDocumentModal 
            :visible="showCreateModal" 
            @close="showCreateModal = false"
            @created="handleCreated"
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
    import BaseButton from '@/components/base/BaseButton.vue'
    import CreateDocumentModal from '@/components/document/CreateDocumentModal.vue'
    import DocumentCard from '@/components/document/DocumentCard.vue'
    import DocumentDetailsModal from '@/components/document/DocumentDetailsModal.vue'
    import BasePagination from '@/components/base/BasePagination.vue'

    const route = useRoute()

    const showCreateModal = ref(false)
    const showDetailsModal = ref(false)
    const selectedDocument = ref(null)

    const author = computed(() => route.query.author || '')
    const locale = computed(() => route.query.locale || '')

    const store = useDocumentStore()
    const currentPage = ref(1)
    const pageSize = 9

    watch([author, locale], () => {
        currentPage.value = 1
        fetchDocuments()
    })

    const handlePageChange = (newPage) => {
        currentPage.value = newPage
        fetchDocuments()
    }

    const fetchDocuments = () => {
        store.fetchDocuments({
            page: currentPage.value - 1,
            size: pageSize,
            author: author.value || undefined,
            locale: locale.value || undefined,
            sort: 'createdAt,desc'
        })
    }

    const handleCreated = async (data, isCSV) => {
        try {
            await store.addDocument(data, isCSV)
            fetchDocuments()
        } catch (err) {
            console.error(err)
        } finally {
            showCreateModal.value = false
        }
    }

    const handleDelete = async (id) => {
        try {
            await store.removeDocument(id)
            fetchDocuments()
        } catch (err) {
            console.error(err)
        }
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