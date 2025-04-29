<template>
    <BaseModal :visible="visible" :title="document?.subject || 'Document Details'" @close="$emit('close')">
        <div class="text-white">
            <p><strong>Author:</strong> {{ document.author }}</p>
            <p><strong>Locale:</strong> {{ document.locale || 'N/A' }}</p>
            <p><strong>Content:</strong></p>
            <div class="bg-dark p-3 rounded overflow-y-auto" style="max-height: 300px; white-space: pre-wrap;">
                {{ document.content }}
            </div>
        </div>
    </BaseModal>
</template>

<script setup>
    import BaseModal from '@/components/base/BaseModal.vue'

    defineProps({
        visible: Boolean,
        document: Object
    })

    defineEmits(['close'])
</script>
