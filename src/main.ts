import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import bestImage from './lib'

const app = createApp(App)
app.directive('src', {
  mounted(el, binding, vnode, prevVNode) {
    // console.log({ el, binding, vnode, prevVNode })
    // console.dir(el.width)
    // console.dir(el.getComputedStyle)
    const { borderRadius } = getComputedStyle(el)
    const { width, height } = el
    const radius = Math.min(
      // 因为不支持设置某个角的圆角，需取最少值。
      ...borderRadius.split(' ').map(i => {
        const size = parseFloat(i)
        return i.endsWith('%') ? (size * width) / 100 : size
      })
    )
    // console.log(width, height)
    el.src = bestImage.getImageUrl(binding.value, { w: width, h: height, r: radius })
  }
})

app.mount('#app')
