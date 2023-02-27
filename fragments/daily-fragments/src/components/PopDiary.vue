<template>
    <van-popup v-model:show="showDiary" position="bottom" :style="{ height: '100%' }" duration="0.3">
        <div class="book">
            <div class="book_head">
                <div class="head_left" @click="cancelBook">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <textarea v-model="diaryTitle" class="book_title" maxlength="10" style="background-color: #FFC296;" placeholder="标题"></textarea>
                <div class="head_right" @click="recordIt">
                    <i class="iconfont icon-jilu"></i>
                </div>
            </div>
            <div class="book_content">
                <div class="book_date">
                    <div class="date_today">{{ date }}</div>
                    <div class="date_week">{{ weekArray[weekIndex] }}</div>
                </div>
                <div class="book_des">
                    <!-- <input type="text" style="background-color: #FFC296;"> -->
                    <textarea class="diary_text" v-model="msg" style="background-color: #FFC296;" placeholder="记录生活吧！" maxlength="500"></textarea>
                    <div class="text_remind">{{msg.length}}/500</div>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';
import { keepDiary } from '../api/diary/diary'
import { showFailToast, showToast } from 'vant';

export default {
    setup(props, ctx) {
        // 是否展示日记
        const showDiary = ref(false)
        // 日期
        const date = ref(dayjs(new Date()).format("YYYY-MM-DD"))
        const weekArray = ['星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        const weekIndex = new Date().getDay()
        // 日记的初始数据
        const msg = ref('')
        //日记标题
        const diaryTitle = ref('')
        // 返回页面
        const cancelBook = () => {
            showDiary.value = false
        }
        // 记录日记
        const recordIt = async() => {
            if (!msg.value) {
                showToast('内容不能为空哦！')
                return
            }
            if (!diaryTitle.value) {
                showToast('取个标题吧')
                return
            }
            let account = window.sessionStorage.getItem('account')
            let keep_date = date.value
            let keep_week = weekArray[weekIndex]
            let text = msg.value
            let title = diaryTitle.value
            await keepDiary([account, keep_date, keep_week, text, title]).then(res => {
                if (res.code == 401) {
                    showFailToast(res.msg)
                    return
                }
                showToast(res.msg)
            })
            ctx.emit("refresh")
            msg.value = ''
            diaryTitle.value = ''
            showDiary.value = false
            
        }
        return {
            showDiary,
            cancelBook,
            date,
            weekArray,
            weekIndex,
            msg,
            recordIt,
            diaryTitle
        }
    }
}
</script>

<style lang="scss" scoped>
.book {
    background-color: $color-card;
    font-family: $text-style;
    height: 100%;
    overflow: scroll;
    position: relative;
    .book_head {
        width: 350px;
        position: absolute;
        top: 5px;
        left: 12px;
        padding-bottom: 10px;
        border-bottom: 1px solid #000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .book_title {
            font-family: $text-style;
            font-size: 15px;
            line-height: 20px;
            width: 150px;
            height: 20px;
            text-align: center;
            border-radius: 10px;
        }
        .iconfont {
            font-size: 30px;
        }
    }

    .book_content {
        padding-top: 70px;
        .book_date {
            padding: 0 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 20px;
        }
        .book_des {
            margin: 10px 15px 0;
            position: relative;
            .diary_text {
                // border: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 345px;
                height: 520px;
                font-size: 20px;
            }
            .text_remind {
                position: absolute;
                top: 500px;
                right: 0;
                font-size: 20px;
            }
        }
    }
}
</style>
