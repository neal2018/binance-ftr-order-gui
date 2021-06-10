import { reactive } from "vue"

export const keys = reactive({
  apiPublicKey: localStorage.getItem("apiPublicKey") ?? "",
  apiPrivateKey: localStorage.getItem("apiPrivateKey") ?? ""
})

export const saveKeys = () => {
  if (keys.apiPublicKey && keys.apiPrivateKey) {
    localStorage.setItem("apiPublicKey", keys.apiPublicKey)
    localStorage.setItem("apiPrivateKey", keys.apiPrivateKey)
  }
}
