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
    :value="data"
    @input="$emit('update:data', asAny($event.target).value)"
  />
</template>

<script setup lang="ts">
import { defineProps } from "vue"

defineProps({
  msg: String,
  data: String
})

const asAny = (_: any) => _ // suppress error in volar
</script>

<style scoped></style>
