<template>
  <div class="bill">
    <div class="bill_head">
      <div class="bill_head_title">碎碎记·账</div>
      <div class="bill_head_main">
        <div class="main_year" @click="monthToggle">{{ currentTime.currentYear }}年</div>
        <div class="main_income_title">收入</div>
        <div class="main_expend_title">支出</div>
        <div class="main_month main_text" @click="monthToggle">
          {{ currentTime.currentMonth }}
          <span>月</span>
          <img src="../../assets/icon/down.png" />
        </div>
        <div class="main_income_num main_text">{{ totalIncome }}</div>
        <div class="main_expend_num main_text">{{ totalExpend }}</div>
      </div>

      <div class="bill_head_card">
        <div class="card_bill" @click="toggleVisit">
          <p class="card_icon">
            <img src="../../assets/icon/bill.png" alt="" />
          </p>
          <span> 账单 </span>
        </div>
        <div class="card_add">
          <span>记账</span>
          <div class="card_add_btn" @click="addToggle">
            <p>
              <img src="../../assets/icon/add.png" alt="" />
            </p>
          </div>
        </div>
        <div class="card_more">
          <p class="card_icon">
            <img src="../../assets/icon/more.png" alt="" />
          </p>
          <span> 更多 </span>
        </div>
      </div>
    </div>
    <div class="bill_bfc">
      <div class="bill_content" v-for="items in listData" :key="items.id">
        <div class="bill_content_head">
          <div class="head_date">
            <div class="date_day">{{items.date}}</div>
            <div class="date_week">星期五</div>
          </div>
          <div class="head_type">
            <span v-if="items.income !== 0">收入：{{ items.income }}</span>
            <span v-if="items.expend !== 0">支出：{{ items.expend }}</span>
          </div>
        </div>

        <div class="bill_content_list" v-for="item in  items.dayList" :key="item.bill_nums">
          <div class="bill_type_left">
            <p>
              <!-- <img src="../../assets/expend/diet.png" alt="" /> -->
              <i class="iconfont" :class="item.icon"></i>
            </p>
          </div>
          <div class="bill_type_right">
            <p>{{item.remarks || item.type_name}}</p>
            <span><span v-if="item.pay_type === 1">-</span>{{ item.amount }}</span>
          </div>
        </div>
      </div>

      <div class="tmp_nav"></div>
    </div>
    <!-- 弹窗类型 -->
    <!-- 时间选择 -->
    <PopMonth ref="popMonthRef" @select="selectMonth"></PopMonth>
    <!-- 记账弹窗 -->
    <PopAdd ref="popAddRef" @update="updateList"></PopAdd>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { onMounted, reactive, ref } from "vue";
import PopMonth from "../../components/PopMonth.vue";
import PopAdd from "../../components/PopAdd.vue";
import { getBillList } from '../../api/bill/bill'
import { useRouter } from "vue-router";
import { showFailToast } from "vant";
// import { dealList } from '../../utile/bill/filter'
export default {
  components: {
    PopMonth,
    PopAdd
  },
  setup() {
    const router = useRouter()
    interface ITimeData {
      currentYear: string;
      currentMonth: string;
    }
    // 当前年月
    let currentTime: ITimeData = reactive({
      currentYear: dayjs(new Date()).format("YYYY"),
      currentMonth: dayjs(new Date()).format("MM"),
    });
    // 日期弹窗组件的dom
    const popMonthRef = ref(null)
    // 记账弹窗组件的dom
    const popAddRef = ref(null)
    // 账单列表
    const listData = ref(null)
    // 总支出
    const totalExpend = ref(0)
    // 总收入
    const totalIncome = ref(0)
    // 日期弹窗
    const monthToggle = () => {
      popMonthRef.value.toggle()
    }
    // 日期回显
    const selectMonth = (item: any) => {
      currentTime.currentYear = item[0]
      currentTime.currentMonth = item[1]
    }
    // 记账弹窗
    const addToggle = () => {
      popAddRef.value.togglePop()
    }
    
    // 计算月总支出和月总收入
    const computedBill = (data: Array<any>) => {
      totalExpend.value = data.reduce((pre:number,item: number, index: number, arr: any) => {
        return pre + arr[index].expend
      },0)
      totalIncome.value = data.reduce((pre:number,item: number, index: number, arr: any) => {
        return pre + arr[index].income
      },0)
    }
    // 获取账单
    const getBill = async(account: string, date: string) => {

      await getBillList(account, date).then(res => {
        if (res.code == 401) {
          showFailToast(res.msg)
          router.push('/login')
          return
        }
        listData.value = res.data
        computedBill(res.data)
      })
    }
    // 添加账单后更新数据
    const updateList = () => {
      let account = window.sessionStorage.getItem('account')
      let date = `${currentTime.currentYear}-${currentTime.currentMonth}`
      getBill(account, date)
    }
    // 月账可视化
    const toggleVisit = () => {
      let date = `${currentTime.currentYear}-${currentTime.currentMonth}`
      router.push({
        path: '/visualData',
        query: {date}
      })
    }
    onMounted(async () => {
      updateList()
    })
    return {
      currentTime,
      selectMonth,
      monthToggle,
      popMonthRef,
      popAddRef,
      addToggle,
      listData,
      totalExpend,
      totalIncome,
      updateList,
      toggleVisit
    };
  },
};
</script>

<style lang="scss" scoped>
.bill {
  height: 100%;
  position: relative;
  overflow: hidden;

  .bill_head {
    padding-top: 10px;
    height: 140px;
    // border-radius: 0 0 15px 15px;
    position: relative;
    // background-color: $primary;
    background-image: linear-gradient(to bottom, $primary, $color-bg-light 99%);

    .bill_head_title {
      text-align: center;
      font-family: $text-style;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 1px;
    }

    .bill_head_main {
      margin: 15px;
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-gap: 10px;
      grid-auto-rows: minmax(15px, auto);
      font-size: 14px;
      position: relative;

      .main_year {
        grid-column: 1 / 3;
        grid-row: 1;
      }

      .main_income_title {
        padding-left: 5px;
        grid-column: 3 / 6;
        grid-row: 1;
      }

      .main_expend_title {
        grid-column: 6 / 9;
        grid-row: 1;
      }

      .main_month {
        grid-column: 1 / 3;
        grid-row: 2;
        border-right: 1px solid gray;

        span {
          font-size: 14px;
        }

        img {
          height: 14px;
          width: 14px;
        }
      }

      .main_income_num {
        padding-left: 5px;
        grid-column: 3 / 6;
        grid-row: 2;
      }

      .main_expend_num {
        grid-column: 6 / 9;
        grid-row: 2;
      }

      .main_text {
        font-size: 25px;
      }
    }

    .bill_head_card {
      width: calc(100% - 20px);
      height: 55px;
      margin: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      bottom: -15px;
      font-size: 13px;
      text-align: center;
      // border: 1px solid black;
      border-radius: 8px;
      background-color: $color-bg-light;
      box-shadow: 4px 4px 10px #cccaca;

      .card_bill {
        margin-left: 40px;
      }

      .card_more {
        margin-right: 40px;
      }

      .card_add {
        position: relative;

        // width: 20px;
        .card_add_btn {
          position: absolute;
          width: 60px;
          height: 60px;
          bottom: -60px;
          left: 50%;
          border-radius: 30px;
          background-color: #ffffff;
          transform: translateX(-50%);

          p {
            width: 50px;
            height: 50px;
            margin: 5px auto;
            background-color: $primary;
            border-radius: 25px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              height: 30px;
              width: 30px;
            }
          }
        }
      }
    }
  }

  .bill_bfc {
    // margin-top: 30px;
    overflow: scroll;
    position: absolute;
    height: calc(100% - 220px);
    top: 200px;
    width: 100%;

    .tmp_nav {
      height: 30px;
      width: 100%;
    }
  }

  .bill_bfc::-webkit-scrollbar {
    display: none;
  }

  .bill_content {
    .bill_content_head {
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px 10px;
      //   border-bottom: 2px solid $color-bg-light;
      position: sticky;
      top: 0;
      background-color: $color-bg-light;

      .head_date {
        display: flex;

        .date_day {
          margin-right: 5px;
        }
      }
      .head_type {
        span {
          margin-left: 10px;
        }
      }
    }

    .bill_content_list {
      display: flex;
      font-size: 16px;
      margin: 5px 10px;

      .bill_type_left {
        // display: flex;
        // align-items: center;

        p {
          margin-right: 5px;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          background-color: $color-bg-light;
          display: flex;
          justify-content: center;
          align-items: center;
          .iconfont {
            font-size: 20px;
            line-height: 30px;
          }
        }
        
      }

      .bill_type_right {
        width: calc(100% - 40px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        // border-bottom: 1px solid $color-bg-light;
        border-bottom: 2px solid $color-bg-light;
        p {
          font-size: 16px;
        }
      }
    }
  }
}</style>