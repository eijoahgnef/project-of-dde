<template>
  <router-view></router-view>
  <Navbar v-if="route.meta.showBar"></Navbar>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navbar from './components/NavBar.vue'

export default {
  components: {
    Navbar
  },
  setup() {
    let show = ref(false)
    const menu = reactive(['/photoalbum', '/notepad', '/bill', '/mine'])
    const router = useRouter()
    const route = useRoute()
    
    // router.afterEach(() => {
    //   console.log(router.currentRoute.value.path);
      
    //   console.log('路由跳转了', menu.includes(router.currentRoute.value.path));
      
    //   show.value = menu.includes(router.currentRoute.value.path)
    // })

    return {
      show,
      route,
      router,
      menu
    }
  },
}
</script>

<style>
/* html,body,#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
} */
</style>
