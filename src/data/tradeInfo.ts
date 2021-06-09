import { ref, reactive, watch, Ref } from "vue"
import { generateListenKey, postOrderWithToast } from "@/composables/restfulAPI"
import { OrderStatus, Side, OrderType, MessageType, Order } from "@/composables/types"
import { stopAndProfitPrices } from "@/composables/postOrder"
import { exampleRespondForORDER_TRADE_UPDATE } from "@/data/exampleResponds"
import { createToastWithType } from "@/composables/createToast"

export const isVerified = ref(false)

export const checkVerifiedWithToast = () => {
  if (!isVerified.value) {
    createToastWithType("NEED KEYS", "please enter public and private keys", MessageType.ERR)
    return false
  } else {
    return true
  }
}

const listenKey: Ref<string | undefined> = ref()
let socket: WebSocket | undefined
let setIntervalId: number | undefined

export const orders = reactive({} as { [id: number]: Order })

const streamsCallback = {
  ORDER_TRADE_UPDATE: (data: typeof exampleRespondForORDER_TRADE_UPDATE) => {
    console.log(data)
    let order = (orders[data.o.i] = {
      id: data.o.i,
      tradePair: data.o.s,
      status: data.o.X as OrderStatus,
      price: data.o.p,
      quantity: data.o.q,
      spentFee: data.o.n,
      side: data.o.S as Side
    })
    if (order.status === OrderStatus.FILLED) {
      createToastWithType("ORDER FILLED", `${order.side} ${order.quantity} at ${order.price}`, MessageType.OK)
      // TODO: test this
      if (stopAndProfitPrices[order.id]) {
        postOrderWithToast(
          order.tradePair,
          Side.reverse(order.side),
          OrderType.STOP,
          parseFloat(order.quantity),
          stopAndProfitPrices[order.id].stopPrice
        )
        postOrderWithToast(
          order.tradePair,
          Side.reverse(order.side),
          OrderType.LIMIT,
          parseFloat(order.quantity),
          stopAndProfitPrices[order.id].profitPrice
        )
      }
    }
  }
}

type StreamType = keyof typeof streamsCallback

export const receiveSignal = async () => {
  listenKey.value = await generateListenKey()
}

watch(listenKey, () => {
  isVerified.value = false
  if (typeof listenKey.value !== "string") {
    return
  }
  if (!setIntervalId) {
    setIntervalId = window.setInterval(generateListenKey, 60 * 60 * 1000)
  }
  if (socket) {
    socket.close()
  }
  Object.assign(orders, {})
  socket = new WebSocket(`wss://fstream.binance.com/ws/${listenKey.value}`)
  socket.addEventListener("message", (event) => {
    const eventJson = JSON.parse(event.data)
    console.log(eventJson)
    streamsCallback[eventJson["e"] as StreamType] && streamsCallback[eventJson["e"] as StreamType](eventJson)
  })
  isVerified.value = true
})
