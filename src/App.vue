<template>
  <webview id="webview" ref="webview" src="https://weread.qq.com/"></webview>
  <section class="draggable-region"></section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const webview: Ref = ref(null)

    onMounted(() => {
      webview.value.addEventListener('dom-ready', () => {
        webview.value.insertCSS(`
          ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
          }
          ::-webkit-scrollbar-track {
            background-color: #11171a;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
          }
        `)
      })
    })

    return {
      webview,
    }
  },
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body,
#app,
#webview {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
section {
  position: absolute;
  left: 0;
  top: 0;
}
.draggable-region {
  width: 100%;
  height: 20px;
  user-select: none;
  -webkit-app-region: drag;
}
</style>
