<template>
    <BaseCard class="translator-card" :title="translator.name" :description="translator.email">
        <div class="d-flex justify-content-between text-white mt-3">
            <span><strong>From:</strong> {{ translator.source_language }}</span>
            <span><strong>To:</strong> {{ translator.target_language }}</span>
        </div>

        <template #actions>
            <BaseButton class="btn btn-outline-light" @click="$emit('view-documents')">
                View Documents
            </BaseButton>
            <BaseButton class="btn btn-outline-warning" @click="$emit('update')">
                Update
            </BaseButton>
            <BaseButton class="btn btn-outline-danger" @click="$emit('delete')">
                Delete
            </BaseButton>
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
        max-width: 500px;
    }
</style>