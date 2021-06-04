import { ref } from "vue"

export const isUsingMouse = ref(false)

addEventListener("mousedown", () => {
  isUsingMouse.value = true
})
addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Tab") {
    isUsingMouse.value = false
  }
})
