<template>
  <div class="text-light-100 m-2 my-5 font-mono">
    <div class="flex justify-between border-2 text-center py-5 px-2 rounded-xl" v-for="order of orders">
      <div class="text-center">{{ order }}</div>
      <OrderButton color="red" class="!p-2 !m-0" @click="cancel(order)">CANCEL</OrderButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cancelTradeWithToast } from "@/composables/restfulAPI"
import type { Order } from "@/composables/types"
import { orders, checkVerifiedWithToast } from "@/data/tradeInfo"
import OrderButton from "./OrderButton.vue"
// TODO: look nicer

let cancel = (order: Order) => {
  if (checkVerifiedWithToast()) {
    cancelTradeWithToast(order.tradePair, order.id)
  }
}
</script>

<style scoped></style>
