<template>
  <div>
    <div>
      <transition-group
        name="bounce"
        tag="div"
        class="flex flex-col justify-start items-end fixed right-0 top-0 p-4 z-10"
      >
        <MessageToast v-for="props in toastsList" v-bind="props" :key="props.id" />
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageToast from "@/components/MessageToast.vue"
import { toastsList } from "@/composables/createToast"
</script>

<style scoped lang="postcss">
.bounce-move {
  transition: 2s ease;
}
.bounce-enter-active {
  animation: bounceIn 0.7s;
}

.bounce-leave-active {
  animation: bounceOut 0.7s;
}

@keyframes bounceIn {
  60%,
  75%,
  90%,
  from,
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
    position: relative;
  }
  90% {
    opacity: 0;
    transform: translate3d(500px, 0, 0);
    position: relative;
  }
  to {
    opacity: 0;
    transform: translate3d(200px, 0, 0);
    position: absolute;
  }
}
</style>
