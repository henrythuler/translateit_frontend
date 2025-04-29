<template>
    <BaseModal
        :visible="visible"
        title="New Document"
        @close="$emit('close')"
    >
        <form @submit.prevent="handleFormSubmit">
            <div class="mb-3">
                <label for="subject" class="form-label text-white">Subject</label>
                <input
                    id="subject"
                    v-model="form.subject"
                    class="form-control"
                    maxlength="255"
                    required
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
                    required
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
                    required
                />
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
    import { ref } from 'vue'
    import BaseModal from '@/components/base/BaseModal.vue'

    defineProps({
        visible: Boolean,
    })

    const emit = defineEmits(['close', 'created'])

    const form = ref({
        subject: '',
        content: '',
        locale: '',
        author: '',
    })

    const csvFile = ref(null)

    const handleFormSubmit = () => {
        if (!isFormValid()) {
            alert('Please fill all fields or upload a CSV file.')
            return
        }
        // TODO: send request
        if (csvFile.value) {
            emit('created', { csv: csvFile.value })
        } else {
            const document = {
                subject: form.value.subject,
                content: form.value.content,
                locale: form.value.locale ? form.value.content : "",
                author: form.value.author
            }
            emit('created', document)
        }
        emit('close')
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