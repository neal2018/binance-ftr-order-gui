<template>
  <div
    class="m-2 relative flex justify-between min-h-16 overflow-hidden py-3 px-2 w-full sm:w-72 rounded-lg select-none"
    :class="props.messageType"
    @mouseenter="pauseTimer"
    @mouseleave="startTimer"
    @mousedown="startSwipe"
    :style="{ right: `${swipedDiff}px`, transition: isSwiping ? 'none' : 'transition: all .5s linear' }"
  >
    <div class="flex flex-col mx-1">
      <div class="text-base font-bold text-gray-700">{{ text }}</div>
      <div v-if="description && description.length > 0" class="text-sm m-1">{{ description }}</div>
    </div>
    <div class="group cursor-pointer" @click="onCloseHandler">
      <p
        class="
          text-2xl text-gray-700
          transition-all
          duration-70
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
        from-teal-100
        via-pink-100
        to-purple-300
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
import { MessageType } from "@/composables/types"

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
  },
  messageType: {
    type: String as PropType<MessageType>,
    default: MessageType.INFO
  }
})

// timer
const { progress, startTimer, pauseTimer } = useTimer(props.onCloseHandler, props.timeout)

onMounted(() => {
  startTimer()
})

// swiper
const { swipedDiff, isSwiping, startSwipe, endSwipe } = useSwipe()

const SWIPE_ACTIVE_DIFF = 200
watch(swipedDiff, () => {
  if (Math.abs(swipedDiff.value) > SWIPE_ACTIVE_DIFF) {
    endSwipe()
    props.onCloseHandler()
  }
})
</script>

<style scoped lang="postcss">
.INFO {
  @apply bg-light-700;
}

.OK {
  @apply bg-green-100;
}

.ERR {
  @apply bg-red-200;
}
</style>
