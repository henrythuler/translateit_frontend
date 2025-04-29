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

        <div v-else class="d-flex flex-wrap justify-content-center gap-4 py-4">
            <DocumentCard
                v-for="document in documents"
                :key="document.author"
                :document="document"
                @view-details="openDetails(document)"
            />
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
    import { ref, computed, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import BaseButton from '@/components/base/BaseButton.vue'
    import CreateDocumentModal from '@/components/document/CreateDocumentModal.vue'
    import DocumentCard from '@/components/document/DocumentCard.vue'
    import DocumentDetailsModal from '@/components/document/DocumentDetailsModal.vue'

    const route = useRoute()

    const showCreateModal = ref(false)
    const showDetailsModal = ref(false)
    const selectedDocument = ref(null)

    const author = computed(() => route.query.author || '')
    const documents = ref([]) 

    const fetchDocuments = async () => {
        //Mock
        try {
            documents.value = [
                {
                    subject: 'Introdução à Localização',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in fermentum tellus. Donec volutpat ipsum metus, eget finibus quam malesuada quis. Nullam sollicitudin massa efficitur porttitor vestibulum. In id felis quis dolor scelerisque fringilla id nec libero. Aliquam dapibus dapibus tortor lacinia dapibus. In et fermentum metus, mollis fringilla dolor. Sed et felis quis urna finibus consectetur. Ut hendrerit justo non quam mollis rhoncus. Morbi ut vestibulum diam. Aliquam erat volutpat. Donec quis hendrerit orci. Vivamus eget magna condimentum dui sodales efficitur. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque rhoncus velit tellus, a semper est pharetra quis. Fusce rhoncus, massa feugiat commodo blandit, metus urna porttitor sapien, sit amet convallis ex metus ut sem. Nunc vel scelerisque nisl. Vivamus sodales et dolor vel molestie. Suspendisse lobortis varius massa id mattis. Sed lectus turpis, fringilla nec lectus eu, imperdiet pellentesque mi. Aenean bibendum eu elit quis semper. Donec est est, accumsan eu ex sit amet, ullamcorper laoreet est. Vivamus porta nunc vitae libero lacinia, at ultricies turpis vehicula. Integer laoreet metus iaculis, accumsan felis ac, hendrerit enim. Maecenas in sapien sit amet mauris elementum tristique at vel ligula. Phasellus suscipit sed tortor condimentum dictum. Mauris dictum mauris.',
                    locale: 'pt-BR',
                    author: 'fulano1@bureauworks.com',
                },
            ]
        } catch (err) {
            console.error('Failed to fetch documents', err)
        }
    }

    const handleCreated = (newDocument) => {
        documents.value.push(newDocument)
    }

    const openDetails = (document) => {
        selectedDocument.value = document
        showDetailsModal.value = true
    }

    onMounted(() => {
        fetchDocuments()
    })
</script>