<template>
  <div class="h-80">
    <iframe class="w-full h-full m-0 p-0" :src="sourceStr"></iframe>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
const props = defineProps({
  symbol: {
    default: "BINANCE:BTCUSDTPERP"
  }
})
const sourceStr = `https://s.tradingview.com/widgetembed/?\
&symbol=${props.symbol}\
&interval=1\
&hidetoptoolbar=1\
&hidelegend=1\
&symboledit=1\
&studies=MASimple@tv-basicstudies%1FMAExp@tv-basicstudies\
&theme=dark\
&timezone=Asia/Shanghai\
&locale=en`
</script>

<style scoped></style>
