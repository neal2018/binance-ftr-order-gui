<template>
  <div class="text-light-100 m-2 my-5 font-mono">
    <template v-for="order of orders">
      <div class="flex justify-between border-2 text-center py-5 px-2 rounded-xl" v-if="checkInitialFilled(order)">
        <div class="text-center">{{ order }}</div>
        <OrderButton color="red" class="!p-2 !m-0" @click="cover(order)">COVER</OrderButton>
      </div>
    </template>
    <template v-for="order of orders">
      <div
        class="flex justify-between border-2 text-center py-5 px-2 rounded-xl"
        v-if="!checkInitialFilled(order) && checkActive(order)"
      >
        <div class="text-center">{{ order }}</div>
        <OrderButton color="red" class="!p-2 !m-0" @click="cancel(order)">CANCEL</OrderButton>
      </div>
    </template>
    <template v-for="order of orders">
      <div
        class="flex justify-between border-2 text-center py-5 px-2 rounded-xl"
        v-if="!checkInitialFilled(order) && !checkActive(order)"
      >
        <div class="text-center">{{ order }}</div>
        <OrderButton color="red" class="!p-2 !m-0 !cursor-not-allowed !bg-gray-700">DONE</OrderButton>
      </div>
    </template>
    <div class="flex justify-between border-2 text-center py-5 px-2 rounded-xl" v-for="order of stopAndProfitPrices">
      <div class="text-center">{{ order }}</div>
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { stopAndProfitPrices } from "@/composables/postOrder"
import { cancelTradeWithToast, postOrderWithToast } from "@/composables/restfulAPI"
import { OrderStatus, OrderType, Side } from "@/composables/types"
import type { Order } from "@/composables/types"
import { orders, checkVerifiedWithToast, order2stopAndProfit, stop2order, profit2order } from "@/data/tradeInfo"
import OrderButton from "./OrderButton.vue"
import { price } from "@/data/prices"
// TODO: look nicer

const checkActive = (order: Order) => {
  return order.status === OrderStatus.NEW || order.status === OrderStatus.PARTIALLY_FILLED
}

const checkInitialFilled = (order: Order) => {
  return order2stopAndProfit[order.id] !== undefined
}

const cover = (order: Order) => {
  postOrderWithToast(
    order.tradePair,
    Side.reverse(order.side),
    OrderType.LIMIT,
    parseFloat(order.quantity),
    parseFloat(price.value)
  )
  // cancel stop
  cancelTradeWithToast(order.tradePair, order2stopAndProfit[order.id].stop)
  delete stop2order[order2stopAndProfit[order.id].stop]
  // cancel profit
  cancelTradeWithToast(order.tradePair, order2stopAndProfit[order.id].profit)
  delete profit2order[order2stopAndProfit[order.id].profit]
  delete order2stopAndProfit[order.id]
}

const cancel = (order: Order) => {
  if (checkVerifiedWithToast()) {
    cancelTradeWithToast(order.tradePair, order.id)
  }
}
</script>

<style scoped></style>
