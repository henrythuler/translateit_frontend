<template>
    <BaseModal 
        :visible="visible" 
        title="Insert Translator" 
        @close="$emit('close')"
    >
        <form @submit.prevent="handleFormSubmit">
            <div class="mb-3">
                <label for="name" class="form-label text-white">Name</label>
                <input id="name" v-model="form.name" class="form-control" required />
            </div>

            <div class="mb-3">
                <label for="email" class="form-label text-white">Email</label>
                <input id="email" v-model="form.email" type="email" class="form-control" required />
            </div>

            <div class="mb-3 d-flex gap-2">
                <div class="flex-grow-1">
                    <label for="source" class="form-label text-white">Source Language</label>
                    <input id="source" v-model="form.source_language" class="form-control" required />
                </div>
                <div class="flex-grow-1">
                    <label for="target" class="form-label text-white">Target Language</label>
                    <input id="target" v-model="form.target_language" class="form-control" required />
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label text-white">Import from CSV</label>
                <input type="file" accept=".csv" @change="handleCsv" class="form-control" />
            </div>

            <div class="text-end">
                <button type="submit" class="btn btn-primary bg-orange border-0">
                    Create Translator
                </button>
            </div>
        </form>
    </BaseModal>
</template>

<script setup>
    import { ref } from 'vue'
    import BaseModal from '@/components/base/BaseModal.vue'

    defineProps({
        visible: Boolean
    })

    const emit = defineEmits(['close', 'created'])

    const form = ref({
        name: '',
        email: '',
        source_language: '',
        target_language: ''
    })

    const handleFormSubmit = () => {
        // TODO: validate and send request
        emit('created', { ...form.value })
        emit('close')
    }

    const handleCsv = (e) => {
        const file = e.target.files[0]
        if (!file) return
        // TODO: Read CSV and send request
    }
</script>

<style scoped>
    .bg-orange {
        background-color: #f96418 !important;
    }
</style>
