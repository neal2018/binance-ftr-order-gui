import { ref } from "vue"

export const price = ref("0")
export const priceRollingMean = ref(0)
export const count = ref(0)
export const timestamp = ref(0)

const rollingAlpha = 0.03

const streamsCallback = {
  "btcusdt@aggTrade": (data) => {
    if (data.T - timestamp.value > 0) {
      price.value = data.p
      timestamp.value = data.T
      count.value++
    }
  },
  "btcusdt@miniTicker": (data) => {
    const priceHalfSecond = parseFloat(data.c)
    if (priceRollingMean.value === 0) {
      priceRollingMean.value = priceHalfSecond
    }
    priceRollingMean.value -= rollingAlpha * (priceRollingMean.value - priceHalfSecond)
  },
}

const streamsQuery = Object.keys(streamsCallback).join("/")

const socket = new WebSocket(`wss://fstream.binance.com/stream?streams=${streamsQuery}`)
socket.addEventListener("message", (event) => {
  const { stream, data } = JSON.parse(event.data)
  streamsCallback[stream](data)
})
