<template>
  <div :class="isUsingMouse ? 'using-mouse' : 'using-keyborad'">
    <div class="fixed bg-gray-800 overflow-hidden -z-10 w-2/1 h-2/1 -top-1/2"></div>
    <Setting />
    <MessageContenter />
    <div class="contianer p-1 sm:p-10 min-h-screen bg-gray-800 bg-cover">
      <div
        class="mx-auto p-8 max-w-2xl text-center text-white font-mono bg-gray-700 rounded-xl shadow-md overflow-hidden"
      >
        <PriceShower :price="price" />
        <div class="m-2 sm:m-8">
          <p>
            priceMeanRolling: {{ priceMeanRolling.toFixed(2) }}
            <span class="inline-block w-4">({{ (floatPrice - priceMeanRolling).toFixed(2) }})</span>
          </p>
          <p>
            priceMean30: {{ priceMean30.toFixed(2) }}
            <span class="inline-block w-4">({{ (floatPrice - priceMean30).toFixed(2) }})</span>
          </p>
          <p>priceSTD30: {{ priceSTD30.toFixed(2) }} ({{ ((priceSTD30 / priceMeanRolling) * 100).toFixed(4) }}%)</p>
          <p>count: {{ count }}</p>
        </div>
        <p>
          openPrice: {{ openPrice.toFixed(2) }} ({{ (openPrice - floatPrice).toFixed(2) }}/{{
            (((openPrice - floatPrice) / floatPrice) * 100).toFixed(4)
          }}%)
        </p>
        <p>
          noLossPrice: {{ (openPrice + noLossPriceDiff).toFixed(2) }} /
          {{ (openPrice - noLossPriceDiff).toFixed(2) }} ({{ noLossPriceDiff.toFixed(2) }}/{{
            (freeRate * leverage).toFixed(4)
          }}%)
        </p>
        <p>
          upPrice: {{ (openPrice + upPriceDiff).toFixed(2) }} ({{ upPriceDiff.toFixed(2) }}/{{ upPercent.toFixed(4) }}%)
        </p>
        <p>
          downPrice: {{ (openPrice + downPriceDiff).toFixed(2) }} ({{ downPriceDiff.toFixed(2) }}/{{
            downPercent.toFixed(4)
          }}%)
        </p>
        <br />
        <p>leverage: {{ leverage + "x" }}</p>
        <p>
          orderAmount: USDT {{ orderUSDT.toFixed(2) }} / BTC
          <input class="tiny-input" type="number" v-model="orderAmount" />
        </p>
        <p>
          leveredOrderAmount: USDT {{ (orderUSDT * leverage).toFixed(2) }} / BTC
          {{ (orderAmount * leverage).toFixed(2) }}
        </p>
        <p>feeRate: <input class="tiny-input" type="number" v-model="freeRate" /></p>
        <p>leveredFee: {{ tradingFee.toFixed(4) }} ({{ actualFeeRates.toFixed(4) }}%)</p>
      </div>
      <div class="flex justify-around mx-auto max-w-xl">
        <OrderButton
          msg="Long2"
          color="green"
          @click="createToast({ title: 'ORDER MADE', description: '0.01 BTC at 57200.00 USDT' })"
        />
        <OrderButton msg="Long1" color="green" />
        <OrderButton msg="Short1" color="red" />
        <OrderButton msg="Short2" color="red" />
      </div>
      <div class="flex justify-around mx-auto font-mono">
        <Select :msgs="Object.keys(leverageShow)" v-model:data="leverageSelected" />
        <Select :msgs="Object.keys(openPriceShow)" v-model:data="openPriceSelected" />
        <Select :msgs="Object.keys(downPriceShow)" v-model:data="downPriceSelected" />
        <Select :msgs="Object.keys(upPriceShow)" v-model:data="upPriceSelected" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderButton from "@/components/OrderButton.vue"
import PriceShower from "@/components/PriceShower.vue"
import Setting from "@/components/Setting.vue"
import Select from "@/components/Select.vue"
import MessageContenter from "@/components/MessageContenter.vue"
import { keys } from "@/composables/keys"
import { price, count, priceMeanRolling, priceMean30, priceSTD30 } from "@/composables/prices"
import { computed } from "vue"
import { createToast } from "@/composables/createToast"
import { isUsingMouse } from "@/composables/useMouseCheck"

ref: freeRate = 0.036
ref: orderAmount = 0.01 // btc
ref: floatPrice = computed(() => parseFloat(price.value))

const leverageOptions = [1, 2, 5, 25, 50, 75, 100, 125]
const leverageShow = leverageOptions.reduce((map, e) => ((map[e + "x"] = e), map), {} as { [key: string]: number })
ref: leverageSelected = Object.keys(leverageShow)[Object.keys(leverageShow).length - 1]
ref: leverage = computed(() => leverageShow[leverageSelected])

const STDMultiplierOptions = [0, 0.1, 0.3, 0.5, 0.7, 1, 2, 3, 5, 10]
const openPriceShow = STDMultiplierOptions.reduce(
  (map, e) => ((map[`p - ${e}*std30`] = e), map),
  {} as { [key: string]: number }
)
ref: openPriceSelected = Object.keys(openPriceShow)[5]
ref: openPrice = computed(() => floatPrice - openPriceShow[openPriceSelected] * priceSTD30.value)

ref: orderUSDT = computed(() => openPrice * orderAmount)
ref: noLossPriceDiff = computed(() => freeRate * 0.01 * openPrice)
ref: tradingFee = computed(() => freeRate * leverage * orderUSDT * 0.01)
ref: actualFeeRates = computed(() => freeRate * leverage)

const downPriceShow = STDMultiplierOptions.reduce(
  (map, e) => ((map[`op - ${e}*std30`] = e), map),
  {} as { [key: string]: number }
)
ref: downPriceSelected = Object.keys(downPriceShow)[5]
ref: downPriceDiff = computed(() => -downPriceShow[downPriceSelected] * priceSTD30.value)
ref: downPercent = computed(() => (downPriceDiff / openPrice) * leverage * 100)

const upPriceShow = STDMultiplierOptions.reduce(
  (map, e) => ((map[`op + ${e}*std30`] = e), map),
  {} as { [key: string]: number }
)
ref: upPriceSelected = Object.keys(upPriceShow)[5]
ref: upPriceDiff = computed(() => upPriceShow[upPriceSelected] * priceSTD30.value)
ref: upPercent = computed(() => (upPriceDiff / openPrice) * leverage * 100)
</script>

<style>
.using-mouse button:focus,
.using-mouse select:focus {
  outline: none;
}
</style>
<style scoped lang="postcss">
input[type="number"]::-webkit-inner-spin-button {
  appearance: none;
}
.tiny-input {
  @apply relative focus:z-10 px-1 w-16 bg-gray-700 appearance-none;
}
</style>
