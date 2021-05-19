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
      <OrderButton msg="Long2" type="green" />
      <OrderButton msg="Long1" type="green" />
      <OrderButton msg="Short1" type="red" />
      <OrderButton msg="Short2" type="red" />
    </div>
  </div>
</template>

<script setup>
import OrderButton from "@/components/OrderButton.vue"
import PriceShower from "@/components/PriceShower.vue"
import Setting from "@/components/Setting.vue"
import { keys } from "@/composables/keys"
import { price, count, priceRollingMean } from "@/composables/prices"
</script>

<style scoped></style>
