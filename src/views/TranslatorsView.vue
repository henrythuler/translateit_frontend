<template>
    <div class="text-black">Translators</div>
    <TranslatorCard :translator="{name: 'Test', email: 'test@email.com', source_language: 'pt_BR', target_language: 'en_US'}" />
</template>

<script setup>
    import TranslatorCard from '@/components/translator/TranslatorCard.vue'
</script>