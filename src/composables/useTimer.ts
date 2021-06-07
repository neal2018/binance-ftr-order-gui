// modified from https://github.com/szboynono/mosha-vue-toastify/blob/main/lib/hooks/useTimer.ts
import { ref, computed, onUnmounted } from "vue"

const TRANSITION_TIME = 100

export const useTimer = (callback: Function, delay: number) => {
  let timerId = 0
  let intervalId = 0
  const remaining = ref(delay)
  const progress = computed(() => (remaining.value / delay) * 100)

  const startTimer = () => {
    intervalId = window.setInterval(() => {
      remaining.value -= 100
    }, 100)
    timerId = window.setTimeout(callback, remaining.value + TRANSITION_TIME)
  }

  const pauseTimer = () => {
    clearInterval(intervalId)
    clearTimeout(timerId)
  }

  onUnmounted(() => {
    pauseTimer()
  })
  return { progress, startTimer, pauseTimer }
}
