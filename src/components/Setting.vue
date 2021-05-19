<template>
  <button
    class="
      circle
      w-8
      h-8
      fixed
      top-6
      right-4
      rounded-full
      bg-gray-800
      hover:bg-purple-800
      focus:outline-none
      active:bg-purple-700
    "
    @click="open"
  ></button>
  <div v-if="isShow" class="setbox fixed top-0 right-0 h-screen w-96 p-6 bg-gray-500 bg-opacity-75">
    <div class="flex-row justify-around content-center">
      <InputText msg="api-public-key" v-model:data="keys.apiPublicKey" />
      <InputText msg="api-private-key" v-model:data="keys.apiPrivateKey" />
    </div>
    <div class="flex justify-around absolute bottom-10 right-0 w-full px-5">
      <OrderButton class="m-5 w-40" msg="Confirm" type="green" @click="close" />
      <OrderButton class="m-5 w-40" msg="Cancel" type="red" @click="close" />
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue"
import OrderButton from "@/components/OrderButton.vue"
import InputText from "@/components/InputText.vue"

ref: isShow = false
const close = () => {
  isShow = false
}
const open = () => {
  isShow = true
}

const keys = ((_) => _)(inject("keys")) // suppress error in volar
</script>

<style scoped>
.circle {
  box-shadow: inset 0 0 0.25rem 0.4rem #374151;
}
.circle:hover {
  box-shadow: 0 0 0.25rem 0.4rem #4c1d95, inset 0 0 0.5rem 0.1rem #4c1d95;
}
</style>
