<template>
  <div class="contianer p-10 min-h-screen bg-gray-800 bg-cover">
    <Setting />
    <div
      class="mx-auto p-8 max-w-2xl text-center text-white font-mono bg-gray-700 rounded-xl shadow-md overflow-hidden"
    >
      <PriceShower :price="price" />
      <div class="m-10">
        <p>priceMeanRolling: {{ priceMeanRolling.toFixed(4) }}</p>
        <p>priceMean30: {{ priceMean30.toFixed(4) }}</p>
        <p>priceSTD30: {{ priceSTD30.toFixed(4) }} ({{ ((priceSTD30 / priceMeanRolling) * 100).toFixed(4) }}%)</p>
        <p>count: {{ count }}</p>
      </div>
      <p>orderAmount: <input class="tiny-input" type="number" v-model="orderAmount" /></p>
      <p>feeRate: <input class="tiny-input" type="number" v-model="tradingFeeRate" /></p>
      <p>Leverage: {{ leverageSelected }}</p>
      <p>orderUSDT: {{ orderUSDT.toFixed(4) }}</p>
      <p>tradingFee: {{ tradingFee.toFixed(4) }}</p>
      <p>noLossPriceDiff: {{ noLossPriceDiff.toFixed(4) }}</p>
      <p>noLossPrice: {{ noLossPrice.toFixed(4) }}</p>
    </div>
    <div class="flex justify-around mx-auto max-w-xl">
      <OrderButton msg="Long2" color="green" />
      <OrderButton msg="Long1" color="green" />
      <OrderButton msg="Short1" color="red" />
      <OrderButton msg="Short2" color="red" />
    </div>
    <div class="flex justify-around mx-auto">
      <Select :msgs="leverageContents" v-model:data="leverageSelected" />
      <Select :msgs="leverageContents" v-model:data="leverageSelected" />
      <Select :msgs="leverageContents" v-model:data="leverageSelected" />
      <Select :msgs="leverageContents" v-model:data="leverageSelected" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderButton from "@/components/OrderButton.vue"
import PriceShower from "@/components/PriceShower.vue"
import Setting from "@/components/Setting.vue"
import Select from "@/components/Select.vue"
import { keys } from "@/composables/keys"
import { price, count, priceMeanRolling, priceMean30, priceSTD30 } from "@/composables/prices"
import { computed } from "vue"

ref: leverageSelected = "125x"
const leverageContents = ["2x", "5x", "25x", "50x", "75x", "100x", "125x"]
const leverageStr2Int = leverageContents.reduce(
  (map, e) => ((map[e] = parseInt(e.slice(0, -1))), map),
  {} as { [key: string]: number }
)

ref: tradingFeeRate = 0.036
ref: leverage = computed(() => leverageStr2Int[leverageSelected])

ref: orderAmount = 0.01 // btc
ref: orderPrice = computed(() => parseFloat(price.value))
ref: orderUSDT = computed(() => orderPrice * orderAmount)
ref: noLossPriceDiff = computed(() => tradingFeeRate * 0.01 * orderPrice)
ref: noLossPrice = computed(() => noLossPriceDiff + orderPrice)
ref: tradingFee = computed(() => noLossPriceDiff * leverage * orderAmount)

// let profit =
//   noLossPrice * orderAmount * leverage -
//   orderPrice * orderAmount * leverage -
//   feeRate * orderPrice * 0.01 * orderAmount * leverage
</script>

<style scoped lang="postcss">
input[type="number"]::-webkit-inner-spin-button {
  appearance: none;
}
.tiny-input {
  @apply relative focus:z-10 px-1 w-14 bg-gray-700 appearance-none;
}
</style>
