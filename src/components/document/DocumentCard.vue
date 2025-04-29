<template>
    <BaseCard :title="truncatedSubject" :description="truncatedAuthor" @click="$emit('view-details')">
        <template #actions>
            <BaseButton class="btn btn-outline-light" @click="$emit('view')">
                View
            </BaseButton>
            <BaseButton class="btn btn-outline-warning" @click="$emit('update')">
                Update
            </BaseButton>
            <BaseButton class="btn btn-outline-danger" @click="$emit('delete')">
                Delete
            </BaseButton>
        </template>

        <div class="text-white mt-3">
            <strong>Locale:</strong> {{ document.locale || '—' }}
        </div>

        <div class="text-white mt-2">
            <strong>Content:</strong>
            <p class="mb-0">{{ truncatedContent }}</p>
        </div>
    </BaseCard>
</template>

<script setup>
    import { computed } from 'vue'
    import BaseCard from '@/components/base/BaseCard.vue'
    import BaseButton from '@/components/base/BaseButton.vue'

    defineProps({
        document: {
            type: Object,
            required: true
        }
    })

    defineEmits(['view-details'])

    const truncate = (text = '', max = 100) => text.length > max ? text.slice(0, max).trim() + '...' : text

    const truncatedSubject = computed(() => truncate(document.subject, 60))
    const truncatedAuthor = computed(() => truncate(document.author, 50))
    const truncatedContent = computed(() => truncate(document.content, 120))
</script>