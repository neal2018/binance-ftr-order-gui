<template>
  <input
    class="
      flex-1
      my-4
      appearance-none
      border border-transparent
      w-full
      py-2
      px-4
      bg-white
      text-gray-700
      placeholder-gray-400
      shadow-md
      rounded-lg
      text-base
      focus:outline-none
      focus:ring-2 focus:ring-purple-600
      focus:border-transparent
    "
    type="text"
    :placeholder="msg"
  />
</template>

<script setup>
import { defineProps } from "vue"

const props = defineProps({
  msg: String,
})
</script>

<style scoped></style>
