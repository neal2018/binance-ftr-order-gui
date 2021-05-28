<template>
  <select
    class="
      flex-grow
      mx-1
      sm:mx-4
      sm:px-4
      sm:py-3
      text-white
      bg-gray-700
      hover:bg-purple-700
      rounded-lg
      focus:outline-none
      appearance-none
      cursor-pointer
    "
    :value="data"
    @input="$emit('update:data', asAny($event.target).value)"
  >
    <option v-for="msg in props.msgs" :key="msg" class="bg-gray-700">{{ msg }}</option>
  </select>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { asAny } from "@/composables/shared"
const props =
  defineProps<{
    msgs: string[]
    data: string
  }>()
</script>

<style scoped></style>
