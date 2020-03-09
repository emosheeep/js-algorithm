const { isSorted } = require('../utils.js')

function selectionSort (arr) {
	console.time('选择排序')
	for (let i = 0 ; i < arr.length; i++ ) {
		let minIndex = i
		for (let j = i + 1; j < arr.length; j++ ) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j
			}
		}
		[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
	}
	console.timeEnd('选择排序')
	console.assert(isSorted(arr), '排序失败')
}
/**
 * 插入排序适合近乎有序的数据集合
 */
function insertSort1 (arr) {
	console.time('插入排序1.0')
	for (let i = 1; i < arr.length; i++) {
		// 寻找arr[i]得合适得插入位置
		for (let j = i; j > 0 && arr[j] < arr[j-1]; j-- ) {
			[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]] // 交换
		}
	}
	console.timeEnd('插入排序1.0')
	console.assert(isSorted(arr), '排序失败')
}
function insertSort2 (arr) {
	console.time('插入排序2.0')
	for (let i = 1; i < arr.length; i++) {
		let current = arr[i] // 保存当前值
		let j = i
		// 寻找arr[i]合适的插入位置
		for (; j > 0 && arr[j - 1] > current; j-- ) {
			arr[j] = arr[j - 1]
		}
		arr[j] = current
	}
	console.timeEnd('插入排序2.0')
	console.assert(isSorted(arr), '排序失败')
}
function bubbleSort (arr) {
	console.time('冒泡排序')
	// 外层循环控制的是执行总次数，n个元素执行n-1次
	for (let i = 0; i < arr.length - 1; i++) {
		// 每一轮比较完就会将最大的元素移到后面，所以后面i个元素已经比完，无需再比，减去i
		for (let j = 0; j < arr.length - 1 - i; j++ ) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]] // 交换
			}
		}
	}
	console.timeEnd('冒泡排序')
	console.assert(isSorted(arr), '排序失败')
}

module.exports = { selectionSort, insertSort1, insertSort2, bubbleSort }