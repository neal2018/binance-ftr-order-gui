<template>
  <button
    class="
      flex-grow
      m-1
      px-1
      py-2
      text-md text-gray-100
      font-semibold
      rounded-lg
      shadow-md
      hover:bg-purple-700
      focus:outline-none
    "
    sm="flex-grow-0 px-6 py-4 my-10 text-base"
    active="bg-purple-600"
    :class="bgColor"
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

const bgColor = props.color === "red" ? "bg-green-500" : "bg-red-500"
</script>

<style scoped></style>
