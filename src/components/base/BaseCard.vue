<template>
    <div class="base-card p-3 rounded-3 text-white">
        <div class="card-header d-flex justify-content-between align-items-start">
            <div class="card-info">
                <h3 class="card-title">{{ title }}</h3>
                <p v-if="description" class="card-description">{{ description }}</p>
            </div>

            <div class="card-actions d-flex flex-column align-items-end gap-2">
                <slot name="actions" />
            </div>
        </div>

        <div v-if="$slots.default" class="card-content mt-3">
            <slot />
        </div>
    </div>
</template>

<script setup>
    defineProps({
        title: { type: String, required: true },
        description: { type: String, default: '' }
    })
</script>

<style scoped>
    .base-card {
        border: 2px solid #f96418;
        background-color: transparent;
        min-height: 180px;
    }

    .card-title {
        font-size: 1.5rem;
    }

    .card-description {
        font-size: 1rem;
        color: #cccccc;
    }

    .card-actions .actions {
        width: 100%;
    }
</style>