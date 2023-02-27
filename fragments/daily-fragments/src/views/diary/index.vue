<template>
  <div class="diary">
    <div class="diary_head">
      <div class="diary_head_title">碎碎记·事</div>
    </div>
    <div class="diary_content">
      <div class="diary_list">
        <div class="diary_list_cards" v-for="item in diaryList" :key="item.insert_id" @click="browse(item.insert_id)">
          <div class="card_title">{{ item.title }}</div>
          <div class="card_des">
            <div class="card_des_time">{{ item.keep_date }}</div>
            <div class="card_des_week">{{ item.keep_week }}</div>
          </div>
        </div>
        
        <div class="diary_add_btn" @click="addDiary">每日一记</div>
      </div>
      
    </div>
    <!-- 写日记 -->
    <PopDiary ref="popDiary" @refresh="refresh"></PopDiary>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import PopDiary from "../../components/PopDiary.vue";
import { getDiaryList } from "../../api/diary/diary"
import { showFailToast } from "vant";
export default {
  components: {
    PopDiary
  },
  setup() {
    const router = useRouter()

    // PopDiary的dom
    const popDiary = ref(null)
    // 日记板
    const addDiary = () => {
      popDiary.value.showDiary = true
    }
    // 浏览日记
    const browse = (id: number) => {
      router.push({
        path: '/article',
        query: {id}
      })
    }
    // 日记表
    const diaryList = ref(null)
    // 请求列表
    const hasList = () => {
      let _account = window.sessionStorage.getItem("account")
      getDiaryList(_account).then(res => {
        if (res.code == 401) {
          showFailToast(res.msg)
          router.push('/login')
          return
        } 
        diaryList.value = res.data
      })
    }
    // 更新列表
    const refresh = () => {
      hasList()
    }

    onMounted(async() => {
      await hasList()
    })
    return {
      popDiary,
      addDiary,
      diaryList,
      browse,
      refresh
    }
  },
};
</script>

<style lang="scss" scoped>
  .diary {
    .diary_head {
      height: 25px;
      border-radius: 0 0 50% 50%;
      background-color: $primary;
      position: relative;
      padding-top: 6px;
      padding-left: 10px;
      .diary_head_title {
        position: absolute;
        width: 280px;
        height: 50px;
        line-height: 50px;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 20px;
        background-color: #4C002E;
        color: #FCF9F2;
        text-align: center;
        font-family: $text-style;
        font-size: 28px;
        font-weight: 600;
        letter-spacing: 1px;
        
      }
    }

    .diary_content {
      padding-top: 5px;
      background-color: $color-box-light;
      border-radius: 10px;
      .diary_list {
        margin-top: 30px;
        // height: calc(100% - 20px);
        height: 570px;
        overflow: scroll;
        .diary_list_cards {
          margin: 0 auto 10px;
          background-color: $color-bg-light;
          width: 320px;
          border-radius: 10px;
          padding: 10px;
          box-shadow: 0 5px 6px rgb(76, 76, 76);
          .card_title {
            // margin: 10px 0 10px 10px;
            
            font-size: 14px;
          }
          .card_des {
            font-size: 12px;
            margin-top: 5px;
            display: flex;
            justify-content: space-between;
          }
        }
        .diary_add_btn {
          font-size: 20px;
          line-height: 40px;
          height: 40px;
          width: 140px;
          border-radius: 20px;
          background-color: $color-title-bg;
          color: $color-bg-light;
          font-family: $text-style;
          margin: 10px auto 25px;
          text-align: center;
          box-shadow: 0 5px 6px rgb(76, 76, 76);
        }

       
      }
      .diary_list::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>
