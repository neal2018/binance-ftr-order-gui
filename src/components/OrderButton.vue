<template>
  <button
    class="my-10 py-4 px-6 font-semibold text-gray-100 rounded-lg shadow-md focus:outline-none hover:bg-purple-700 active:bg-purple-600"
    :class="bgColor"
  >{{ msg }}</button>
</template>

<script setup="props">
import { defineProps } from "vue"

const props = defineProps({
  msg: String,
  type: String,
})

const bgColor = props.type === "long" ? "bg-green-500" : "bg-red-500"

</script>

<style scoped>
</style>
