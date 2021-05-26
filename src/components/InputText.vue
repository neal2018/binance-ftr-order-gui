<template>
  <input
    class="
      font-mono
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
    :value="data"
    @input="$emit('update:data', asAny($event.target).value)"
  />
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { asAny } from "@/composables/shared"
defineProps({
  msg: String,
  data: String
})
</script>

<style scoped></style>
