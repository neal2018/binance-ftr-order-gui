import { ref } from "vue"
// modified from https://github.com/szboynono/mosha-vue-toastify/blob/main/lib/components/createToast.ts

let toastId = 0

export const toastsList = ref<Array<any>>([])

export const createToast = (content: string | { title: string; description: string }, options: object = {}): void => {
  const text = typeof content === "string" ? content : content.title
  const description = typeof content === "string" ? "" : content.description
  let id = toastId++
  toastsList.value.push({
    ...options,
    text,
    description,
    id,
    onCloseHandler: () => removeToast(id)
  })
}

const removeToast = (id: number) => {
  const index = toastsList.value.findIndex((toastVNode) => id === toastVNode.id)
  toastsList.value.splice(index, 1)
}
