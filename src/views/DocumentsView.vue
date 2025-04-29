<template>
    <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
            <h2 class="text-white m-0">
                Documents <span v-if="author"> by {{ author }}</span>
            </h2>
            <BaseButton @click="showCreateModal = true">New Document</BaseButton>
        </div>

        <div v-if="documents.length === 0" class="h3 text-white text-center mt-5">
            No Documents found, please insert them first by clicking on "New Document".
        </div>

        <div v-else class="row g-3">
            <div
                v-for="document in documents"
                :key="document.author"
                class="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
            >
                <DocumentCard :document="document" @view-details="openDetails(document)" />
            </div>
        </div>

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
    import { ref, computed } from 'vue'
    import { useRoute } from 'vue-router'
    import BaseButton from '@/components/base/BaseButton.vue'
    import CreateDocumentModal from '@/components/document/CreateDocumentModal.vue'

    const route = useRoute()

    const showCreateModal = ref(false)
    const showDetailsModal = ref(false)
    const selectedDocument = ref(null)

    const author = computed(() => route.query.author || '')
    const documents = ref([]) 

    const handleCreated = (newDocument) => {
        documents.value.push(newDocument)
    }

    const openDetails = (document) => {
        selectedDocument.value = document
        showDetailsModal.value = true
    }
</script>