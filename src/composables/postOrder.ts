import { RequestMethod, Side, OrderType, TimeInForce, NewOrderRespType, MessageType } from "@/composables/types"
import { TradeOrderBody } from "@/composables/types"
import { createToastWithType } from "@/composables/createToast"
import { BASE, getTimestamp, asyncCall, createToastWrapper, errorCallbackWithToast } from "@/composables/restfulAPI"
import { ref } from "vue"

export let orders = ref([] as number[])

export const postOrder = async (
  symbol: string,
  side: Side,
  orderType: OrderType,
  quantity: number,
  price: number,
  handleFulfilled: Function = console.log,
  handleRejection: Function = console.log
) => {
  const url = BASE + "/fapi/v1/order"
  const postBody: TradeOrderBody = {
    symbol: symbol,
    side: side,
    type: orderType,
    quantity: quantity,
    price: price,
    timeInForce: TimeInForce.GTC,
    newOrderRespType: NewOrderRespType.RESULT,
    timestamp: getTimestamp()
  }
  return await asyncCall(RequestMethod.POST, url, postBody, handleFulfilled, handleRejection, true, true)
}

export const postOrderWithToast = async (
  symbol: string,
  side: Side,
  orderType: OrderType,
  quantity: number,
  price: number
) => {
  return await createToastWrapper(postOrder, "Order Sent")(
    symbol,
    side,
    orderType,
    quantity,
    price,
    (data: any) => {
      console.log(data)
      createToastWithType("Order Created", `${data.side} ${data.origQty} at $${data.price}`, MessageType.OK)
      return data.id
    },
    errorCallbackWithToast
  )
}

export const postOrderWithStop = async (
  symbol: string,
  side: Side,
  orderType: OrderType,
  quantity: number,
  price: number,
  stopPrice: number
) => {
  let orderId = await postOrderWithToast(symbol, side, orderType, quantity, price)
  if (typeof orderId === "number") {
    orderId
  }
  // TODO: add stopPrice handle
}
