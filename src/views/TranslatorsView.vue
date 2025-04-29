<template>
    <div class="text-black">Translators</div>
    <TranslatorCard :translator="{name: 'Test', email: 'test@email.com', source_language: 'pt_BR', target_language: 'en_US'}" />
    <BaseModal :visible="showModal" title="Test" @close="hideModal">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rutrum tellus nec enim elementum posuere. In accumsan iaculis lacus. Praesent a nisl eu dolor sollicitudin malesuada. Phasellus sapien ligula, fermentum id vehicula a, luctus sed lorem. Sed diam ipsum, euismod ac diam eu, scelerisque sagittis nisl. Vestibulum ut diam elit. Aenean dignissim leo turpis, et aliquet libero varius vitae. Nullam mollis id nibh consequat imperdiet. Phasellus non mollis quam. Ut ex nisl, hendrerit et feugiat eu, vehicula quis eros. Nunc commodo, ligula nec tincidunt consequat, nibh est maximus nisl, rhoncus lacinia nibh dolor convallis sem. Curabitur est lorem, maximus vitae lorem nec, fringilla lobortis nibh. Nulla facilisi. Vivamus non elit feugiat, bibendum nisl quis, pulvinar ipsum. Proin non est rutrum, facilisis tellus sed, egestas metus. Nunc lobortis rhoncus arcu.</p>
    </BaseModal>
</template>

<script setup>
    import { ref } from 'vue'
    import TranslatorCard from '@/components/translator/TranslatorCard.vue'
    import BaseModal from '@/components/base/BaseModal.vue'

    const showModal = ref(true)

    function hideModal(){
        showModal.value = false
    }
</script>