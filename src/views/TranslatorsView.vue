<template>
    <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h2 class="text-white m-0">Translators</h2>
            <BaseButton @click="showCreateModal = true">New Translator</BaseButton>
        </div>

        <div v-if="translators.length === 0" class="text-white text-center h2 mt-5">
            No Translators found, please insert them first.
        </div>

        <div v-else class="d-flex flex-wrap justify-content-center gap-4">
            <TranslatorCard
                v-for="translator in translators"
                :key="translator.email"
                :translator="translator"
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
    import { ref } from 'vue'
    import TranslatorCard from '@/components/translator/TranslatorCard.vue'
    import BaseButton from '@/components/base/BaseButton.vue'
    import CreateTranslatorModal from '@/components/translator/CreateTranslatorModal.vue'

    const showCreateModal = ref(false)

    const translators = ref([
        {
            name: 'Test',
            email: 'test@email.com',
            source_language: 'pt_BR',
            target_language: 'en_US'
        },
        {
            name: 'Test',
            email: 'test@email.com',
            source_language: 'pt_BR',
            target_language: 'en_US'
        },
        {
            name: 'Test',
            email: 'test@email.com',
            source_language: 'pt_BR',
            target_language: 'en_US'
        },
        {
            name: 'Test',
            email: 'test@email.com',
            source_language: 'pt_BR',
            target_language: 'en_US'
        },
        {
            name: 'Test',
            email: 'test@email.com',
            source_language: 'pt_BR',
            target_language: 'en_US'
        },
        {
            name: 'Test',
            email: 'test@email.com',
            source_language: 'pt_BR',
            target_language: 'en_US'
        }
    ])

    const handleCreated = (data) => {
        console.log('Created:', data)
    }
</script>
