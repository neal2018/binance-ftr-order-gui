<template>
  <button
    class="flex-grow m-1 px-1 py-2 text-md text-gray-100 font-semibold rounded-lg shadow-md"
    sm="flex-grow-0 px-6 py-4 my-10 text-base"
    bg="hover:purple-700 active:purple-600"
    :class="props.color === 'red' ? 'bg-red-500' : 'bg-green-500'"
  >
    {{ msg }}
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
