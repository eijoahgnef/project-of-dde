<template>
    <div class="visual">
        <div class="visual_back">
            <i class="iconfont icon-fanhui1" @click="backhome">返回</i>
        </div>
        <div class="visual_head">
            <div class="visual_head_time" @click="monthToggle">
                <span>{{ date }}</span>
                <i class="iconfont icon-rili"></i>
            </div>
            <div class="head_title">共支出</div>
            <div class="head_expense">￥{{ totalExpend }}</div>
            <div class="head_income">共收入 ￥{{ totalIncome }}</div>
        </div>

        <div class="visual_structure">
            <div class="structure_head">
                <span class="head_title">收支构成</span>
                <div class="structure_head_tab">
                    <span class="expend" :class="{ active: barType === 'expend' }"
                        @click="toggleBarType('expend')">支出</span>
                    <span class="income" :class="{ active: barType === 'income' }"
                        @click="toggleBarType('income')">收入</span>
                </div>
            </div>

            <div class="structure_content">
                <div class="structure_item" v-for="item in (barType === 'expend' ? expendInfo : incomeInfo)" :key="item">
                    <div class="item_left">
                        <div class="item_type">
                            <span>
                                <i class="iconfont" :class="item.icon"></i>
                            </span>
                            <span>{{ item.type_name }}</span>
                        </div>
                        <div class="progress">{{ (item.amount / (barType === 'expend' ? totalExpend : totalIncome) *
                            100).toFixed(2) }}%</div>
                    </div>
                    <div class="item_right">
                        <div class="item_persent">
                            <van-progress
                                :percentage="(item.amount / (barType === 'expend' ? totalExpend : totalIncome) * 100).toFixed(2)"
                                stroke-width="8" color="#FF5531" :show-pivot="false" />
                        </div>
                        <div class="item_amount">￥{{ item.amount }}</div>
                    </div>
                </div>

            </div>
        </div>

        <div class="visual_data">
            <div class="data_head">
                <span class="data_title">收支占比</span>
                <div class="data_head_tab">
                    <span class="expend" :class="{ active: pieType === 'expend' }"
                        @click="togglePieType('expend')">支出</span>
                    <span class="income" :class="{ active: pieType === 'income' }"
                        @click="togglePieType('income')">收入</span>
                </div>
            </div>
        </div>
        <!-- echatrts -->
        <div id="echarts"></div>
        <PopMonth ref="popMonthRef" @select="selectMonth"></PopMonth>
    </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getMonth } from '../../api/bill/bill';
import PopMonth from '../../components/PopMonth.vue';
import * as echarts from 'echarts/core';
import {
    ToolboxComponent,
    ToolboxComponentOption,
    LegendComponent,
    LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

export default {
    components: {
        PopMonth
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const date = ref(null)
        // 总支出
        const totalExpend = ref(null)
        // 总收入
        const totalIncome = ref(null)
        // 支出详情
        const expendInfo = ref([])
        // 收入详情
        const incomeInfo = ref([])
        // echarts的初始化对象
        let keyEchart: any
        // 日期回显
        const selectMonth = async (item: any) => {
            date.value = `${item[0]}-${item[1]}`
            await getData()
            if (state.pieType === 'expend') {
                setOptionFn(state.expend_data)
            } else {
                setOptionFn(state.income_data)
            }
            setOptionFn
        }
        // 弹窗的dom
        const popMonthRef = ref(null)
        // 日期弹窗
        const monthToggle = () => {
            popMonthRef.value.toggle()
        }
        const backhome = () => {
            router.go(-1)
        }
        // 显示的类型
        const state = reactive({
            barType: 'expend',
            pieType: 'expend',
            expend_data: [],
            income_data: []
        })
        // 条状图类型切换
        const toggleBarType = (value: string) => {
            state.barType = value
        }
        // 设置echarts的option
        const setOptionFn = (data: any) => {
            keyEchart.setOption({
                legend: {
                    top: 'top'
                },
                series: [
                    {
                        name: state.pieType === 'expend' ? '支出' : '收入',
                        type: 'pie',
                        radius: [50, 100],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 8
                        },
                        data: data.map((item: { amount: any; type_name: any; }) => {
                            return { value: item.amount, name: item.type_name }
                        })
                    }
                ]
            })
        }
        // echarts数据切换
        const togglePieType = (value: string) => {
            if (state.pieType === value) return
            state.pieType = value
            if (state.pieType === 'expend') {
                setOptionFn(state.expend_data)
            } else {
                setOptionFn(state.income_data)
            }
        }
        echarts.use([
            ToolboxComponent,
            LegendComponent,
            PieChart,
            CanvasRenderer,
            LabelLayout
        ]);
        type EChartsOption = echarts.ComposeOption<
            ToolboxComponentOption | LegendComponentOption | PieSeriesOption
        >;

        const initVisualData = () => {
            const _data = state.pieType === 'expend' ? state.expend_data : state.income_data
            let myEcharts = document.getElementById('echarts')
            let myChart = echarts.init(myEcharts);
            keyEchart = myChart
            let option: EChartsOption;
            option = {
                legend: {
                    top: 'top'
                },
                series: [
                    {
                        name: state.pieType === 'expend' ? '支出' : '收入',
                        type: 'pie',
                        radius: [50, 100],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 8
                        },
                        data: _data.map(item => {
                            return { value: item.amount, name: item.type_name }
                        })
                    }
                ]
            };

            option && myChart.setOption(option);

        }
        const getData = async () => {

            let account = window.sessionStorage.getItem('account')

            await getMonth(account, date.value).then(res => {
                totalExpend.value = res.data.totalExpend
                totalIncome.value = res.data.totalIncome
                expendInfo.value = res.data.expendList
                incomeInfo.value = res.data.incomeList
            })
            state.expend_data = expendInfo.value.sort((a, b) => b.amount - a.amount)
            state.income_data = incomeInfo.value.sort((a, b) => b.amount - a.amount)
        }
        onMounted(async () => {
            date.value = route.query.date
            await getData()
            initVisualData()

        })
        return {
            date,
            totalExpend,
            totalIncome,
            expendInfo,
            incomeInfo,
            ...toRefs(state),
            toggleBarType,
            togglePieType,
            selectMonth,
            monthToggle,
            popMonthRef,
            backhome
        }
    }
}
</script>

<style lang="scss" scoped>
.visual {
    background-color: $color-bg-light;
    .visual_back {
        padding-left: 10px;
        line-height: 30px;
        .iconfont {
            color: $primary;
        }
    }
    .visual_head {
        background-color: #fff;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        // background-image: linear-gradient(to bottom, $primary 70%, $color-bg-light);
        padding: 24px 0;
        margin-bottom: 10px;

        .visual_head_time {
            background-color: $color-bg-light;
            display: flex;
            padding: 5px 10px;
            margin-bottom: 18px;

            span {
                // color: $text-color;
                font-size: 20px;
            }

            span::after {
                content: "";
                margin: 0 8px;
                border-right: 1px solid rgba(0, 0, 0, 0.6);
            }

            .iconfont {
                color: black;
                line-height: 20px;
            }
        }

        .head_title {
            font-size: 12px;
            color: $primary;
            margin-bottom: 8px;
        }

        .head_expense {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 16px;
            color: $primary;
            letter-spacing: 1px;
        }

        .head_income {
            font-size: 16px;
            letter-spacing: 1px;

        }
    }

    .visual_structure {
        background-color: #fff;
        padding: 0 10px;

        .structure_head {
            display: flex;
            font-size: 18px;
            padding: 12px 0;
            justify-content: space-between;

            .structure_head_tab {
                span {
                    margin: 0 5px;
                    padding: 2px;
                    border-radius: 5px;
                    font-weight: 500;
                    background-color: $color-bg-light;
                }

                .expend {
                    &.active {
                        color: $primary;
                        background-color: $text-bg;
                    }
                }

                .income {
                    &.active {
                        color: $primary;
                        background-color: $text-bg;
                    }
                }
            }
        }

        .structure_content {
            margin-bottom: 10px;

            .structure_item {
                font-size: 12px;
                display: flex;
                justify-content: space-between;
                height: 50px;

                .item_left {
                    display: flex;
                    align-items: center;

                    .item_type {
                        display: flex;
                        align-items: center;

                        span:nth-of-type(1) {
                            width: 30px;
                            height: 30px;
                            border-radius: 15px;
                            background-color: $primary;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-right: 10px;
                        }

                        .iconfont {
                            text-align: center;
                            color: #fff;
                        }
                    }

                    .progress {
                        margin-left: 10px;
                    }
                }

                .item_right {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 220px;

                    .item_persent {
                        width: 160px;
                    }

                    .item_amount {
                        margin-left: 20px;
                    }
                }
            }
        }

    }

    .visual_data {
        background-color: #fff;
        padding: 0 10px;

        .data_head {
            font-size: 18px;
            padding: 12px 0;
            display: flex;
            justify-content: space-between;

            .data_head_tab {
                span {
                    margin: 0 5px;
                    padding: 2px;
                    border-radius: 5px;
                    font-weight: 500;
                    background-color: $color-bg-light;
                }

                .expend {
                    &.active {
                        color: $primary;
                        background-color: $text-bg;
                    }

                }

                .income {
                    &.active {
                        color: $primary;
                        background-color: $text-bg;
                    }

                }
            }
        }
    }

    #echarts {
        width: 100%;
        height: 400px;
        background-color: #fff;
    }
}
</style>