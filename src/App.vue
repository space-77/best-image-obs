<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="wrapper">
    <div class="image-wrapper">
      <img v-src:tx="'https://examples-1251000004.cos.ap-shanghai.myqcloud.com/sample.jpeg'" alt="" />
    </div>
    <div class="image-wrapper">
      <img v-src:al="'https://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg'" alt="" />
    </div>
    <div class="image-wrapper">
      <img v-src:hw="'https://e-share.obs.cn-north-1.myhuaweicloud.com/example.jpg'" alt="" />
    </div>
    <div class="image-wrapper">
      <img v-src:bd="'https://doc.bce.baidu.com/bce-documentation/BOS/image.jpg'" alt="" />
    </div>
    <div class="image-wrapper">
      <img v-src:ks="'https://ks3-resources.ks3-cn-beijing.ksyuncs.com/suiyi.jpg'" alt="" />
    </div>
    <div class="image-wrapper">
      <img src="./assets/example (1).jpg" alt="" />
      <!-- <img v-src:jd="'https://downloads.s3.cn-north-1.jdcloud-oss.com/example.jpg'" alt="" /> -->
    </div>
    <div class="image-wrapper">
      <img src="./assets/gogopher (1).jpg" alt="" />
      <!-- <img v-src:qn="'https://dn-odum9helk.qbox.me/resource/gogopher.jpg'" alt="" /> -->
    </div>
  </div>
  <div class="wrapper">
    <div class="image-wrapper">
      <img src="https://examples-1251000004.cos.ap-shanghai.myqcloud.com/sample.jpeg" alt="" />
    </div>
    <div class="image-wrapper">
      <img src="https://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg" alt="" />
    </div>
    <div class="image-wrapper">
      <img src="https://e-share.obs.cn-north-1.myhuaweicloud.com/example.jpg" alt="" />
    </div>
    <div class="image-wrapper">
      <img src="https://doc.bce.baidu.com/bce-documentation/BOS/image.jpg" alt="" />
    </div>
    <div class="image-wrapper">
      <img src="https://ks3-resources.ks3-cn-beijing.ksyuncs.com/suiyi.jpg" alt="" />
    </div>
    <div class="image-wrapper">
      <!-- <img src="https://downloads.s3.cn-north-1.jdcloud-oss.com/example.jpg" alt="" /> -->
      <img src="./assets/example.jpg" alt="" />
    </div>
    <div class="image-wrapper">
      <img src="./assets/gogopher.jpg" alt="" />
      <!-- <img src="https://dn-odum9helk.qbox.me/resource/gogopher.jpg" alt="" /> -->
    </div>
  </div>
</template>

<style>
html,
body {
  width: 100vw;
  height: 100vh;
  margin: unset;
  overflow: hidden;
}

#app{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 100vw;
}

.image-wrapper {
  width: 200px;
  height: 200px;
  margin-left: 30px;
}

.image-wrapper:first-of-type {
  margin-left: unset;
}

.image-wrapper > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: inline-block;

  object-fit: cover;
}
</style>
