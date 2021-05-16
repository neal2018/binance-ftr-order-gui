<template>
  <div class="mx-4 text-5xl font-mono font-semibold text-green-100">
    <p>{{ price?.substring(0, 9) }} {{ arrow }}</p>
  </div>
</template>

<script setup>
import { defineProps, onBeforeUpdate } from "vue"

const props = defineProps({
  price: String,
})

ref: arrow = "↓"
let oldPrice = props.price ?? "0"

onBeforeUpdate(() => {
  if (props.price) {
    if (props.price.length > oldPrice.length || props.price > oldPrice) {
      arrow = "↑"
    } else {
      arrow = "↓"
    }
    oldPrice = props.price
  }
})
</script>

<style scoped></style>
