import { ref, computed, reactive } from "vue"
import { exampleRespondForAggTrade, exampleRespondForMiniTicker } from "@/data/exampleResponds"
import { symbol } from "@/data/tradeConfig"

export const price = ref("0")
export const priceMeanRolling = ref(0)
const rollingAlpha = 0.03
export const count = ref(0)
export const timestamp = ref(0)

const pricesList30 = reactive([0])
let indexPricesList30 = 0

export const priceMean30 = computed(() => pricesList30.reduce((a, b) => a + b) / pricesList30.length)

export const priceSTD30 = computed(
  () => (pricesList30.reduce((a, b) => a + (b - priceMean30.value) ** 2) / pricesList30.length) ** 0.5
)

const symbolLower = computed(()=>symbol.value.toLowerCase())

const streamsCallback = new Map<string, Function>([
  [
    `${symbolLower.value}@aggTrade`,
    (data: typeof exampleRespondForAggTrade) => {
      if (data.T - timestamp.value > 0) {
        price.value = data.p
        timestamp.value = data.T
        count.value++
      }
    }
  ],
  [
    `${symbolLower.value}@miniTicker`,
    (data: typeof exampleRespondForMiniTicker) => {
      const priceHalfSecond = parseFloat(data.c)
      if (priceMeanRolling.value === 0) {
        priceMeanRolling.value = priceHalfSecond
      }
      priceMeanRolling.value -= rollingAlpha * (priceMeanRolling.value - priceHalfSecond)
      pricesList30[indexPricesList30] = priceHalfSecond
      indexPricesList30 = (indexPricesList30 + 1) % 30
    }
  ]
])

const streamsQuery = Array.from(streamsCallback.keys()).join("/")

const socket = new WebSocket(`wss://fstream.binance.com/stream?streams=${streamsQuery}`)
socket.addEventListener("message", (event) => {
  const { stream, data }: { stream: string; data: any } = JSON.parse(event.data)
  const toCall = streamsCallback.get(stream)
  toCall && toCall(data)
})
