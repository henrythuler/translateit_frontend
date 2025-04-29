<template>
    <TheHeader />
    <RouterView />
</template>

<script setup>
    import { RouterView } from 'vue-router'
    import TheHeader from '@/components/layout/TheHeader.vue'
</script>

<style>
    body{
        height: 100vh;
        background-color: #080808;
    }
</style>