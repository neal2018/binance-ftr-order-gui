// modified from https://github.com/szboynono/mosha-vue-toastify/blob/main/lib/components/createToast.ts
import { ref } from "vue"
import { MessageType } from "@/composables/types"

let toastId = 0

export const toastsList = ref<Array<any>>([])

export const createToast = (title: string, description = "", options: object = {}) => {
  let id = toastId++
  toastsList.value.push({
    title,
    description,
    id,
    onCloseHandler: () => removeToast(id),
    ...options
  })
  return id
}

export const createToastWithType = (title: string, description = "", messageType = MessageType.INFO) => {
  createToast(title, description, { messageType })
}

const removeToast = (id: number) => {
  const index = toastsList.value.findIndex((toastVNode) => id === toastVNode.id)
  toastsList.value.splice(index, 1)
}
