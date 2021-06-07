<template>
  <div
    :class="isUsingMouse ? 'using-mouse' : 'using-keyborad'"
    @mousedown="
      () => {
        isUsingMouse = true
      }
    "
    @keyup.tab="
      () => {
        isUsingMouse = false
      }
    "
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const isUsingMouse = ref(false)
</script>

<style>
.using-mouse button:focus,
.using-mouse select:focus {
  outline: none;
}
</style>
