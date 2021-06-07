import { ref, computed, reactive, watch, Ref } from "vue"
import { BASE, generateListenKey } from "@/composables/restfulAPI"
import { OrderStatus, Side } from "@/composables/types"
import { exampleRespondForORDER_TRADE_UPDATE } from "@/data/exampleResponds"

export const isHavingData = ref(false)
const listenKey: Ref<string | undefined> = ref()
let socket: WebSocket | undefined
let setIntervalId: number | undefined

interface Order {
  id: number
  status: OrderStatus
  price: string
  quantity: string
  spentFee: string
  side: Side
}

const orders = reactive({} as { [id: number]: Order }) // TODO: maintain orders

const streamsCallback = {
  ORDER_TRADE_UPDATE: (data: typeof exampleRespondForORDER_TRADE_UPDATE) => {
    console.log(data)
  }
}

type StreamType = keyof typeof streamsCallback

export const receiveSignal = async () => {
  listenKey.value = await generateListenKey()
}

watch(listenKey, () => {
  isHavingData.value = false
  if (typeof listenKey.value !== "string") {
    return
  }
  if (!setIntervalId) {
    setIntervalId = window.setInterval(generateListenKey, 60 * 60 * 1000)
  }
  if (socket) {
    socket.close()
  }
  socket = new WebSocket(`wss://fstream.binance.com/ws/${listenKey}`)
  socket.addEventListener("message", (event) => {
    const eventJson = JSON.parse(event.data)
    console.log(eventJson)
    streamsCallback[eventJson["e"] as StreamType] && streamsCallback[eventJson["e"] as StreamType](eventJson)
  })
  isHavingData.value = true
})
