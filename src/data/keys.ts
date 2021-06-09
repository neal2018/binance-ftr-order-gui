import { reactive } from "vue"

export const keys = reactive({
  apiPublicKey: localStorage.getItem("apiPublicKey"),
  apiPrivateKey: localStorage.getItem("apiPrivateKey")
})
