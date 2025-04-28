<template>
    <component
      :is="tag"
      :to="to"
      :href="href"
      class="btn custom-btn"
      v-bind="$attrs"
    >
      <slot />
    </component>
</template>
  
<script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    to: String,
    href: String,
  })
  
  //Verifying what type of button will it be
  const tag = computed(() => {
    if (props.to) return 'router-link'
    if (props.href) return 'a'
    return 'button'
  })
</script>
  
<style scoped>
  .custom-btn {
    border-color: #f96418;
    color: #f96418;
  }
  .custom-btn:hover {
    background-color: #f96418;
    color: #ffffff;
  }
</style>