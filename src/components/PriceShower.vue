<template>
  <div class="mx-4 text-green-100 font-mono text-5xl font-semibold">
    <p>{{ price.slice(0, 9) }} {{ arrow }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, watch } from "vue"

const props = defineProps({
  price: {
    type: String,
    default: "0"
  }
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
