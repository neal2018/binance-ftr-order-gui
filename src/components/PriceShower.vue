<template>
  <div class="mx-4 text-green-100 font-mono text-5xl font-semibold">
    <p>{{ price.slice(0, 9) }} {{ arrow }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue"

const props = defineProps({
  price: {
    type: String,
    default: "0"
  }
})

const arrow = ref("↓")

watch(
  () => props.price,
  (price, prevPrice) => {
    if (price.length > prevPrice.length || price > prevPrice) {
      arrow.value = "↑"
    } else {
      arrow.value = "↓"
    }
  }
)
</script>

<style scoped></style>
