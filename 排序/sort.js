/**
 * 几个辅助函数
 */
function random (min, max) {
	if (min > max) {
		throw new Error('min 大于 max')
	}
	return Math.trunc(Math.random() * (max - min + 1) + min)
}
function createArr (n, min, max) {
	let arr = []
	for (let i = 0; i < n; i++) {
		arr[i] = random(min, max)
	}
	return arr
}
function isSorted (arr) {
	for (let i = 0; i < arr.length - 1; i ++) {
		if (Math.min(arr[i], arr[i + 1]) !== arr[i]) 
			return false
	}
	return true
}


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

const { Heap } = require('./myHeap.js')

function heapSort1 (arr) {
	console.time('heapSort1')
	const heap = new Heap()
	arr.forEach(item => {
		heap.push(item)
	})
	for (let i = arr.length - 1; i >=0; i--) {
		arr[i] = heap.shift()
	}
	console.timeEnd('heapSort1')
	console.assert(isSorted(arr), '排序失败')
}
function heapSort2 (arr) {
	console.time('heapSort2')
	const heap = new Heap(arr)
	for (let i = arr.length - 1; i >= 0; i--) {
		arr[i] = heap.shift()
	}
	console.timeEnd('heapSort2')
	console.assert(isSorted(arr), '排序失败')
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

module.exports = {
	createArr,
	selectionSort,
	insertSort1,
	insertSort2,
	bubbleSort,
	mergeSort1,
	mergeSort2,
	quickSort1,
	quickSort2,
	quickSort3,
	heapSort1,
	heapSort2,
	heapSort
}