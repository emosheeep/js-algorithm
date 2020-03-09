const { isSorted } = require('../utils.js')

function quickSort1 (arr) {
	console.time('快速排序')
	__quickSort(0, arr.length - 1)
	console.timeEnd('快速排序')

	console.assert(isSorted(arr), '排序失败')

	function __quickSort (l, r) {
		if (l >= r) return
		const p = __partition(l, r)
		__quickSort(l, p - 1)
		__quickSort(p + 1, r)
	}

	function __partition (l, r) {
		const v = arr[l] // 标准
		let j = l // 记录中间值位置

		for (let i = l + 1; i <= r; i++) {
			if (arr[i] < v) {
				[arr[j + 1], arr[i]] = [arr[i], arr[j + 1]] // 交换
				j++
			}
		}

		[arr[l], arr[j]] = [arr[j], arr[l]]

		return j //将这个中间值位置返回
	}
}
function quickSort2 (arr) {
	console.time('快速排序2.0')
	sort(0, arr.length - 1)
	console.timeEnd('快速排序2.0')

	console.assert(isSorted(arr), '排序失败')

	function sort (left, right) {
		if (left >= right) return;
		let i = left
		let j = right
		const baseVal = arr[j] // 取无序数组最后一个数为基准值
		while (i < j) {//把所有比基准值小的数放在左边大的数放在右边
			while (i < j && arr[i] <= baseVal) i++;
			arr[j] = arr[i] // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
			while (j > i && arr[j] >= baseVal) j--;
			arr[i] = arr[j] // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
		}
		arr[j] = baseVal // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
		sort(left, j-1) // 将左边的无序数组重复上面的操作
		sort(j+1, right) // 将右边的无序数组重复上面的操作
	}
}
// 三路快排
function quickSort3 (arr) {
	console.time('快速排序3.0')
	__sort(0, arr.length - 1)
	console.timeEnd('快速排序3.0')

	function __sort (l, r) {
		if (l >= r) return;
		const v = arr[l]
		let lt = l // arr[l+1 ~ lt] < v
		let gt = r + 1 // v < arr[gt ~ r]
		let i = l + 1 // arr[l+1 ~ i) == v

		while (i < gt) {
			if (arr[i] < v) {
				[arr[i], arr[lt + 1]] = [arr[lt + 1], arr[i]]
				lt ++
				i ++
			} else if (arr[i] > v) {
				[arr[i], arr[gt - 1]] = [arr[gt - 1], arr[i]]
				gt --
			} else {
				i ++
			}
		}
		arr[l] = arr[lt]
		arr[lt] = v
		__sort (l, lt - 1)
		__sort (gt, r)
	}
	console.assert(isSorted(arr), '排序失败')
}

module.exports = { quickSort1, quickSort2, quickSort3 }