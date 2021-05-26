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
