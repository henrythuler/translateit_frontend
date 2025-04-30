<template>
    <BaseModal 
        :visible="visible" 
        :title="(isEdit ? 'Edit' : 'New') + ' Translator'"
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
                        v-model="form.sourceLanguage"
                        class="form-control"
                        maxlength="5"
                    />
                </div>
                <div class="flex-grow-1">
                    <label for="target" class="form-label text-white">Target Language</label>
                    <input
                        id="target"
                        v-model="form.targetLanguage"
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
        visible: Boolean,
        isEdit: Boolean,
        initialData: Object,
    })

    const emit = defineEmits(['close', 'created', 'updated'])

    const form = ref({
        name: '',
        email: '',
        source_language: '',
        target_language: ''
    })

    const csvFile = ref(null)

    watch(() => props.visible, (newVal) => {
        if (newVal) {
            form.value = props.initialData ? {...props.initialData} : form.value
            csvFile.value = null
        }
    })

    const handleFormSubmit = () => {
        if (!isFormValid()) {
            alert("Please fill all fields or upload a CSV file.")
            return
        }
        if (csvFile.value) {
            if(props.isEdit){
                emit('updated', csvFile.value, true)
            }else{
                emit('created', csvFile.value, true)
            } 
        } else {
            const translator = {
                name: form.value.name,
                email: form.value.email,
                sourceLanguage: form.value.sourceLanguage,
                targetLanguage: form.value.targetLanguage
            }
            form.value = {
                name: '',
                email: '',
                sourceLanguage: '',
                targetLanguage: ''
            }
            if (props.isEdit){
                emit('updated', translator, false)
            } else {
                emit('created', translator, false)
            }
        }
        emit('close')
    }

    const isFormValid = () => {
        const f = form.value
        return (
            csvFile.value || (f.name.trim() && f.email.trim() && f.sourceLanguage.trim() && f.targetLanguage.trim())
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
