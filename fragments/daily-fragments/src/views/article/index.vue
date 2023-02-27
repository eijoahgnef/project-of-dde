<template>
    <!-- <van-popup v-model:show="showDiary" position="bottom" :style="{ height: '100%' }" duration="0.3"> -->
        <div class="article">
            <div class="article_head">
                <div class="head_left" @click="cancelBook">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <div class="diary_title">{{ title }}</div>
                <div class="head_right" >
                    <i class="iconfont"></i>
                </div>
            </div>
            <div class="article_content">
                <div class="article_date">
                    <div class="date_today">{{ date }}</div>
                    <div class="date_week">{{ week }}</div>
                </div>
                <div class="article_des">
                    <!-- <input type="text" style="background-color: #FFC296;"> -->
                    <!-- <textarea class="diary_text" v-model="msg" style="background-color: #FFC296;" placeholder="记录生活吧！" maxlength="500"></textarea> -->
                    <!-- <div class="text_remind">{{msg.length}}/500</div> -->
                    <div class="article_text"><div v-text="content"></div></div>
                </div>
            </div>
        </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDiaryContent } from '../../api/diary/diary'

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        // 标题
        const title = ref('')
        // 日期
        const date = ref('')
        // 星期
        const week = ref('')
        // 内容
        const content = ref('')
        // 返回页面
        const cancelBook = () => {
            router.push('/diary')
        }
        onMounted(async () => {
            let id = route.query.id
            let account = window.sessionStorage.getItem("account")
            await getDiaryContent(account, id).then(res => {
                let info = res.data[0]
                title.value = info.title
                date.value = info.keep_date
                week.value = info.keep_week
                content.value = info.text
            })
        })
        return {
            cancelBook,
            title,
            date,
            week,
            content
        }
    }
}
</script>

<style lang="scss" scoped>
.article {
    background-color: $color-card;
    font-family: $text-style;
    height: 100%;
    overflow: scroll;
    position: relative;
    .article_head {
        width: 350px;
        position: absolute;
        top: 5px;
        left: 12px;
        padding-bottom: 10px;
        border-bottom: 1px solid #000;
        display: flex;
        justify-content: space-between;
        .diary_title {
            font-family: $text-style;
            font-size: 20px;
            line-height: 50px;
            text-align: center;
        }
        .iconfont {
            font-size: 30px;
        }
    }

    .article_content {
        padding-top: 70px;
        .article_date {
            padding: 0 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 20px;
        }
        .article_des {
            margin: 10px 15px 0;
            position: relative;
            .article_text {
                // border: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 345px;
                height: 520px;
                font-size: 20px;
                border: 1px solid black;
            }
        }
    }
}
</style>
