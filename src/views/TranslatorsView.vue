<template>
    <div class="container mt-4 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-3">
            <h2 class="text-white m-0">Translators</h2>
            <div class="d-flex gap-3">
                <BaseButton @click="openCreateModal">New Translator</BaseButton>
                <BaseButton @click="openEditModal(null, true)" :disabled="isTranslatorsEmpty">Update from CSV</BaseButton>
            </div>
        </div>

        <div class="flex-grow-1 overflow-y-auto mb-2">
            <div v-if="store.loading" class="d-flex justify-content-center align-items-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div v-else class="overflow-y-auto d-flex flex-wrap justify-content-center gap-4 py-4">
                <TranslatorCard
                    v-for="translator in store.translators"
                    :key="translator.id"
                    :translator="translator"
                    @view-documents="seeTranslatorDocuments(translator)"
                    @update="openEditModal(translator, false)"
                    @delete="openDeleteModal(translator.id)"
                />
            </div>
        </div>

        <Pagination
            :currentPage="currentPage"
            :totalPages="store.totalPages"
            :pageSize="pageSize"
            @update:page="handlePageChange"
        />

        <CreateUpdateTranslatorModal
            :visible="showModal"
            :isEdit="isEditMode"
            :isEditCsv="isEditCsv"
            :initialData="selectedTranslator"
            @close="showModal = false"
            @created="handleCreated"
            @updated="handleUpdated"
        />

        <ConfirmDeleteModal
            :visible="showDeleteModal"
            entityType="translator"
            :loading="isDeleting"
            @close="showDeleteModal = false"
            @confirm="handleDelete"
        />
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useTranslatorStore } from '@/stores/translatorStore'
    import { useDocumentStore } from '@/stores/documentStore'
    import { useToast } from 'vue-toastification'
    import BaseButton from '@/components/base/BaseButton.vue'
    import TranslatorCard from '@/components/translator/TranslatorCard.vue'
    import CreateUpdateTranslatorModal from '@/components/translator/CreateUpdateTranslatorModal.vue'
    import ConfirmDeleteModal from '@/components/layout/ConfirmDeleteModal.vue'
    import Pagination from '@/components/layout/Pagination.vue'

    const route = useRoute()
    const router = useRouter()
    const store = useTranslatorStore()
    const documentStore = useDocumentStore()
    const toast = useToast()

    const showModal = ref(false)
    const selectedTranslator = ref(null)
    const isEditMode = ref(false)
    const isEditCsv = ref(false)
    const isTranslatorsEmpty = ref(false)
    const showDeleteModal = ref(false)
    const isDeleting = ref(false)
    const deletingId = ref(null)

    const email = computed(() => route.query.email || '')

    const currentPage = ref(1)
    const pageSize = 9

    const handlePageChange = (newPage) => {
        currentPage.value = newPage
        store.fetchTranslators({
            page: newPage - 1,
            size: pageSize,
            sort: ['createdAt,desc', 'name,asc'],
            email: email.value
        })
    }

    const fetchTranslators = async () => {
        await store.fetchTranslators({
            page: currentPage.value - 1,
            size: pageSize,
            sort: ['createdAt,desc', 'name,asc'],
            email: email.value
        })
        isTranslatorsEmpty.value = false
        if (store.error) {
            isTranslatorsEmpty.value = true
            toast(`${store.error}`)
        }
    }

    const handleCreated = async (data, isCSV = false) => {
        try {
            await store.addTranslator(data, isCSV)
            toast.success("Translator(s) created!")
            fetchTranslators()
        } catch (err) {
            toast.error(`${err.message}`)
        } finally {
            showModal.value = false
        }
    }

    const handleUpdated = async (data, isCSV) => {
        try{
            let id = null
            if (!isCSV) {
                id = selectedTranslator.value?.id
                if (!id) throw new Error('No id has been passed!')
            }
            await store.editTranslator(id, data, isCSV)
            toast.success("Translator(s) updated!")
            fetchTranslators()
        } catch (err) {
            toast.error(`${err.message}`)
        } finally {
            showModal.value = false
        }
    }

    const handleDelete = async () => {
        try {
            await store.removeTranslator(deletingId.value)
            toast.success("Translator deleted!")
            fetchTranslators()
            await documentStore.fetchDocuments({
                page: 0,
                size: pageSize,
                author: undefined,
                locale: undefined,
                sort: ['createdAt,desc', 'author,asc'],
            })
        } catch (err) {
            toast.error(`${err.message}`)
        } finally {
            isDeleting.value = false
            deletingId.value = null
            showDeleteModal.value = false
        }
    }

    const openCreateModal = () => {
        isEditMode.value = false
        isEditCsv.value = false
        selectedTranslator.value = null
        showModal.value = true
    }

    const openEditModal = (translator, isCsv) => {
        if(isCsv){
            isEditCsv.value = true
            isEditMode.value = false
        }else{
            isEditMode.value = true
            isEditCsv.value = false
            selectedTranslator.value = translator
        }
        showModal.value = true
    }

    const openDeleteModal = (id) => {
        deletingId.value = id
        showDeleteModal.value = true
    }

    const seeTranslatorDocuments = (translator) => {
        router.push({
            name: 'Documents',
            query: {
                author: translator.email
            }
        })
    }

    onMounted(() => {
        fetchTranslators()
    })
</script>

<style scoped>
    .container {
        height: calc(100vh - 170px);
    }
</style>