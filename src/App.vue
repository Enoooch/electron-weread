<template>
  <webview id="webview" ref="webview" src="https://weread.qq.com/"></webview>
  <section v-if="layerVisible" class="settings-layer">
    <p>Scroll bar style:</p>
    <n-radio-group v-model:value="theme" name="radiogroup">
      <n-space>
        <n-radio-button value="light">Light</n-radio-button>
        <n-radio-button value="dark">Dark</n-radio-button>
      </n-space>
    </n-radio-group>
  </section>
  <section class="draggable-region"></section>
  <section :class="['buger', { visible: layerVisible }]" @click="layerVisible = !layerVisible">
    <img src="./assets/menu.png" />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue'
import { NRadioGroup, NSpace, NRadioButton } from 'naive-ui'

export default defineComponent({
  name: 'App',
  components: {
    NRadioGroup,
    NSpace,
    NRadioButton,
  },
  setup() {
    const webview: Ref = ref(null)
    const layerVisible = ref(false)
    const theme = ref(localStorage.getItem('theme') || 'dark')

    const getScrollBarColorStr = (trackColor, thumbColor) => `
      ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }
      ::-webkit-scrollbar-track {
        background-color: ${trackColor};
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: ${thumbColor};
        border-radius: 10px;
      }
    `
    const lightColorStr = ref(getScrollBarColorStr('#fff', 'rgba(0, 0, 0, .2)'))
    const darkColorStr = ref(getScrollBarColorStr('#11171a', 'rgba(255, 255, 255, 0.3)'))

    let colorStr = ref(theme.value === 'light' ? lightColorStr.value : darkColorStr.value)

    watch(theme, (newVal) => {
      webview.value.removeInsertedCSS(colorStr.value)
      colorStr.value = newVal === 'light' ? lightColorStr.value : darkColorStr.value
      webview.value.insertCSS(colorStr.value)
      localStorage.setItem('theme', newVal)
    })

    onMounted(() => {
      webview.value.addEventListener('dom-ready', () => {
        webview.value.insertCSS(colorStr.value)
      })
    })

    return {
      webview,
      theme,
      layerVisible,
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
#webview,
.settings-layer {
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
.settings-layer {
  background-color: #fff;
  padding: 80px 80px 0;
  text-align: left;
}
input {
  margin: 0.4rem;
}
.draggable-region {
  width: 100%;
  height: 20px;
  user-select: none;
  -webkit-app-region: drag;
}
.buger {
  width: 36px;
  height: 36px;
  background-color: #eee;
  border-radius: 50%;
  left: 20px;
  top: 20px;
  cursor: pointer;
  padding: 3px;
  user-select: none;
  opacity: 0;
  transition: opacity 0.15s ease;
}
.visible,
.buger:hover {
  opacity: 1;
}
.buger img {
  width: 100%;
  height: 100%;
  display: block;
  opacity: 0.7;
}
</style>
