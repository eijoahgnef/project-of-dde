<template>
    <div class="mine">
        <div class="mine_head">
            <div class="mine_head_avatar">
                <div class="mine_head_avatar_out">
                    <p>
                        <img src="../../assets/icon/off-line.png" alt="">
                    </p>
                </div>
            </div>
            <div class="mine_head_status">
                <p v-if="!account">未登录</p>
                <p v-else>{{ account }}</p>
            </div>
        </div>
        
        <div class="mine_list" v-for="item in menuListdata" :key="item.menuId">
            <div class="mine_list_menu" v-for="data in item.menu" :key="data.id">
                <div class="mine_list_menu_left">
                    <p class="icon">
                        <img :src="data.imgsrc">
                    </p>
                    <p class="icon_des">{{data.name}}</p>
                </div>
                <div class="mine_list_menu_right">
                    <p class="icon_right">
                        <img src="../../assets/icon/right.png" alt="">
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';

export default {
    setup() {
        const menuListdata = [
            {
                menuId: 1,
                menu: [
                    {id: 1, imgsrc: "../../../src/assets/icon/bill.png", name: '我的账本'},
                    {id: 2, imgsrc: "../../../src/assets/icon/photoset.png", name: '我的图册'},
                ],

            },
            {
                menuId: 2,
                menu: [
                    {id: 1, imgsrc: "../../../src/assets/icon/set.png", name: '设置'},
                    {id: 3, imgsrc: "../../../src/assets/icon/feedback.png", name: '意见反馈'},
                    {id: 2, imgsrc: "../../../src/assets/icon/jiyi.png", name: '关于碎碎记 1.0'},
                ]
            }
    ]
        const account = ref(null)
        onMounted(() => {
            account.value = window.sessionStorage.getItem("account")
        })
        return {
            menuListdata,
            account
        }
    }
}
</script>

<style lang="scss" scoped>
.mine {
    padding: 50px 10px 0;
    height: calc(100% - 50px);
    background-color: $color-bg-light;
    .mine_head {
        width: 100%;
        background-color: $color-box-light;
        // background-color: $primary-a;
        height: 110px;
        border-radius: 15px;
        .mine_head_avatar{
            position: relative;
            .mine_head_avatar_out {
                height: 90px;
                width: 90px;
                position: absolute;
                border-radius: 45px;
                background-color: $color-box-light;
                left: 50%;
                top: -30px;
                transform: translateX(-50%);
            }
            p {
                margin: 5px auto;
                height: 80px;
                width: 80px;
                background-color: rgb(180, 176, 176);
                border-radius: 40px;
                overflow: hidden;
                img {
                    height: 80px;
                    width: 80px;
                }
            }
        }
        .mine_head_status {
            color: $color-box-light;
            color: #000000;
            font-size: 25px;
            letter-spacing: 3px;
            font-family: $text-style;
            display: flex;
            justify-content: center;
            p {
                margin-top: 70px;
            }
        }
    }

    .mine_list {
        margin-top: 30px;
        background-color: $color-box-light;
        border-radius: 8px;
        .mine_list_menu {
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 8px;
            border-bottom: 1px solid $color-bg-light;
            // border-bottom: 10px solid black;
            .mine_list_menu_left {
                flex: 1;
                display: flex;
                align-items: center;
                font-size: 20px;
                .icon_des {
                    width: 260px;
                    margin-left: 5px;
                    font-size: 16px;
                    line-height: 32px;
                    letter-spacing: 1px;
                }
            }
            .mine_list_menu_right {
                .icon_right {
                    img {
                        height: 20px;
                        width: 20px;
                    }
                }
            }
        }
        // .mine_list_menu::after {
        //     content: "";
        //     width: 10px;
        //     height: 10px;
        //     border: 1px solid black;
        // }
    }
}
</style>