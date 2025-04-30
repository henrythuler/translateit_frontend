<template>
    <BaseModal 
        :visible="visible" 
        title="New Translator" 
        @close="$emit('close')"
    >
        <form @submit.prevent="handleFormSubmit">
            <div class="mb-3">
                <label for="name" class="form-label text-white">Name</label>
                <input
                    id="name"
                    v-model="form.name"
                    class="form-control"
                    maxlength="100"
                />
            </div>

            <div class="mb-3">
                <label for="email" class="form-label text-white">Email</label>
                <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    maxlength="255"
                />
            </div>

            <div class="mb-3 d-flex align-items-end gap-2">
                <div class="flex-grow-1">
                    <label for="source" class="form-label text-white">Source Language</label>
                    <input
                        id="source"
                        v-model="form.source_language"
                        class="form-control"
                        maxlength="5"
                    />
                </div>
                <div class="flex-grow-1">
                    <label for="target" class="form-label text-white">Target Language</label>
                    <input
                        id="target"
                        v-model="form.target_language"
                        class="form-control"
                        maxlength="5"
                    />
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label text-white">Import from CSV</label>
                <input
                    type="file"
                    accept=".csv"
                    @change="handleCsv"
                    class="form-control"
                />
            </div>

            <div class="text-end">
                <button
                    :disabled="!isFormValid()"
                    type="submit"
                    class="btn btn-primary bg-orange border-0"
                >
                    Send
                </button>
            </div>
        </form>
    </BaseModal>
</template>

<script setup>
    import { ref, watch } from 'vue'
    import BaseModal from '@/components/base/BaseModal.vue'

    const props = defineProps({
        visible: Boolean
    })

    const emit = defineEmits(['close', 'created'])

    const form = ref({
        name: '',
        email: '',
        source_language: '',
        target_language: ''
    })

    const csvFile = ref(null)

    watch(() => props.visible, (newVal) => {
        if (newVal) {
            csvFile.value = null
        }
    })

    const handleFormSubmit = () => {
        if (!isFormValid()) {
            alert("Please fill all fields or upload a CSV file.")
            return
        }
        if (csvFile.value) {
            emit('created', csvFile.value, true)
            emit('close')
        } else {
            const translator = {
                name: form.value.name,
                email: form.value.email,
                sourceLanguage: form.value.source_language,
                targetLanguage: form.value.target_language
            }
            form.value = {
                name: '',
                email: '',
                source_language: '',
                target_language: ''
            }
            emit('created', translator, false)
        }
        emit('close')
    }

    const isFormValid = () => {
        const f = form.value
        return (
            csvFile.value || (f.name.trim() && f.email.trim() && f.source_language.trim() && f.target_language.trim())
        )
    }

    const handleCsv = (e) => {
        csvFile.value = e.target.files[0]
        if (!csvFile.value) return
    }
</script>

<style scoped>
    .bg-orange {
        background-color: #f96418 !important;
    }
</style>
