import { ref, reactive, watch, Ref } from "vue"
import { cancelTradeWithToast, generateListenKey, postOrderWithToast } from "@/composables/restfulAPI"
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
export const stop2order = {} as { [stop: number]: { originId: number; stop: number; profit: number } }
export const profit2order = {} as { [profit: number]: { originId: number; stop: number; profit: number } }
export const order2stopAndProfit = {} as { [originId: number]: { originId: number; stop: number; profit: number } }

const streamsCallback = {
  ORDER_TRADE_UPDATE: async (data: typeof exampleRespondForORDER_TRADE_UPDATE) => {
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
      // handle initial order
      if (stopAndProfitPrices[order.id]) {
        console.log("profit")
        let [profitId, stopId] = await Promise.all([
          postOrderWithToast(
            order.tradePair,
            Side.reverse(order.side),
            OrderType.LIMIT,
            parseFloat(order.quantity),
            stopAndProfitPrices[order.id].profitPrice
          ),
          postOrderWithToast(
            order.tradePair,
            Side.reverse(order.side),
            OrderType.STOP,
            parseFloat(order.quantity),
            stopAndProfitPrices[order.id].stopPrice
          )
        ])
        if (typeof profitId === "number" && typeof stopId === "number") {
          stop2order[stopId] = { originId: order.id, stop: stopId, profit: profitId }
          profit2order[profitId] = { originId: order.id, stop: stopId, profit: profitId }
          order2stopAndProfit[order.id] = { originId: order.id, stop: stopId, profit: profitId }
        }
      }
      // handle profit
      if (profit2order[order.id]) {
        cancelTradeWithToast(order.tradePair, profit2order[order.id].stop)
        delete order2stopAndProfit[profit2order[order.id].originId]
        delete stop2order[profit2order[order.id].stop]
        delete profit2order[order.id]
      }
      // handle stop
      if (stop2order[order.id]) {
        cancelTradeWithToast(order.tradePair, stop2order[order.id].profit)
        delete order2stopAndProfit[stop2order[order.id].originId]
        delete profit2order[stop2order[order.id].profit]
        delete stop2order[order.id]
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
