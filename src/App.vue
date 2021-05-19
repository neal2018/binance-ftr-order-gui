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
import { provide } from "vue"
import OrderButton from "@/components/OrderButton.vue"
import PriceShower from "@/components/PriceShower.vue"
import Setting from "@/components/Setting.vue"

ref: price = "0"
ref: priceRollingMean = 0
const rollingAlpha = 0.03

ref: count = 0
let timestamp = 0
const socket = new WebSocket("wss://fstream.binance.com/stream?streams=btcusdt@aggTrade/btcusdt@miniTicker")
socket.addEventListener("message", (event) => {
  const { stream, data } = JSON.parse(event.data)
  if (stream === "btcusdt@aggTrade") {
    if (data.T - timestamp > 500) {
      price = data.p
      timestamp = data.T
      count++
    }
  } else if (stream === "btcusdt@miniTicker") {
    const priceHalfSecond = parseFloat(data.c)
    if (priceRollingMean === 0) {
      priceRollingMean = priceHalfSecond
    }
    priceRollingMean -= rollingAlpha * (priceRollingMean - priceHalfSecond)
  }
})

ref: keys = {
  apiPublicKey: "",
  apiPrivateKey: "",
}
provide("keys", keys)
</script>

<style scoped></style>
