<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="image-wrapper">
    <img v-src="'https://examples-1251000004.cos.ap-shanghai.myqcloud.com/sample.jpeg'" alt="" />
  </div>
</template>

<style>
.image-wrapper {
  width: 300px;
  height: 300px;
}

.image-wrapper > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
