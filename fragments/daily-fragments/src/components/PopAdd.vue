<template>
    <van-popup v-model:show="showAdd" position="bottom" :style="{ height: '100%' }" duration="0.2">
        <div class="add">
            <!-- 添加页的头部 -->
            <div class="add_head">
                <div class="add_head_title" :class="{ title_line: billType == 'expend' }" @click="typeToggle('expend')">
                    <p>支出</p>
                    <div class="line"></div>
                </div>
                <div class="add_head_title" :class="{ title_line: billType == 'income' }" @click="typeToggle('income')">
                    <p>收入</p>
                    <div class="line"></div>
                </div>
                <div class="add_cancle" @click="cancle">
                    <p>取消</p>
                </div>
            </div>
            <!-- 添加页的icon -->
            <div class="add_content">
                <div class="add_content_layout expend" v-if="billType == 'expend'">
                    <div class="type_icon" v-for="item in typeMap.expend" :key="item.id" @click="chooseType(item.name, item.icon)">
                        <div class="icon_wrap">
                            <i class="iconfont" :class="[item.icon, { selected_type: item.name == selectType }]"></i>
                            <span class="type_name">{{ item.name }}</span>
                        </div>
                    </div>
                </div>

                <div class="add_content_layout income" v-else>
                    <div class="type_icon" v-for="item in typeMap.income" :key="item.id" @click="chooseType(item.name, item.icon)">
                        <div class="icon_wrap">
                            <i class="iconfont" :class="[item.icon, { selected_type: item.name == selectType }]"></i>
                            <span class="type_name">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 键盘 -->
            <van-popup v-model:show="showKeybord" duration="0.2" position="bottom" :overlay="false"
                :style="{ height: '50%' }">
                <div class="bill_add">
                    <div class="bill_add_head">
                        <div class="add_head_date" @click="toggleChooseDay">
                            <i class="iconfont icon-rili"></i>
                            {{ showTime === today ? "今天" : showTime }}
                        </div>
                        <div class="add_head_amount animation">{{ amount }}</div>
                    </div>

                    <div class="bill_add_remark">
                        <van-cell-group inset>
                            <van-field v-model="remarks" label="备注" placeholder="点击填写备注" />
                        </van-cell-group>
                    </div>
                    <div class="bill_add_keybord">
                        <van-number-keyboard :show="true" theme="custom" extra-key="." close-button-text="完成"
                            @input="inputNum" @delete="deleteNum" @close="submitBill()"/>

                    </div>
                </div>
            </van-popup>
            <!-- 选择日期 -->
            <van-popup v-model:show="showDateSelect" position="bottom" :style="{ height: '40%' }">
                <van-date-picker v-model="currentDay"  title="选择年月" :columns-type="columnsType"
                    @confirm="choseDay" @cancel="cancelChose" />
            </van-popup>
        </div>
    </van-popup>
</template>

<script lang="ts">
import { ref } from "vue";
import { typeMap } from "../utile/bill/iconData";
import dayjs from "dayjs";
import { showFailToast, showToast } from "vant";
import { addBill } from '../api/bill/bill'
import { useRouter } from "vue-router";

export default {
    setup(props, ctx) {
        const router = useRouter()
        // 是否展示添加页
        const showAdd = ref(false);
        // 是否展示键盘
        const showKeybord = ref(false);
        // 是否展示日期
        const showDateSelect = ref(false)
        // 选中的icon的名字
        const selectType = ref('');
        // 选择的icon
        const iconClass = ref('')
        // 账单类型
        const billType = ref("expend");
        // 添加的备注
        const remarks = ref('')
        // 金额
        const amount = ref('0')
        // 显示的时间
        const showTime = ref(dayjs(new Date()).format("YYYY-MM-DD").replace(/-/g,'/'))
        // 当前日期
        const currentDay = ref([
            dayjs(new Date()).format("YYYY"),
            dayjs(new Date()).format("MM"),
            dayjs(new Date()).format("DD")
        ])
        // 今天
        const today = ref(dayjs(new Date()).format("YYYY-MM-DD").replace(/-/g,'/'))
        
        // 日期选项类型
        const columnsType: any = ["year", "month", "day"]
        // 显隐bill
        const togglePop = () => {
            showAdd.value = !showAdd.value;
        };
        // 选中类型
        const chooseType = (name: string, icon: string) => {
            selectType.value = name;
            iconClass.value = icon
            showKeybord.value = true
        };
        //  切换icon类型
        const typeToggle = (str: string) => {
            if (billType.value !== str) {
                billType.value = str;
                showKeybord.value = false
                selectType.value = null;
                showTime.value = today.value
            }
        };
        // 取消添加账单
        const cancle = () => {
            selectType.value = null;
            billType.value = "expend";
            showAdd.value = false;
            showKeybord.value = false;
            amount.value = '0'
            showTime.value = today.value
            remarks.value = ''
        };
        // 输入数字
        const inputNum = (inputValue: string) => {
            if (amount.value === '0') amount.value = ''
            // 多个点不允许
            if (inputValue == "." && amount.value.includes('.')) return
            // 
            if (amount.value.includes('.') && amount.value.split('.')[1].length >= 2) return
            amount.value = amount.value + inputValue

        }
        // 键盘删除键
        const deleteNum = () => {
            if (amount.value.length === 1) {
                amount.value = '0'
                return
            }
            amount.value = amount.value.slice(0, amount.value.length - 1)
        }
        // 确认选择的日期
        const choseDay = (item: any) => {
            
            currentDay.value = item.selectedValues
            showTime.value = item.selectedValues.join("/")
            
            showDateSelect.value = false
            
        }
        // 取消选择日期
        const cancelChose = () => {
            showDateSelect.value = false
        }
        const toggleChooseDay = () => {
            showDateSelect.value = true
        }
        // 完成按钮触发的事件
        const submitBill = async () => {
            if (Number(amount.value) === 0) {
                showToast('请输入金额')
                return
            }
            let account = window.sessionStorage.getItem("account")
            let params = {
                account: account,
                amount: Number(amount.value),
                pay_type: billType.value === 'expend' ? 1 : 2,
                type_name: selectType.value,
                icon: iconClass.value,
                remarks: remarks.value || "",
                date: showTime.value
            }
            
            await addBill(JSON.stringify(params)).then((res) => {
                if (res.code == 401) {
                    showFailToast(res.msg)
                    router.push('login')
                    return
                }
                selectType.value = null;
                billType.value = "expend";
                showAdd.value = false;
                showKeybord.value = false;
                amount.value = '0'
                showTime.value = today.value
                remarks.value = ''
                ctx.emit("update")
            })
            
            
        }
        return {
            showAdd,
            togglePop,
            typeMap,
            chooseType,
            selectType,
            billType,
            typeToggle,
            cancle,
            showKeybord,
            remarks,
            inputNum,
            deleteNum,
            amount,
            showDateSelect,
            currentDay,
            columnsType,
            choseDay,
            cancelChose,
            toggleChooseDay,
            showTime,
            today,
            submitBill
            // addBill
        };
    },
};
</script>

<style lang="scss" scoped>
.add {
    height: 100%;
    background-color: $color-bg-light;

    .add_head {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        height: 60px;
        font-size: 20px;
        font-weight: 200;
        background-color: $primary;
        position: relative;

        .add_head_title {
            margin: 4px 10px;

            p {
                padding-bottom: 10px;
            }
        }

        .add_cancle {
            font-size: 16px;
            position: absolute;
            line-height: 45px;
            right: 15px;
        }

        .title_line {
            position: relative;

            .line {
                position: absolute;
                bottom: 0;
                left: 0;
                border-bottom: 2px solid $color-box-light;
                width: 40px;
                height: 10px;
                transition-duration: 0.3s;
            }
        }
    }

    .add_content {
        width: 375px;
        padding-top: 10px;

        .add_content_layout {
            width: 341px;
            display: flex;
            flex-wrap: wrap;
            padding: 0 17px;

            .type_icon {
                width: 85px;
                height: 85px;
                display: flex;
                justify-content: center;
                align-items: center;

                .icon_wrap {
                    display: flex;
                    flex-direction: column;

                    .iconfont {
                        width: 50px;
                        height: 50px;
                        font-size: 35px;
                        border-radius: 25px;
                        background-color: $color-box-light;
                        line-height: 50px;
                        text-align: center;
                    }

                    .selected_type {
                        background-color: $primary;
                        transition: 0.4s;
                    }

                    .type_name {
                        margin-top: 5px;
                        font-size: 14px;
                        text-align: center;
                    }
                }
            }
        }
    }


    .bill_add {
        background-color: $color-bg-light;

        // margin-top: 5px;
        // box-shadow: 0px -10px 10px #000;
        .bill_add_head {
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .add_head_date {
                font-size: 15px;
                letter-spacing: 1px;
            }

            .add_head_amount {
                text-align: right;
                font-size: 30px;
                height: 30px;
            }
        }

        .bill_add_remark {
            background-color: #ffffff;
            padding-bottom: 10px;
        }
    }
}
</style>
<style lang="scss">
.add .van-popup.van-popup--bottom {
    box-shadow: 0px -2px 10px #cccaca;
}
</style>