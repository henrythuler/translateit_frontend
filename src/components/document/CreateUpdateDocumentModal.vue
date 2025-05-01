<template>
    <BaseModal
        :visible="visible"
        :title="(isEdit ? 'Edit Document' : isEditCsv ? 'Edit Documents from CSV' : 'New Document')"
        @close="$emit('close')"
    >
        <form @submit.prevent="handleFormSubmit">
            <div v-show="!isEditCsv">
                <div class="mb-3">
                    <label for="subject" class="form-label text-white">Subject</label>
                    <input
                        id="subject"
                        v-model="form.subject"
                        class="form-control"
                        maxlength="255"
                    />
                </div>

                <div class="mb-3">
                    <label for="content" class="form-label text-white">Content</label>
                    <textarea
                        id="content"
                        v-model="form.content"
                        class="form-control"
                        rows="5"
                        maxlength="1000"
                    ></textarea>
                </div>

                <div class="mb-3">
                    <label for="locale" class="form-label text-white">Locale (Optional)</label>
                    <input
                        id="locale"
                        v-model="form.locale"
                        class="form-control"
                        maxlength="5"
                    />
                </div>

                <div class="mb-3">
                    <label for="author" class="form-label text-white">Author (Email)</label>
                    <input
                        id="author"
                        v-model="form.author"
                        type="email"
                        class="form-control"
                        maxlength="255"
                    />
                </div>
            </div>

            <div v-show="!isEdit || isEditCsv" class="mb-3">
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
    import { useToast } from 'vue-toastification'
    import BaseModal from '@/components/base/BaseModal.vue'

    const props = defineProps({
        visible: Boolean,
        isEdit: Boolean,
        isEditCsv: Boolean,
        initialData: Object,
    })

    const emit = defineEmits(['close', 'created', 'updated'])

    const form = ref({
        subject: '',
        content: '',
        locale: '',
        author: '',
    })

    const toast = useToast()
    const csvFile = ref(null)
    const submitting = ref(false)

    watch(() => props.visible, (newVal) => {
        if (newVal) {
            form.value = props.initialData ? {...props.initialData} : form.value
            csvFile.value = null
        }
    })
    
    const handleFormSubmit = () => {
        if (!isFormValid()) {
            toast.warning('Please fill all fields or upload a CSV file.')
            return
        }

        submitting.value = true
        
        try {
            if (csvFile.value) {
                if(props.isEditCsv){
                    emit('updated', csvFile.value, true)
                }else{
                    emit('created', csvFile.value, true)
                }
            } else {
                const document = {
                    subject: form.value.subject,
                    content: form.value.content,
                    locale: form.value?.locale || "",
                    author: form.value.author
                }
                if (props.isEdit){
                    emit('updated', document, false)
                }else{
                    emit('created', document, false)
                }
            }
        } catch (err) {
            toast.error(`${err}`)
        } finally {
            form.value = {
                subject: '',
                content: '',
                locale: '',
                author: '',
            }
            submitting.value = false
            emit('close')
        }
    }

    const isFormValid = () => {
        const f = form.value
        return (csvFile.value || (f.subject.trim() && f.content.trim() && f.author.trim()))
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

    textarea {
        resize: none;
    }
</style>