<template>
  <!-- <van-tabbar v-model="active" active-color="#0099CC"> -->
  <van-tabbar v-model="active" active-color="#FF5531">
      <van-tabbar-item icon="home-o" to="/diary" name="/diary">日记</van-tabbar-item>
      <van-tabbar-item icon="like-o" to="/notepad" name="/notepad">心情</van-tabbar-item>
      <van-tabbar-item icon="coupon-o" to="/bill" name="/bill">账单</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/mine" name="/mine">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { useRouter } from 'vue-router';
import { onMounted } from '@vue/runtime-core';
export default {
  setup() {
    const active = ref('/photoAlbum');
    const router = useRouter()

    onMounted(() => {
      active.value = router.currentRoute.value.path
    })
    router.afterEach(() => {
      active.value = router.currentRoute.value.path
    })
    return {
      active,
    };
  },
};
</script>

<style>

</style>