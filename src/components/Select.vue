<template>
  <select
    class="
      flex-grow
      w-1
      mx-1
      px-2
      py-1
      text-white
      bg-gray-700
      hover:bg-purple-700
      focus:outline-none
      rounded-lg
      appearance-none
      cursor-pointer
    "
    active="bg-purple-600"
    sm="mx-4 px-4 py-3"
    :value="data"
    @input="$emit('update:data', asAny($event.target).value)"
  >
    <option v-for="msg in props.msgs" :key="msg" class="bg-gray-700 m-100">{{ msg }}</option>
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
