import { keys } from "./keys"

const BASE = "https://fapi.binance.com"
const TEST_BASE = "https://fapi.binance.com"

enum Side {
  SELL = "SELL",
  BUY = "BUY"
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

enum RequestMethod {
  GET = "GET",
  POST = "POST"
}

const info = {
  offsetTime: 37000
}

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
    if (str != "") {
      str += "&"
    }
    str += key + "=" + encodeURIComponent(obj[key])
  }
  return str
}

const asyncPostCall = async (url: string, headers: HeadersInit, body: object, callback: Function) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
    const data = await response.json()
    callback(data)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const asyncGetCall = async (url: string, callback: Function, hearders = {}) => {
  try {
    const response = await fetch(url, {
      headers: hearders
    })
    const data = await response.json()
    callback(data)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const testOrder = async (symbol: string, side: Side, orderType: OrderType, quantity: number) => {
  const url = TEST_BASE + "/fapi/v1/order/test"
  const postHeaders = {
    "Content-Type": "application/json"
  }

  const postBody = {
    symbol: symbol,
    side: side,
    type: orderType,
    quantity: quantity
  }
  await asyncPostCall(url, postHeaders, postBody, console.log)
}

const adjustOffsetTime = async () => {
  const url = TEST_BASE + "/fapi/v1/time"
  await asyncGetCall(url, (data: { serverTime: number }) => {
    info.offsetTime = data.serverTime - new Date().getTime()
  })
}

const getExchangeInfo = async () => {
  const url = TEST_BASE + "/fapi/v1/exchangeInfo"
  const postBody = {}
  await asyncGetCall(`${url}?${makeQueryString(postBody)}`, console.log)
}

const getAccount = async () => {
  const url = TEST_BASE + "/fapi/v2/account"
  const postHeaders = {
    "Content-Type": "application/json",
    "X-MBX-APIKEY": keys.apiPublicKey
  }
  const postBody = {
    timestamp: new Date().getTime() + info.offsetTime
  }
  let signature = await signHMACSHA256(keys.apiPrivateKey, makeQueryString(postBody))
  await asyncGetCall(`${url}?${makeQueryString(postBody)}&signature=${signature}`, console.log, postHeaders)
}

adjustOffsetTime()

getAccount()
