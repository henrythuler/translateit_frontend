<template>
    <BaseModal
        :visible="visible"
        title="Confirm Deletion"
        @close="$emit('close')"
    >
        <div class="text-white mb-4">
            Are you sure you want to delete this {{ entityType }}? This action cannot be undone.
            <strong class="fs-5" v-show="entityType === 'translator'">WARNING: All of the associated documents will be deleted as well!</strong>
        </div>

        <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-secondary" @click="$emit('close')">Cancel</button>
            <button class="btn btn-danger" @click="$emit('confirm')">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Delete
            </button>
        </div>
    </BaseModal>
</template>

<script setup>
    import BaseModal from '../base/BaseModal.vue';

    defineProps({
        visible: Boolean,
        entityType: {
            type: String,
            default: ''
        },
        loading: Boolean
    })

    defineEmits(['close', 'confirm'])
</script>
