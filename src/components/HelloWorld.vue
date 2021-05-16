<template>
  <h1>{{ msg }}</h1>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a>|
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>
  <button @click="state.count++">count is: {{ state.count }}</button>
  <div v-if="state.count > 1">hello</div>
  <p>
    Edit
    <code>components/HelloWorld.vue</code>to test hot module replacement.
  </p>
</template>

<script setup>
import { defineProps } from "vue"

/**
* @param {number} params
*/
function he(params) {
  params += 1
  return params
}

defineProps({
  msg: String
})

ref: state = { count: 0 }
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
