<template>
  <select
    class="
      mx-4
      py-3
      px-4
      flex-grow
      rounded-lg
      appearance-none
      focus:outline-none
      bg-gray-700
      text-white
      cursor-pointer
      hover:bg-purple-700
    "
  >
    <option v-for="msg in props.msgs" :key="msg" class="bg-gray-700">{{ msg }}</option>
  </select>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
const props =
  defineProps<{
    msgs: string[]
  }>()
</script>

<style scoped></style>
