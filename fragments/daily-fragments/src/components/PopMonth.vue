<template>
  <van-popup v-model:show="showDatePick" position="bottom">
    <van-date-picker
      v-model="currentDate"
      type="year-month"
      title="选择年月"
      :columns-type="columnsType"
      @confirm="choseMonth"
      @cancel="toggle"
    />
  </van-popup>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import dayjs from "dayjs";

export default {
  setup(props, ctx) {
    const showDatePick = ref(false);
    const columnsType: any = ["year", "month"];
    // 当前时间
    const currentDate = ref([
      dayjs(new Date()).format("YYYY"),
      dayjs(new Date()).format("MM"),
    ]);
    const toggle = () => {
      showDatePick.value = !showDatePick.value;
    };

    const choseMonth = (item: any) => {
      showDatePick.value = false;
      ctx.emit("select", item.selectedValues);
    };
    return {
      showDatePick,
      currentDate,
      choseMonth,
      toggle,
      columnsType,
    };
  },
};
</script>

<style></style>
