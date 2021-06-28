<template>
  <div class="text-light-100 mx-auto my-5 font-mono">
    <!-- active positions -->
    <template v-for="order of orders">
      <div class="container" v-if="checkInitialFilled(order)">
        <div class="text-center flex-grow">
          <p>
            open: <span class="emphasis">{{ order.price }}</span> amout:
            <span class="emphasis">{{ order.quantity }}</span> percent:
            <span class="emphasis">{{ getDiffPercent(order) }}% </span>
          </p>
          <p>
            stop: <span class="emphasis">{{ stopAndProfitPrices[order.id]?.stopPrice }} </span> profit:
            <span class="emphasis">{{ stopAndProfitPrices[order.id]?.profitPrice }}</span>
          </p>
        </div>
        <OrderButton color="red" class="p-2" @click="cover(order)">COVER</OrderButton>
      </div>
    </template>
    <!-- active orders -->
    <template v-for="order of orders">
      <div class="container" v-if="!checkInitialFilled(order) && checkActive(order)">
        <div class="text-center flex-grow">
          <p>
            open: <span class="emphasis">{{ order.price }}</span> amout:
            <span class="emphasis">{{ order.quantity }}</span> target:
            <span class="emphasis">{{ -getDiffPercent(order, getInitialPrice(order)) }}% </span>
          </p>
          <p>
            init: <span class="emphasis">{{ getInitialPrice(order) }} </span>
          </p>
        </div>
        <OrderButton color="red" class="p-2" @click="cancel(order)">CANCEL</OrderButton>
      </div>
    </template>
    <!-- inactive orders -->
    <template v-for="order of orders">
      <div class="container" v-if="!checkInitialFilled(order) && !checkActive(order)">
        <div class="text-center">{{ order }}</div>
        <OrderButton color="red" class="p-2 cursor-not-allowed !bg-gray-700">DONE</OrderButton>
      </div>
    </template>
    <div class="flex justify-between border-2 text-center py-5 px-2 rounded-xl" v-for="order of orders">
      <div class="text-center">{{ order }}</div>
      >
    </div>
    order2stopAndProfit details:
    <div class="flex justify-between border-2 text-center py-5 px-2 rounded-xl" v-for="order of order2stopAndProfit">
      <div class="text-center">{{ order }}</div>
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderButton from "@/components/OrderButton.vue"
import { stopAndProfitPrices } from "@/composables/postOrder"
import { cancelTradeWithToast, postOrderWithToast } from "@/composables/restfulAPI"
import { OrderStatus, OrderType, Side } from "@/composables/types"
import type { Order } from "@/composables/types"
import { orders, checkVerifiedWithToast, order2stopAndProfit, stop2order, profit2order } from "@/data/tradeInfo"
import { price } from "@/data/prices"
import { leverage } from "@/data/tradeConfig"

const checkActive = (order: Order) => {
  return order.status === OrderStatus.NEW || order.status === OrderStatus.PARTIALLY_FILLED
}

const checkInitialFilled = (order: Order) => {
  return order2stopAndProfit[order.id] !== undefined
}

const getDiffPercent = (order: Order, priceSting = price.value, precision = 4, needLeverage = true) => {
  const truePercent = ((parseFloat(priceSting) - parseFloat(order.price)) / parseFloat(order.price)) * 100
  return (needLeverage ? truePercent * leverage.value : truePercent).toFixed(precision)
}

const getInitialPrice = (order: Order) => {
  return (
    (stop2order[order.id] && orders[stop2order[order.id].originId].price) ||
    (profit2order[order.id] && orders[profit2order[order.id].originId].price) ||
    order.price
  )
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

<style scoped lang="postcss">
.emphasis {
  @apply text-pink-400 font-extrabold text-xl;
}

.container {
  @apply flex justify-between border-2 m-auto text-center py-5 px-2 rounded-xl sm:items-center;
}
</style>
