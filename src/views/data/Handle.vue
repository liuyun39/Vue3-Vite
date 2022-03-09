<template>
  <div>
    <pre>
      统计次数
      const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];
      const transportation = data.reduce(function(obj, item) {
        if (!obj[item]) {
          obj[item] = 0;
        }
        obj[item]++;
        return obj;
      }, {});
      console.log(transportation);
    </pre>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	nextTick,
	reactive,
	ref,
} from "vue";

import { ElForm, ElMessageBox, ElMessage } from "element-plus";
export default defineComponent({
	components:{
	},
	setup (props) {

		return {

		};
	}
});
</script>

<style lang="scss" scoped>

</style>
