<template>
  <div class="mx-4 text-5xl font-mono font-semibold text-green-100">
    <p>{{ price.slice(0, 9) }} {{ arrow }}</p>
  </div>
</template>

<script setup>
import { defineProps, onBeforeUpdate } from "vue"

const props = defineProps({
  price: {
    type: String,
    default: "0",
  },
})

ref: arrow = "↓"
let oldPrice = props.price

onBeforeUpdate(() => {
  if (props.price.length > oldPrice.length || props.price > oldPrice) {
    arrow = "↑"
  } else {
    arrow = "↓"
  }
  oldPrice = props.price
})
</script>

<style scoped></style>
