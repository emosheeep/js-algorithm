const { isSorted } = require('../utils.js')
const { MinHeap } = require('../堆/minHeap.js')

function heapSort1 (arr) {
	console.time('heapSort1')
	const minHeap = new MinHeap()
	arr.forEach(item => {
		minHeap.push(item)
    })
    
	for (let i = 0; i< arr.length; i++)
        arr[i] = minHeap.shift()

	console.timeEnd('heapSort1')
	console.assert(isSorted(arr), 'heapSort1排序失败')
}
// 原地堆排序，借助堆的思想将数组看作是堆，直接排序
function heapSort (arr) {
	console.time('heapSort')
	// 外层控制次数
	for (let i = Math.floor((arr.length - 1)/2); i >= 0; i--) {
		__shiftDown(i) // 先构建出最大堆
	}
	for (let i = arr.length - 1; i > 0; i --) {
		const tmp = arr[0]
		arr[0] = arr[i]
		arr[i] = tmp
		__shiftDown(0, i)
    }
    console.timeEnd('heapSort')
	console.assert(isSorted(arr), '排序失败')

	// 对指定范围的数组进行shiftDown
	function __shiftDown (parent, range = arr.length) {
		while (2 * parent + 1 < range) {
			const rightChildIndex = 2 * parent + 2
			const biggerIndex = (
				rightChildIndex < range &&
				arr[rightChildIndex] > arr[rightChildIndex - 1] 
			)
			? rightChildIndex
			: rightChildIndex - 1
			

			// 如果父元素没有子元素，或大于子元素则退出，循环结束
			if (arr[parent] >= arr[biggerIndex]) break;

			const tmp = arr[parent]
			arr[parent] = arr[biggerIndex]
			arr[biggerIndex] = tmp

			parent = biggerIndex // 循环继续
		}
	}
}

module.exports = { heapSort, heapSort1 }