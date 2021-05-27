import { keys } from "./keys"

const BASE = "https://fapi.binance.com"

const info = {
  offsetTime: 37000 // arbitrary initial number, can be adjusted in adjustOffsetTime
}

enum RequestMethod {
  GET = "GET",
  POST = "POST"
}

enum Side {
  SELL = "SELL",
  BUY = "BUY"
}

enum PositionSide {
  BOTH = "BOTH",
  LONG = "LONG",
  SHORT = "SHORT"
}

enum StringBoolean {
  TRUE = "TRUE",
  FALSE = "FALSE"
}

enum WorkingType {
  CONTRACT_PRICE = "CONTRACT_PRICE",
  MARK_PRICE = "MARK_PRICE"
}

enum NewOrderRespType {
  ACK = "ACK",
  RESULT = "RESULT"
}

enum OrderType {
  LIMIT = "LIMIT",
  MARKET = "MARKET",
  STOP = "STOP",
  TAKE_PROFIT = "TAKE_PROFIT",
  STOP_MARKET = "STOP_MARKET",
  TAKE_PROFIT_MARKET = "TAKE_PROFIT_MARKET",
  TRAILING_STOP_MARKET = "TRAILING_STOP_MARKET"
}

enum TimeInForce {
  GTC = "GTC",
  IOC = "IOC",
  FOK = "FOK",
  GTX = "GTX"
}

interface TradeOrderBody {
  symbol: string
  side: Side
  positionSide?: PositionSide
  type: OrderType
  quantity: number
  price?: number
  newClientOrderId?: string
  stopPrice?: number
  closePosition?: StringBoolean
  activationPrice?: number
  callbackRate?: number
  timeInForce?: string
  workingType?: WorkingType
  priceProtect?: StringBoolean
  newOrderRespType?: NewOrderRespType
  recvWindow?: number
  timestamp: number
}

const getTimestamp = () => new Date().getTime() + info.offsetTime

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

const asyncCall = async (
  methodType: RequestMethod,
  url: string,
  params = {},
  callback: Function = console.log,
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
    const data = await response.json()
    callback(data)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const testOrder = async (symbol: string, side: Side, orderType: OrderType, quantity: number, price: number) => {
  const url = BASE + "/fapi/v1/order/test"
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
  return await asyncCall(RequestMethod.POST, url, postBody, console.log, true, true)
}

const adjustOffsetTime = async () => {
  const url = BASE + "/fapi/v1/time"
  return await asyncCall(RequestMethod.GET, url, {}, (data: { serverTime: number }) => {
    info.offsetTime = data.serverTime - new Date().getTime()
  })
}

const getExchangeInfo = async () => {
  const url = BASE + "/fapi/v1/exchangeInfo"
  return await asyncCall(RequestMethod.GET, url)
}

const getAccount = async () => {
  const url = BASE + "/fapi/v2/account"
  const postBody = {
    timestamp: getTimestamp()
  }
  return await asyncCall(RequestMethod.GET, url, postBody, console.log, true, true)
}

export const positionSide = async () => {
  const url = BASE + "/fapi/v1/positionSide/dual"
  const postBody = {
    dualSidePosition: false,
    timestamp: getTimestamp()
  }
  return await asyncCall(RequestMethod.POST, url, postBody, console.log, true, true)
}

adjustOffsetTime()

testOrder("BTCUSDT", Side.BUY, OrderType.LIMIT, 0.001, 35000)
