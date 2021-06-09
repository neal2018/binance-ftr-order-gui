import { Side, OrderType } from "@/composables/types"
import { postOrderWithToast } from "@/composables/restfulAPI"
import { reactive } from "vue"

export const stopAndProfitPrices = reactive({} as { [id: number]: { stopPrice: number; profitPrice: number } })
//TODO: watch verified and get all active order

export const postOrderWithStopAndProfit = async (
  symbol: string,
  side: Side,
  orderType: OrderType,
  quantity: number,
  price: number,
  stopPrice: number,
  profitPrice: number
) => {
  let orderId = await postOrderWithToast(symbol, side, orderType, quantity, price)
  if (typeof orderId === "number") {
    stopAndProfitPrices[orderId] = { stopPrice, profitPrice }
  }
}
