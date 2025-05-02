<template>
    <header class="px-3 py-2 p-sm-2">
        <nav class="navbar container d-flex justify-content-between align-items-center">

            <router-link class="navbar-brand text-white" to="/">
                <h1 class="m-0 fs-1">TranslateIt</h1>
            </router-link>

            <!-- Desktop Navigation -->
            <div class="d-none d-md-flex gap-3">
                <BaseButton to="/translators">Translators</BaseButton>
                <BaseButton to="/documents">Documents</BaseButton>
            </div>

            <!-- Mobile Menu Icon -->
            <button
                class="navbar-toggler d-md-none text-white border-0"
                type="button"
                @click="toggleMenu"
            >
                <font-awesome-icon :icon="['fas', 'bars']" size="lg" />
            </button>
        </nav>

        <!-- Mobile Menu -->
        <Transition name="slide">
            <div v-if="isMenuOpen" class="mobile-menu">
                <button
                    class="close-button text-white border-0"
                    @click="toggleMenu"
                >
                    <font-awesome-icon :icon="['fas', 'times']" size="2x" />
                </button>

                <ul class="menu-list">
                    <li class="menu-item">
                        <BaseButton @click="isMenuOpen = false" to="/translators">Translators</BaseButton>
                    </li>
                    <li class="menu-item">
                        <BaseButton @click="isMenuOpen = false" to="/documents">Documents</BaseButton>
                    </li>
                </ul>
            </div>
        </Transition>
    </header>
</template>

<script setup>
    import { ref } from 'vue'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import BaseButton from '@/components/base/BaseButton.vue'

    const isMenuOpen = ref(false)

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
    }
</script>

<style scoped>
    header {
        background-color: #080808;
        border-bottom: 2px solid #1d1d1d;
        position: relative;
    }

    .mobile-menu {
        position: fixed;
        top: 0;
        right: 0;
        max-width: 200px;
        height: 100vh;
        background-color: #080808;
        border-left: 1px solid #1d1d1d;
        z-index: 999;
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }

    .close-button {
        align-self: flex-end;
        background: none;
    }

    .menu-list {
        list-style: none;
        padding: 0;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .menu-item {
        text-align: center;
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.3s ease-in-out;
    }

    .slide-enter-from {
        transform: translateX(100%);
    }

    .slide-enter-to {
        transform: translateX(0);
    }

    .slide-leave-from {
        transform: translateX(0);
    }

    .slide-leave-to {
        transform: translateX(100%);
    }
</style>