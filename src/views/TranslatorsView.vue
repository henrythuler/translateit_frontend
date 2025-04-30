<template>
    <div class="container mt-4 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-3">
            <h2 class="text-white m-0">Translators</h2>
            <BaseButton @click="showCreateModal = true">New Translator</BaseButton>
        </div>

        <div class="flex-grow-1 overflow-y-auto mb-2">
            <div v-if="store.translators.length === 0" class="text-white text-center h3 mt-5">
                No Translators found, please insert them first by clicking on "New Translator".
            </div>

            <div v-else class="overflow-y-auto d-flex flex-wrap justify-content-center gap-4 py-4">
                <TranslatorCard
                    v-for="translator in store.translators"
                    :key="translator.id"
                    :translator="translator"
                    @view-documents="seeTranslatorDocuments(translator)"
                    @delete="handleDelete(translator.id)"
                />
            </div>
        </div>

        <BasePagination
            :currentPage="currentPage"
            :totalPages="store.totalPages"
            :pageSize="pageSize"
            @update:page="handlePageChange"
        />

        <CreateTranslatorModal
            :visible="showCreateModal"
            @close="showCreateModal = false"
            @created="handleCreated"
        />
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useTranslatorStore } from '@/stores/translatorStore'
    import BaseButton from '@/components/base/BaseButton.vue'
    import TranslatorCard from '@/components/translator/TranslatorCard.vue'
    import CreateTranslatorModal from '@/components/translator/CreateTranslatorModal.vue'
    import BasePagination from '@/components/base/BasePagination.vue'

    const route = useRoute()
    const router = useRouter()
    const store = useTranslatorStore()

    const showCreateModal = ref(false)
    // const showDetailsModal = ref(false)
    // const selectedTranslator = ref(null)

    const email = computed(() => route.query.email || '')
    const currentPage = ref(1)
    const pageSize = 9

    const handlePageChange = (newPage) => {
        currentPage.value = newPage
        store.fetchTranslators({
            page: newPage - 1,
            size: pageSize,
            sort: 'createdAt,desc',
            email: email.value
        })
    }

    // const openDetails = (translator) => {
    //     selectedTranslator.value = translator
    //     showDetailsModal.value = true
    // }

    const fetchTranslators = () => {
        store.fetchTranslators({
            page: currentPage.value - 1,
            size: pageSize,
            sort: 'createdAt,desc',
            email: email.value
        })
    }

    const handleCreated = async (data, isCSV = false) => {
        try {
            await store.addTranslator(data, isCSV)
            fetchTranslators()
        } catch (err) {
            console.error(err)
        } finally {
            showCreateModal.value = false
        }
    }

    const handleDelete = async (id) => {
        try {
            await store.removeTranslator(id)
            fetchTranslators()
        } catch (err) {
            console.error(err)
        }
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