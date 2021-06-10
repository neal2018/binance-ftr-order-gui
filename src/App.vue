<template>
  <MouseCheckWrapper>
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
          orderAmount: USDT {{ orderUSDT.toFixed(4) }} / BTC
          <input class="tiny-input" type="number" v-model="orderAmount" />
        </p>
        <p>
          leveredOrderAmount: USDT {{ (orderUSDT * leverage).toFixed(4) }} / BTC
          {{ (orderAmount * leverage).toFixed(6) }}
        </p>
        <p>feeRate: <input class="tiny-input" type="number" v-model="freeRate" /></p>
        <p>leveredFee: {{ tradingFee.toFixed(4) }} ({{ actualFeeRates.toFixed(4) }}%)</p>
      </div>
      <div class="flex justify-around mx-auto max-w-xl">
        <OrderButton class="order-button" msg="Long2" color="green" @click="long" />
        <OrderButton class="order-button" msg="Long1" color="green" @click="long" />
        <OrderButton class="order-button" msg="Short1" color="red" @click="short" />
        <OrderButton class="order-button" msg="Short2" color="red" @click="short" />
      </div>
      <div class="flex justify-around mx-auto font-mono">
        <Select :msgs="Object.keys(leverageShow)" v-model:data="leverageSelected" />
        <Select :msgs="Object.keys(openPriceShow)" v-model:data="openPriceSelected" />
        <Select :msgs="Object.keys(downPriceShow)" v-model:data="downPriceSelected" />
        <Select :msgs="Object.keys(upPriceShow)" v-model:data="upPriceSelected" />
      </div>
      <OrderShower />
    </div>
  </MouseCheckWrapper>
</template>

<script setup lang="ts">
import { computed } from "vue"
import OrderButton from "@/components/OrderButton.vue"
import PriceShower from "@/components/PriceShower.vue"
import Setting from "@/components/Setting.vue"
import Select from "@/components/Select.vue"
import MessageContenter from "@/components/MessageContenter.vue"
import MouseCheckWrapper from "@/components/MouseCheckWrapper.vue"
import OrderShower from "@/components/OrderShower.vue"
import { postOrderWithStopAndProfit } from "@/composables/postOrder"
import { Side, OrderType } from "@/composables/types"
import { roundToPrecision } from "@/composables/shared"
import { checkVerifiedWithToast } from "@/data/tradeInfo"
import { price, count, priceMeanRolling, priceMean30, priceSTD30 } from "@/data/prices"
import { leverage, leverageSelected, leverageShow, symbol } from "@/data/tradeConfig"

const long = () => {
  if (checkVerifiedWithToast()) {
    postOrderWithStopAndProfit(
      symbol.value,
      Side.BUY,
      OrderType.LIMIT,
      orderAmount * leverage.value,
      roundToPrecision(openPrice.value, 2),
      roundToPrecision(openPrice.value + downPriceDiff.value, 2),
      roundToPrecision(openPrice.value + upPriceDiff.value, 2)
    )
  }
}

const short = () => {
  if (checkVerifiedWithToast()) {
    postOrderWithStopAndProfit(
      symbol.value,
      Side.SELL,
      OrderType.LIMIT,
      orderAmount * leverage.value,
      roundToPrecision(openShortPrice.value, 2),
      roundToPrecision(openPrice.value + upPriceDiff.value, 2),
      roundToPrecision(openPrice.value + downPriceDiff.value, 2)
    )
  }
}

ref: freeRate = 0.036
ref: orderAmount = 0.00008 // btc
ref: floatPrice = computed(() => parseFloat(price.value))

const STDMultiplierOptions = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 5, 10]
const openPriceShow = STDMultiplierOptions.reduce(
  (map, e) => ((map[`p - ${e}*std30`] = e), map),
  {} as { [key: string]: number }
)
ref: openPriceSelected = Object.keys(openPriceShow)[5]
const openPrice = computed(() => floatPrice - openPriceShow[openPriceSelected] * priceSTD30.value)
const openShortPrice = computed(() => floatPrice + openPriceShow[openPriceSelected] * priceSTD30.value)

const orderUSDT = computed(() => openPrice.value * orderAmount)
const noLossPriceDiff = computed(() => freeRate * 0.01 * openPrice.value)
const tradingFee = computed(() => freeRate * leverage.value * orderUSDT.value * 0.01)
const actualFeeRates = computed(() => freeRate * leverage.value)

const downPriceShow = STDMultiplierOptions.reduce(
  (map, e) => ((map[`op - ${e}*std30`] = e), map),
  {} as { [key: string]: number }
)
ref: downPriceSelected = Object.keys(downPriceShow)[5]
const downPriceDiff = computed(() => -downPriceShow[downPriceSelected] * priceSTD30.value)
const downPercent = computed(() => (downPriceDiff.value / openPrice.value) * leverage.value * 100)

const upPriceShow = STDMultiplierOptions.reduce(
  (map, e) => ((map[`op + ${e}*std30`] = e), map),
  {} as { [key: string]: number }
)
ref: upPriceSelected = Object.keys(upPriceShow)[5]
const upPriceDiff = computed(() => upPriceShow[upPriceSelected] * priceSTD30.value)
const upPercent = computed(() => (upPriceDiff.value / openPrice.value) * leverage.value * 100)
</script>

<style scoped lang="postcss">
input[type="number"]::-webkit-inner-spin-button {
  appearance: none;
}
.tiny-input {
  @apply relative focus:z-10 px-1 w-20 bg-gray-700 appearance-none;
}
.order-button {
  @apply m-1 px-1 py-2 <sm:flex-grow sm:px-6 sm:py-4 sm:my-10;
}
</style>
