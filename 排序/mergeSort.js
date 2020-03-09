const { isSorted } = require('../utils.js')

function mergeSort1 (arr) {
	console.time('归并排序(递归)')
	__mergeSort(0, arr.length - 1)
	console.timeEnd('归并排序(递归)')

	console.assert(isSorted(arr), '排序失败')
	
	// 对arr[l~r]范围排序
	function __mergeSort (l, r) {
		/*在递归到一定长度内时，数据近乎有序的概率很大，
		此时可以考虑使用插入排序代替掉*/
		if (l >= r) return
		let mid = Math.trunc((l + r) / 2) // 计算区中点
		// 分别对左右空间归并排序
		__mergeSort(l, mid)
		__mergeSort(mid + 1, r)
		/*这层优化是用来处理近乎有序的数组
		于是就可以与插入排序的性能媲美
		但由于本身if的判断也需要消耗性能，所以更具情况而定*/
		// if (arr[mid] > arr[mid + 1])
		__merge(l, mid, r)
	}
	/**
	 * 将a[l~m]和arr[m~r]两部分合并
	 * @param  {[type]} l   [左边界]
	 * @param  {[type]} mid [中间值]
	 * @param  {[type]} r   [右边界]
	 */
	function __merge (l, mid, r) {
		let temp = []
		// 取出对应位置的元素新建一个空间用来比较
		for (let i = l; i <= r; i++) {
			temp.push(arr[i])
		}
		let [i, j] = [l, mid + 1]
		for (let k = l; k <= r; k++) {
			// 要确认索引是否越界
			if (i > mid) {
				arr[k] = temp[j - l] // 注意偏移量的问题
				j++
			} else if (j > r) {
				arr[k] = temp[i - l]
				i++
			} else if (temp[i - l] < temp[j - l]) {
				arr[k] = temp[i - l]
				i++
			} else {
				arr[k] = temp[j - l]
				j++
			}
		}

	}
}
function mergeSort2 (arr) {
	console.time('归并排序(迭代)')
	// 外层控制归并的大小
	for (let size = 1; size <= arr.length - 1; size += size) {
		// 内层控制归并的范围
		// i + size < arr.length 限定数组越界
		for (let i = 0; i + size < arr.length; i += 2 * size) {
			// 取最小值因为第二部分可能没有足够的元素
			const [l, mid, r] = [i, i + size - 1, Math.min(i + 2 * size - 1, arr.length - 1)]
			if (arr[mid] > arr[mid + 1])
				__merge(l, mid, r)
		}
	}
	console.timeEnd('归并排序(迭代)')

	console.assert(isSorted(arr), '排序失败')

	/**
	 * 将a[l~m]和arr[m~r]两部分合并
	 * @param  {[type]} l   [左边界]
	 * @param  {[type]} l   [中间值]
	 * @param  {[type]} r   [右边界]
	 */
	function __merge (l, mid, r) {
		let temp = []
		// 取出对应位置的元素新建一个空间用来比较
		for (let i = l; i <= r; i++) {
			temp.push(arr[i])
		}
		let [i, j] = [l, mid + 1]
		for (let k = l; k <= r; k++) {
			// 要确认索引是否越界
			if (i > mid) {
				arr[k] = temp[j - l] // 注意偏移量的问题
				j++
			} else if (j > r) {
				arr[k] = temp[i - l]
				i++
			} else if (temp[i - l] < temp[j - l]) {
				arr[k] = temp[i - l]
				i++
			} else {
				arr[k] = temp[j - l]
				j++
			}
		}

	}
}

module.exports = { mergeSort1, mergeSort2 }