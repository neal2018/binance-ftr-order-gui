export enum MessageType {
  INFO = "INFO",
  OK = "OK",
  ERR = "ERR"
}

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE"
}

export enum Side {
  SELL = "SELL",
  BUY = "BUY"
}

export enum PositionSide {
  BOTH = "BOTH",
  LONG = "LONG",
  SHORT = "SHORT"
}

export enum StringBoolean {
  TRUE = "TRUE",
  FALSE = "FALSE"
}

export enum WorkingType {
  CONTRACT_PRICE = "CONTRACT_PRICE",
  MARK_PRICE = "MARK_PRICE"
}

export enum NewOrderRespType {
  ACK = "ACK",
  RESULT = "RESULT"
}

export enum OrderType {
  LIMIT = "LIMIT",
  MARKET = "MARKET",
  STOP = "STOP",
  TAKE_PROFIT = "TAKE_PROFIT",
  STOP_MARKET = "STOP_MARKET",
  TAKE_PROFIT_MARKET = "TAKE_PROFIT_MARKET",
  TRAILING_STOP_MARKET = "TRAILING_STOP_MARKET"
}

export enum OrderStatus {
  NEW = "NEW",
  PARTIALLY_FILLE = "PARTIALLY_FILLED",
  FILLED = "FILLED",
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
  NEW_INSURANCE = "NEW_INSURANCE",
  NEW_ADL = "NEW_ADL"
}

export enum OrderEventType {
  NEW = "NEW",
  CANCELED = "CANCELED",
  CALCULATED = "CALCULATED",
  EXPIRED = "EXPIRED",
  TRADE = "TRADE"
}

export enum TimeInForce {
  GTC = "GTC",
  IOC = "IOC",
  FOK = "FOK",
  GTX = "GTX"
}

export interface TradeOrderBody {
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
