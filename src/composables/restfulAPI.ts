import { keys } from "@/data/keys"
import { RequestMethod, MessageType } from "@/composables/types"
import { createToast, createToastWithType } from "@/composables/createToast"
import { ref } from "vue"

export const BASE = "https://fapi.binance.com"

const info = {
  offsetTime: 37000 // arbitrary initial number, will be adjusted in adjustOffsetTime
}

export const getTimestamp = () => new Date().getTime() + info.offsetTime

// https://stackoverflow.com/questions/47329132/how-to-get-hmac-with-crypto-web-api/
const signHMACSHA256 = async (key: string, data: string) => {
  let UTFencoder = new TextEncoder()
  let encodedKey = await window.crypto.subtle.importKey(
    "raw",
    UTFencoder.encode(key),
    {
      name: "HMAC",
      hash: { name: "SHA-256" }
    },
    false,
    ["sign", "verify"]
  )

  let rawSignature = await window.crypto.subtle.sign("HMAC", encodedKey, UTFencoder.encode(data))
  let b = new Uint8Array(rawSignature)
  return Array.prototype.map.call(b, (x) => ("00" + x.toString(16)).slice(-2)).join("")
}

const makeQueryString = (obj: { [key: string]: any }) => {
  let str = ""
  for (let key in obj) {
    if (str !== "") {
      str += "&"
    }
    str += key + "=" + encodeURIComponent(obj[key])
  }
  return str
}

export const asyncCall = async (
  methodType: RequestMethod,
  url: string,
  params = {},
  handleFulfilled: Function = console.log,
  handleRejection: Function = console.log,
  needKey = false,
  needSign = false
) => {
  try {
    let headers: HeadersInit = needKey ? { "X-MBX-APIKEY": keys.apiPublicKey } : {}
    let queryString = makeQueryString(params)
    let queryURL = needSign
      ? `${url}?${queryString}&signature=${await signHMACSHA256(keys.apiPrivateKey, queryString)}`
      : `${url}?${queryString}`
    const response = await fetch(queryURL, {
      method: methodType,
      headers: headers
    })
    if (!response.ok) {
      throw response
    }
    const data = await response.json()
    return handleFulfilled(data)
  } catch (error) {
    return handleRejection(error)
  }
}

export const createToastWrapper = (f: Function, title: string, description = "", messageType = MessageType.INFO) => {
  return async (...args: any[]) => {
    createToastWithType(title, description, messageType)
    return await f(...args)
  }
}

export const errorCallbackWithToast = async (error: any) => {
  console.log(error)
  if (error instanceof Response) {
    let errorJson = await error.json()
    console.log(errorJson)
    createToastWithType("Order Error", `${errorJson.code}: ${errorJson.msg}`, MessageType.ERR)
  } else {
    createToastWithType("Network Error", error.message, MessageType.ERR)
  }
}

export const adjustOffsetTime = async () => {
  const url = BASE + "/fapi/v1/time"
  await asyncCall(RequestMethod.GET, url, {}, (data: { serverTime: number }) => {
    info.offsetTime = data.serverTime - new Date().getTime()
  })
}

await adjustOffsetTime()

const getExchangeInfo = async () => {
  const url = BASE + "/fapi/v1/exchangeInfo"
  asyncCall(RequestMethod.GET, url)
}

const getAccount = async () => {
  const url = BASE + "/fapi/v2/account"
  const postBody = {
    timestamp: getTimestamp()
  }
  asyncCall(RequestMethod.GET, url, postBody, console.log, console.log, true, true)
}

export const positionSide = async () => {
  const url = BASE + "/fapi/v1/positionSide/dual"
  const postBody = {
    dualSidePosition: false,
    timestamp: getTimestamp()
  }
  asyncCall(RequestMethod.POST, url, postBody, console.log, console.log, true, true)
}

export const postLeverage = (
  symbol: string,
  leverage: number,
  handleFulfilled: Function = console.log,
  handleRejection: Function = console.log
) => {
  const url = BASE + "/fapi/v1/leverage"
  const postBody = {
    symbol,
    leverage,
    timestamp: getTimestamp()
  }
  asyncCall(RequestMethod.POST, url, postBody, handleFulfilled, handleRejection, true, true)
}

export const postLeverageWithToast = (symbol: string, leverage: number) => {
  createToastWrapper(postLeverage, "Leverage Change Request Sent")(
    symbol,
    leverage,
    (data: any) => {
      console.log(data)
      createToastWithType("Leverage Changed", `Leverage of ${data.symbol} changed to ${data.leverage}`, MessageType.OK)
    },
    errorCallbackWithToast
  )
}

export const cancelTrade = (
  symbol: string,
  orderID: number,
  handleFulfilled: Function = console.log,
  handleRejection: Function = console.log
) => {
  const url = BASE + "/fapi/v1/order"
  const postBody = {
    symbol,
    orderID,
    timestamp: getTimestamp()
  }
  asyncCall(RequestMethod.DELETE, url, postBody, handleFulfilled, handleRejection, true, true)
}

export const generateListenKey = async () => {
  const url = BASE + "/fapi/v1/listenKey"
  return await asyncCall(
    RequestMethod.POST,
    url,
    {},
    (data: any) => {
      return data.listenKey as string
    },
    errorCallbackWithToast,
    true,
    false
  )
}
