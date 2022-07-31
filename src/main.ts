import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { BestImage } from './lib'
import { Tencent, Aliyun, HuaweiCloud, Qiniu, JdCloud, BaiduCloud, Ksyun } from './lib/obsConfig'

const bestImage = new BestImage()

bestImage.addObsConfig([new Tencent(), new Aliyun(), new HuaweiCloud(), new Qiniu(), new JdCloud(), new BaiduCloud(), new Ksyun()])

const app = createApp(App)
app.directive('src', {
  mounted(el, binding, vnode, prevVNode) {
    console.log({ el, binding, vnode, prevVNode })
    // console.dir(el.width)
    // console.dir(el.getComputedStyle)
    const { arg } = binding
    const { borderRadius } = getComputedStyle(el)
    const { width, height } = el
    el.style.objectFit = 'cover'
    let radius = Math.min(
      // 因为不支持设置某个角的圆角，需取最少值。
      ...borderRadius.split(' ').map(i => {
        const size = parseFloat(i)
        return i.endsWith('%') ? (size * width) / 100 : size
      })
    )

    // console.log(width, height)
    el.src = bestImage.getImageUrl(binding.value, { w: width, h: height, r: radius }, arg)
  }
})

app.mount('#app')
