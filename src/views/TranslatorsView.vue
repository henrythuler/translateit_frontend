<template>
    <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-3">
            <h2 class="text-white m-0">Translators</h2>
            <BaseButton @click="showCreateModal = true">New Translator</BaseButton>
        </div>

        <div v-if="translators.length === 0" class="text-white text-center h3 mt-5">
            No Translators found, please insert them first by clicking on "New Translator".
        </div>

        <div v-else class="d-flex flex-wrap justify-content-center gap-4 py-4">
            <TranslatorCard
                v-for="translator in translators"
                :key="translator.email"
                :translator="translator"
                @view-documents="seeTranslatorDocuments(translator)"
            />
        </div>

        <CreateTranslatorModal
            :visible="showCreateModal"
            @close="showCreateModal = false"
            @created="handleCreated"
        />
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import TranslatorCard from '@/components/translator/TranslatorCard.vue'
    import CreateTranslatorModal from '@/components/translator/CreateTranslatorModal.vue'
    import BaseButton from '@/components/base/BaseButton.vue'
    //import api from '@/services/api'

    const router = useRouter()
    const translators = ref([])
    const showCreateModal = ref(false)

    const fetchTranslators = async () => {
        //Mock
        try {
            translators.value = [
                // {
                //     name: 'Fulano Silva',
                //     email: 'fulano1@bureauworks.com',
                //     source_language: 'en_US',
                //     target_language: 'es_ES',
                // },
                // {
                //     name: 'Fulano Souza',
                //     email: 'fulano2@bureauworks.com',
                //     source_language: 'pt_BR',
                //     target_language: 'fr_FR',
                // },
            ]
        } catch (err) {
            console.error('Failed to fetch translators', err)
        }
    }

    const handleCreated = (newTranslators) => {
        for (const t of newTranslators){
            translators.value.push(t)
        }
        showCreateModal.value = false
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
