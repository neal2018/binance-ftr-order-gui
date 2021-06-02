<template>
  <div>
    <div>
      <transition-group
        name="bounce"
        tag="div"
        class="flex flex-col justify-start items-end fixed right-0 top-0 p-4 z-10 <sm:w-1/2"
        @leave="leave"
      >
        <MessageToast v-for="props in toastsList" v-bind="props" :key="props.id" />
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageToast from "@/components/MessageToast.vue"
import { toastsList } from "@/composables/createToast"
let leave = (el: Element) => {
  let HTMLel = el as HTMLDivElement // type assertion
  // move to same place but out of document flow
  let top = HTMLel.getBoundingClientRect().top + window.scrollY - 9 // FIXME: magic number 9
  HTMLel.style.position = "absolute"
  HTMLel.style.top = `${top}px`
}
</script>

<style scoped lang="postcss">
.bounce-move {
  transition: all 0.5s linear;
}
.bounce-enter-active {
  animation: bounceIn 0.7s;
}

.bounce-leave-active {
  animation: bounceOut 0.7s;
}

@keyframes bounceIn {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    transform: translate3d(10px, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes bounceOut {
  20% {
    opacity: 1;
    transform: translate3d(50px, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(500px, 0, 0);
  }
}
</style>
