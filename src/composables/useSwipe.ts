import { onMounted, onUnmounted, ref } from "vue"
// modified from https://github.com/szboynono/mosha-vue-toastify/blob/main/lib/hooks/useSwipe.ts

export const useSwipe = () => {
  let swipeStart = 0
  const swipedDiff = ref(0)
  const isSwiping = ref(false)

  const swipeHandler = (event: MouseEvent) => {
    if (isSwiping.value) {
      swipedDiff.value = swipeStart - event.clientX
    }
  }

  const startSwipe = (event: MouseEvent) => {
    isSwiping.value = true
    swipeStart = event.clientX
    addEventListener("mousemove", swipeHandler)
  }

  const endSwipe = () => {
    isSwiping.value = false
    swipedDiff.value = 0
    swipeStart = 0
    removeEventListener("mousemove", swipeHandler)
  }

  onMounted(() => {
    addEventListener("mouseup", endSwipe)
  })

  onUnmounted(() => {
    endSwipe()
    removeEventListener("mouseup", endSwipe)
  })

  return {
    swipedDiff,
    isSwiping,
    startSwipe,
    endSwipe
  }
}
