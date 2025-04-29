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
            <!-- Documents List -->
        </div>

        <CreateDocumentModal 
            :visible="showCreateModal" 
            @close="showCreateModal = false"
            @created="handleCreated"
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

    const author = computed(() => route.query.author || '')
    const documents = ref([]) 

    function handleCreated(newDocument) {
        documents.value.push(newDocument)
    }
</script>