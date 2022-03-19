<template>
  <div class="jt-table">
    <ElTable
      ref="elTableRef"
      v-loading="loading"
      v-bind="$attrs"
      :data="renderData"
      style="width: 100%"
      :header-row-style="headerRowStyle">
      <ElTableColumn
        v-if="tableType"
        :type="tableType"
        :label="tableTypeLabel"
        v-bind="tableTypeColumnConfig" />
      <ElTableColumn
        v-for="(item, index) in config"
        :key="index"
        :show-overflow-tooltip="item.showOverflowTooltip !== false"
        v-bind="item">
        <template
          #default="scope">
          <slot
            v-if="item.isSlot"
            :name="item.prop"
            :config="item"
            :scope="scope.row" />
          <template v-else>
            {{ item.valueFormatter?.(scope.row) ?? scope.row[item.prop] }}
          </template>
        </template>
      </ElTableColumn>
      <slot name="append" />
    </ElTable>
    <slot
      v-if="!loading"
      name="suffix" />
    <div
      v-if="!noPage"
      class="block">
      <ElPagination
        v-model:current-page="page.offset"
        v-model:page-size="page.count"
        background
        :page-sizes="pageSizes"
        :layout="pageLayout"
        :total="page.total"
        @size-change="pageSizeChangeSelf"
        @current-change="pageCurrentChangeSelf" />
    </div>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	ref,
	reactive,
	watch,
	nextTick,
	toRefs,
	onMounted,
} from "vue";
import {
	ElTable,
	ElTableColumn,
	ElPagination,
} from "element-plus";
import dataSearch from "./dataSearch";
import type {
	PropType,
	CSSProperties} from "vue";
import type { ITableConfig, IDataItem } from "./index";
import type { IPageReq } from "./index.d";
type ForwardRef = (ref: InstanceType<typeof ElTable> | undefined) => void
export default defineComponent({
	name: "JtTable",
	components: {
		ElTable,
		ElTableColumn,
		ElPagination,
	},
	props: {
		data: {
			type: Array as PropType<Array<IDataItem>>,
			default: () => []
		},
		config: {
			type: Array as PropType<ITableConfig[]>,
			default: () => []
		},
		headerRowStyle: {
			type: Object as PropType<CSSProperties> || Function as PropType<() => CSSProperties>,
			default: () => ({ background: "#fafafa" })
		},
		pageSizes: {
			type: Array as PropType<number[]>,
			default: () => [10, 20, 30, 50]
		},
		pageLayout: {
			type: String,
			default: "total, prev, pager, next, sizes, jumper"
		},
		pageSizeChange: {
			type: Function as PropType<(c: number, s: number) => void>
		},
		pageCurrentChange: {
			type: Function as PropType<(c: number, s: number) => void>
		},
		hideOnSinglePage: {
			type: Boolean,
			default: true
		},
		noPage: {
			type: Boolean,
			default: false
		},
		tableType: {
			validator: (val: string) =>
				!val ? true : ["selection", "index", "expand"].includes(val),
			default: ""
		},
		tableTypeColumnConfig: {
			type: Object,
			default: () => ({})
		},
		tableTypeLabel:{
			type:String,
			default:""
		},
		param: {
			type: Object as PropType<IDataItem>,
			default: () => ({})
		},
		// 是否开启自动查询功能，默认为true
		autoSearch: {
			type: Boolean,
			default: true
		},
		webPagination: {
			type: Function
		},
		forwardRef: {
			type: Function as PropType<ForwardRef>,
		},
		initPaging: {
			type: Object as PropType<IPageReq & { total?: number }>,
			default: () => ({
				offset: 1,
				count: 10,
			})
		}
	},
	emits: [
		"data-done",
		"res-total"
	],
	setup (prop, { emit }) {
		const elTableRef = ref<InstanceType<typeof ElTable>>();
		onMounted(() => {
			prop.forwardRef && prop.forwardRef(elTableRef.value);
		});
		const dataMap = reactive({
			renderData: Array<IDataItem>(),
			page: {
				offset: prop.initPaging.offset,
				count: prop.noPage ? 99999 : prop.initPaging.count,
				total: prop.initPaging.total ?? 0
			}
		});
		const loading = ref(false);

		function changeData (cur: number, size: number) {
			dataMap.page.total = prop.data.length;
			dataMap.renderData = dataSearch(
				prop.data,
				{ cur, size }
			);
		}

		async function getData () {
			// 如果是后端分页
			if (prop.webPagination) {
				loading.value = true;
				try {
					await nextTick();
					const params = {
						offset: dataMap.page.offset,
						count: dataMap.page.count,
						...prop.param
					};
					const { data: res } = await prop.webPagination(params);

					if (res.total !== undefined) {
						dataMap.page.total = res.total;
						emit("res-total", res.total);
					}
					dataMap.renderData = reactive(res.records ?? res);
					emit("data-done");
				} catch (e: any) {
					console.log(e);
					// 1. 因为这里并未对 error 做处理，故将错误抛出，让外层能接收到 error 继续对 error 处理
					// 2. 若在此处对 error 处理， 可设置 e.hasShownErrorMsg = true， 此时继续抛出，后续的 unhandledrejection 中将不再弹框
					// 3. 不抛出 error 将认为此时以处理 error 后续将不再触发 unhandledrejection
					throw e;
				} finally {
					loading.value = false;
				}
			} else {
				// 纯前端分页
				changeData(dataMap.page.offset, dataMap.page.count);
			}
		}

		async function pageCurrentChangeSelf (cur: number) {
			dataMap.page.offset = cur;
			if (prop.pageCurrentChange) {
				prop.pageCurrentChange(cur, dataMap.page.count);
				return;
			}
			getData();
		}

		async function pageSizeChangeSelf (size: number) {
			dataMap.page.count = size;
			if (prop.pageSizeChange) {
				prop.pageSizeChange(dataMap.page.offset, size);
				return;
			}
			getData();
		}

		async function search () {
			dataMap.page.offset = 1;
			// 如果是后端分页
			if (prop.webPagination) {
				await nextTick();
				await getData();
			}
		}

		// 刷新当前页面
		async function refreshCurrent () {
			const cur = dataMap.page.offset;
			pageCurrentChangeSelf(cur);
		}

		function clearTable () {
			dataMap.renderData = [];
			dataMap.page = reactive(Object.assign(
				{},
				dataMap.page,
				{
					offset: 1,
					total: 0
				}
			));
		}

		watch(() => prop.data, () => {
			prop.autoSearch && getData();
		}, { immediate: true, deep: true});

		return {
			loading,
			pageCurrentChangeSelf,
			pageSizeChangeSelf,
			search,
			refreshCurrent,
			clearTable,
			...toRefs(dataMap),
			elTableRef,
		};
	}
});
</script>

<style lang="scss" scoped>
.block {
  height: $paginationHeight;
  overflow: hidden;
  text-align: right;
  padding: 30px 0;
}
.el-table {
  :deep th {
    background-color: inherit;
  }
}

.jt-table {
  /* 修复左右箭头不居中的问题 */
  ::v-deep .el-pagination {
    .btn-next .el-icon,
    .btn-prev .el-icon {
      display: inline-block;
    }
  }
}
</style>

