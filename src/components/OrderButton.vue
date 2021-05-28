<template>
  <button
    class="
      flex-grow
      sm:flex-grow-0
      m-1
      px-1
      py-2
      sm:my-10
      sm:px-6
      sm:py-4
      text-md
      sm:text-base
      text-gray-100
      font-semibold
      active:bg-purple-600
      hover:bg-purple-700
      rounded-lg
      focus:outline-none
      shadow-md
    "
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
