<template>
  <div
    class="
      bg-light-200
      m-2
      relative
      flex
      justify-between
      min-h-16
      box-border
      overflow-hidden
      py-3
      px-2
      min-w-[19.5rem]
      max-w-[30rem]
      w-max
      break-words
      rounded-lg
      select-none
    "
    @mouseenter="pauseTimer"
    @mouseleave="startTimer"
    @mousedown="startSwipe"
    :style="{ right: `${swipedDiff}px`, transition: isSwiping ? 'none' : 'right 0.3s ease-out' }"
  >
    <div class="flex items-center">
      <div class="font-sans leading-5 flex flex-col text-cool-gray-600">
        <div class="mb-1 text-base font-bold">{{ text }}</div>
        <div v-if="description && description.length > 0" class="text-sm font-normal">{{ description }}</div>
      </div>
    </div>
    <div class="group cursor-pointer" @click="onCloseHandler">
      <p
        class="
          text-2xl
          font-normal
          relative
          ml-2.5
          text-gray-700
          transition-all
          duration-200
          shadow-2xl
          group-hover:text-red-500 group-hover:text-4xl group-hover:font-extrabold
        "
      >
        ×
      </p>
    </div>
    <div
      class="
        absolute
        h-3.5
        -bottom-2
        -ml-2
        rounded
        transition-all
        duration-200
        ease-linear
        bg-gradient-to-r
        from-teal-300
        via-pink-100
        to-indigo-400
      "
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, watch } from "vue"
import type { PropType } from "vue"
import { useTimer } from "@/composables/useTimer"
import { useSwipe } from "@/composables/useSwipe"

const props = defineProps({
  text: String,
  description: String,
  onCloseHandler: {
    type: Function as PropType<() => void>,
    required: true
  },
  timeout: {
    type: Number,
    default: 10000
  }
})

// timer
const { progress, startTimer, pauseTimer } = useTimer(props.onCloseHandler, props.timeout)

onMounted(() => {
  startTimer()
})

// swiper
const { swipedDiff, isSwiping, startSwipe, endSwipe } = useSwipe()

const SWIPE_ACTIVE_DIFF = 100
watch(swipedDiff, () => {
  if (Math.abs(swipedDiff.value) > SWIPE_ACTIVE_DIFF) {
    endSwipe()
    props.onCloseHandler()
  }
})
</script>

<style scoped lang="postcss"></style>
