<template>
  <button
    class="
      my-10
      px-6
      py-4
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
