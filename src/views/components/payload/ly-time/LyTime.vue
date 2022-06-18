<template>
  <div>
    <el-radio-group
      v-model="tableFilter.radioValue"
      @change="handleRadioChange"
    >
      <el-radio-button
        v-for="item in radioValueTime"
        :key="item.label"
        :label="item.value"
      >
        {{ item.label }}
      </el-radio-button>
    </el-radio-group>
    <el-date-picker
      v-model="tableFilter.dateValue"
      type="daterange"
      range-separator="~"
      start-placeholder="最小"
      end-placeholder="最大"
      @change="handleDatePickerChange"
    />
    <el-button @click="showData = !showData;">
      查看数据
    </el-button>
    <div v-if="showData">
      <div>radioValue: {{ tableFilter.radioValue }}</div>
      <div>dateValue: {{ tableFilter.dateValue }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
	ref,
} from "vue";
import dayjs from "dayjs";
import {radioValueTime} from "./config";
import type { ITableFilter } from "./type.d";
const showData= ref(false);
const tableFilter = ref<ITableFilter>({
	radioValue: "",
	dateValue: ""
});

function handleRadioChange (value: number) {
	const nowTime = dayjs().format("YYYY-MM-DD");
	tableFilter.value.dateValue = [ dayjs().subtract(value, "day").format("YYYY-MM-DD"), nowTime];
}

function handleDatePickerChange () {
	// console.log(value[0], value[1]);
	const difference =  Date.parse(tableFilter.value.dateValue[1]) - Date.parse(tableFilter.value.dateValue[0]);
	console.log(difference, "difference");

	console.log(Math.ceil(difference / 3600 / 24));


}

</script>

<style lang="scss" scoped>

</style>
