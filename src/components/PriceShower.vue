<template>
  <div class="mx-4 text-5xl font-mono font-semibold text-green-100">
    <p>{{ price.slice(0, 9) }} {{ arrow }}</p>
  </div>
</template>

<script setup>
import { defineProps, watch } from "vue"

const props = defineProps({
  price: {
    type: String,
    default: "0",
  },
})

ref: arrow = "↓"

watch(
  () => props.price,
  (price, prevPrice) => {
    if (price.length > prevPrice.length || price > prevPrice) {
      arrow = "↑"
    } else {
      arrow = "↓"
    }
  }
)
</script>

<style scoped></style>
