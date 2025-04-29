<template>
    <teleport to="body">
        <transition name="fade">
            <div v-if="visible" class="modal-shadow d-flex justify-content-center align-items-center" @click.self="emit('close')">
                <div class="modal-box container-sm p-4 rounded">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="modal-title text-white m-0">{{ title }}</h5>
                        <button class="btn-close btn-close-white" @click="emit('close')"></button>
                    </div>

                    <div class="modal-body text-white">
                        <slot />
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup>
    defineProps({
        title: String,
        visible: Boolean
    })

    const emit = defineEmits(['close'])
</script>

<style scoped>
    .modal-shadow {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 999;
    }

    .modal-box {
        background-color: #1d1d1d;
        width: 100%;
        max-width: 600px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
