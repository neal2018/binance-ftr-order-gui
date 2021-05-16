<template>
  <div class="contianer min-h-screen bg-gray-800 bg-cover p-10">
    <div
      class="mx-auto bg-gray-700 rounded-xl shadow-md overflow-hidden max-w-2xl text-white p-8 text-center"
    >
      <PriceShower :price="price" />
      <div class="m-10">
        <p>14.3242</p>
      </div>
      <p>{{ count }}</p>
      <p>{{ priceRollingMean }}</p>
    </div>
    <div class="max-w-xl mx-auto flex justify-around">
      <OrderButton msg="Long2" type="long" />
      <OrderButton msg="Long1" type="long" />
      <OrderButton msg="Short1" type="short" />
      <OrderButton msg="Short2" type="short" />
    </div>
  </div>
</template>

<script setup>
import OrderButton from "./components/OrderButton.vue"
import PriceShower from "./components/PriceShower.vue"
ref: price = "0"

ref: priceRollingMean = 0
const rollingAlpha = 0.03

ref: count = 0

const socket = new WebSocket("wss://fstream.binance.com/stream?streams=btcusdt@aggTrade/btcusdt@miniTicker")
socket.addEventListener("message", function(event) {
  const { stream, data } = JSON.parse(event.data)
  if (stream === "btcusdt@aggTrade") {
    price = data.p
    count++
  } else if (stream === "btcusdt@miniTicker") {
    const priceHalfSecond = parseFloat(data.c)
    if (priceRollingMean === 0) {
      priceRollingMean = priceHalfSecond
    }
    priceRollingMean -= rollingAlpha * (priceRollingMean - priceHalfSecond)
  }
})

</script>

<style scoped>
</style>
