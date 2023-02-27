<template>
  <div class="notepad">
    <div class="notepad_head">
      <div class="notepad_head_title">碎碎记·图</div>
    </div>
    <div class="notepad_content_upload">
      <div class="upload_main">
        <div class="upload_main_title">今天</div>
        <div class="upload_main_area" @click="goUpload">
          <i class="iconfont icon-xiangji"></i>
        </div>
      </div>

      <div class="upload_list">
        <div class="list_item" v-for="item in dataList" :key="item.inserr_id">
          <div class="list_item_date">
            <div class="date_day">{{ item.date.slice(8, 10) }}</div>
            <div class="date_month">{{ item.date.slice(5, 7) }}月</div>
          </div>
          <div class="list_item_pic">
            <div class="item_pic_des">{{ item.text }}</div>
            <!-- <p>
              <img src="https://ts1.cn.mm.bing.net/th?id=OIP-C.F70DZutc2tSQNEH0mW9dGgHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="">
            </p> -->
            <div class="item_pic_wrap">
              <p v-for="imgurl in item.imgList" :key="imgurl">
                <img :src="imgurl.img_url" alt="">
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { showFailToast } from "vant";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { homepage } from "../../api/upload/uploadpic";

export default {
  setup() {
    // 页面列表
    const dataList = ref(null)
    const router = useRouter()
    const goUpload = () => {
      router.push('/upload')
    }
    onMounted(() => {
      let account = window.sessionStorage.getItem("account")
      homepage(account).then(res => {
        if (res.code == 401) {
          showFailToast(res.msg)
          router.push('/login')
          return
        }        
        dataList.value = res.data
      })
    })
    return {
      goUpload,
      dataList
    };
  },
};
</script>

<style lang="scss" scoped>
.notepad {
  // font-size: 100%;
  // position: relative;
  .notepad_head {
    height: 25px;
    border-radius: 0 0 50% 50%;
    background-color: $primary;
    padding-top: 6px;
    position: relative;
    padding-top: 6px;
    padding-left: 10px;

    .notepad_head_title {
      position: absolute;
      width: 280px;
      height: 50px;
      line-height: 50px;
      top: 40%;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 20px;
      background-color: #4c002e;
      color: #fcf9f2;
      text-align: center;
      font-family: $text-style;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 1px;
      z-index: 10;
    }
  }

  .notepad_content_upload {
    border-radius: 10px;
    position: absolute;
    color: $color-bg-light;
    background-color: $color-box-light;
    top: 30px;
    overflow: scroll;
    width: 100%;
    height: calc(100% - 80px);
    // height: 570px;

    .upload_main {

      margin: 10px;
      margin-top: 50px;
      display: flex;
      border-bottom: 1px solid gray;

      .upload_main_title {
        font-size: 30px;
        margin-right: 20px;
      }

      .upload_main_area {
        width: 60px;
        height: 60px;
        border: 1px solid $color-card;
        // background-color: $color-card;
        line-height: 60px;
        text-align: center;
        margin-bottom: 10px;

        .iconfont {
          font-size: 40px;
        }
      }
    }

    .upload_list {
      margin-left: 10px;

      .list_item {
        display: flex;
        margin-bottom: 10px;
        .list_item_date {
          display: flex;

          .date_day {
            font-size: 25px;
          }

          .date_month {
            font-size: 16px;
            width: 16px;
          }
        }

        .list_item_pic {
          margin-left: 10px;

          .item_pic_des {
            font-size: 20px;
          }

          .item_pic_wrap {
            display: flex;
            flex-wrap: wrap;
            p {
              margin-top: 10px;
              margin-right: 5px;
              width: 90px;
              img {
                // width: 300px;
                // height: 100px;
                width: auto;
                max-width: 100%;
              }
            }

          }
        }
      }
    }
  }
}
</style>
