<template>
  <div>
    <button
      class="circle z-10 absolute right-4 top-6 w-8 h-8 rounded-full transition-all duration-500"
      bg="gray-800 hover:purple-800 active:purple-700"
      @click="open"
    ></button>
    <div v-if="isShow" class="z-10 setbox absolute right-0 top-0 p-6 w-5/12 sm:w-96 h-screen bg-gray-500 bg-opacity-75">
      <div class="flex-row content-center justify-around">
        <input class="text-input" type="text" placeholder="api-public-key" v-model="keys.apiPublicKey" />
        <input class="text-input" type="text" placeholder="api-private-key" v-model="keys.apiPrivateKey" />
      </div>
      <div class="absolute sm:bottom-10 bottom-1/4 right-0 flex justify-around px-5 w-full">
        <OrderButton class="setting-button" msg="Confirm" color="green" @click="confirm" />
        <OrderButton class="setting-button" msg="Cancel" color="red" @click="close" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderButton from "@/components/OrderButton.vue"
import { keys, saveKeys } from "@/data/keys"
import { receiveSignal } from "@/data/tradeInfo"

ref: isShow = false
const open = () => {
  isShow = true
}
const close = () => {
  isShow = false
}
const confirm = () => {
  saveKeys()
  receiveSignal()
  close()
}
</script>

<style scoped lang="postcss">
.circle {
  box-shadow: 0 0 0.25rem 0.4rem rgba(0, 0, 0, 0), inset 0 0 0.25rem 0.4rem #374151;
}
.circle:hover {
  box-shadow: 0 0 0.25rem 0.4rem #4c1d95, inset 0 0 0.5rem 0.1rem #4c1d95;
  transform: scale(1.2);
  outline: none;
}
.text-input {
  @apply placeholder-gray-400
      flex-1
      my-4
      px-4
      py-2
      w-full
      text-gray-700
      font-mono
      text-base
      bg-white
      border border-transparent
      rounded-lg
      shadow-md
      appearance-none
      focus:border-transparent
      focus:outline-none
      focus:ring-purple-600
      focus:ring-2;
}
.setting-button {
  @apply m-1 px-1 py-2 <sm:flex-grow sm:px-6 sm:py-4 sm:m-5 sm:w-40;
}
</style>
