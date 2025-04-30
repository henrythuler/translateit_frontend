<template>
    <BaseCard class="translator-card" :title="translator.name" :description="translator.email">
        <div class="d-flex justify-content-between text-white mt-3 w-100">
            <span><strong>From:</strong> {{ translator.sourceLanguage }}</span>
            <span><strong>To:</strong> {{ translator.targetLanguage }}</span>
        </div>

        <template #actions>
            <div class="d-flex flex-column flex-md-row gap-2 w-100">
                <BaseButton class="btn btn-outline-light w-100" @click="$emit('view-documents')">
                    Documents
                </BaseButton>
                <BaseButton class="btn btn-outline-warning w-100" @click="$emit('update')">
                    Update
                </BaseButton>
                <BaseButton class="btn btn-outline-danger w-100" @click="$emit('delete')">
                    Delete
                </BaseButton>
            </div>
        </template>
    </BaseCard>
</template>

<script setup>
    import BaseCard from '@/components/base/BaseCard.vue'
    import BaseButton from '@/components/base/BaseButton.vue'

    defineProps({
        translator: {
            type: Object,
            required: true
        }
    })

    defineEmits(['update', 'delete', 'view-documents'])
</script>

<style scoped>
    .translator-card {
        width: 100%;
        max-width: 420px;
    }
</style>