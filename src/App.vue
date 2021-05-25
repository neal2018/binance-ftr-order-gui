<template>
  <div class="contianer min-h-screen bg-gray-800 bg-cover p-10">
    <Setting />
    <div
      class="mx-auto bg-gray-700 rounded-xl shadow-md overflow-hidden max-w-2xl text-white p-8 text-center font-mono"
    >
      <PriceShower :price="price" />
      <div class="m-10">
        <p>14.3242</p>
      </div>
      <p>{{ count }}</p>
      <p>{{ keys.apiPublicKey }}</p>
      <p>{{ priceRollingMean.toString().slice(0, 9) }}</p>
    </div>
    <div class="max-w-xl mx-auto flex justify-around">
      <OrderButton msg="Long2" color="green" />
      <OrderButton msg="Long1" color="green" />
      <OrderButton msg="Short1" color="red" />
      <OrderButton msg="Short2" color="red" />
    </div>
    <div class="mx-auto flex justify-around">
      <Select :msgs="contents" />
      <Select :msgs="contents" />
      <Select :msgs="contents" />
      <Select :msgs="contents" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderButton from "@/components/OrderButton.vue"
import PriceShower from "@/components/PriceShower.vue"
import Setting from "@/components/Setting.vue"
import Select from "@/components/Select.vue"
import { keys } from "@/composables/keys"
import { price, count, priceRollingMean } from "@/composables/prices"

ref: selected = "A regular sized select input"
const contents = ["2x", "5x", "25x", "50x", "75x", "100x", "125x"]
</script>

<style scoped></style>
