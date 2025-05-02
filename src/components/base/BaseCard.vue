<template>
    <div class="base-card p-3 rounded-3 text-white d-flex flex-column justify-content-center align-items-center justify-content-md-between align-items-md-center">
        <div class="card-header d-flex flex-column justify-content-between align-items-center w-100">
            <div class="card-info text-center text-md-start mb-1 mb-md-0 w-100">
                <h3 class="card-title mb-1">{{ title }}</h3>
                <p v-if="description" class="card-description">{{ description }}</p>
            </div>

            <div class="card-actions d-flex flex-column flex-md-row gap-2 justify-items-center align-items-center mt-1 mt-md-0 w-100">
                <slot name="actions" />
            </div>
        </div>

        <div v-if="$slots.default" class="card-content mt-3 w-100">
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
        word-break: break-word;
    }

    .card-info {
        width: 100%;
    }

    .card-actions {
        width: 100%;
    }

    .card-description {
        font-size: 1rem;
        color: #cccccc;
        word-break: break-all;
    }

    .card-content{
        word-break: break-word;
    }

    .card-actions .actions {
        width: 100%;
    }
</style>