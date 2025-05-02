<template>
    <TheHeader />
    <RouterView />
</template>

<script setup>
    import { RouterView } from 'vue-router'
    import TheHeader from '@/components/layout/TheHeader.vue'
</script>

<style>
    #app{
        max-height: 100vh;
        display: flex;
        flex-direction: column;
    }
</style>