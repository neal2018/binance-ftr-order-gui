<template>
  <button
    class="text-md text-gray-100 font-semibold rounded-lg shadow-md"
    sm="text-base"
    bg="hover:purple-700 active:purple-600"
    :class="props.color === 'red' ? 'bg-red-500' : 'bg-green-500'"
  >
    {{ msg }} <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
const props = defineProps({
  msg: String,
  color: String
})
</script>

<style scoped></style>
