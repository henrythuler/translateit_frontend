<template>
    <BaseCard class="document-card" :title="truncate(document.subject, 35)" :description="truncate(document.author, 35)">
        <template #actions>
            <BaseButton class="btn btn-outline-light w-100" @click="$emit('view-details')">
                View
            </BaseButton>
            <BaseButton class="btn btn-outline-warning w-100" @click="$emit('update')">
                Update
            </BaseButton>
            <BaseButton class="btn btn-outline-danger w-100" @click="$emit('delete')">
                Delete
            </BaseButton>
        </template>

        <div class="text-white">
            <strong>Content:</strong>
            <p class="mb-0">{{ truncate(document.content, 200) }}</p>
        </div>

        <div class="text-white mt-3">
            <strong>Locale:</strong> {{ document.locale || '—' }}
        </div>

    </BaseCard>
</template>

<script setup>
    import BaseCard from '@/components/base/BaseCard.vue'
    import BaseButton from '@/components/base/BaseButton.vue'

    defineProps({
        document: {
            type: Object,
            required: true
        }
    })

    defineEmits(['view-details'])

    const truncate = (text = '', max) => {
        return text.length > max ? text.slice(0, max).trim() + '...' : text
    }
</script>

<style scoped>
    .document-card {
        width: 100%;
        max-width: 400px;
        max-height: 350;
    }
</style>