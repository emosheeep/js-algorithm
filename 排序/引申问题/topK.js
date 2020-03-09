/**
 * 快速排序partition解决topK问题
 */
const arr = [3,2,1,5,6,4]
topK(arr, 2)
function topK (arr, k) {
    console.assert(k > 0 && k <= arr.length)
    if (!(k > 0 && k <= arr.length)) return

    let l = 0, r = arr.length - 1
    const target = arr.length - k
    while (true) {
        const p = __partition(l, r)
        if (target === p) {
            console.log(arr[p])
            return arr[p]
        } else if (target > p) {
            l = p + 1
        } else {
            r = p - 1
        }
    }

	function __partition (l, r) {
        const ran = Math.floor(Math.random()*(r-l+1) + l)
        __swap(l, ran)
        const v = arr[l] // 标准
		let j = l // 记录中间值位置

		for (let i = l + 1; i <= r; i++) {
			if (arr[i] < v) {
				__swap(i, j+1) // 交换
				j++
			}
		}

        __swap(l, j)

		return j //将这个中间值位置返回
    }

    function __swap(i, j) {
        const tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }
 }

/**
 * 利用最小堆
 */
const { MinHeap } = require('../../堆/minHeap.js')
const arr1 = [3,2,1,5,6,4]
topN(arr1, 2)
function topN(arr, n) {
const minHeap = new MinHeap()
for (let i = 0; i < n; i++)
    minHeap.push(arr[i])

for (let i = n; i < arr.length; i++) {
    if (arr[i] > minHeap.peek()) {
        minHeap.container[0] = arr[i]
        minHeap.shiftDown()
    }
}

console.log(minHeap.peek())
}

/**
 * 利用原地堆排序
 */
const arr2 = [3,2,3,1,2,4,5,5,6]
heapSort(arr2, 4)

function heapSort (arr, n) {
    const minHeap = arr.slice(0, n) // 创建一个n个元素的最小堆
    for (let i = Math.floor((minHeap.length - 1)/2); i >= 0; i--) {
		__shiftDown(minHeap, i)
    }
    
    for (let i = n; i < arr.length; i++) {
        if (arr[i] > minHeap[0]) {
            minHeap[0] = arr[i]
            __shiftDown(minHeap)
        }
    }

    console.log(minHeap)
    return minHeap[0]

	// 对指定范围的数组进行shiftDown
	function __shiftDown (arr, parent = 0) {
		while (2 * parent + 1 < arr.length) {
			const rightChildIndex = 2 * parent + 2
			const smallerIndex = (
				rightChildIndex < arr.length &&
				arr[rightChildIndex] < arr[rightChildIndex - 1] 
			)
			? rightChildIndex
			: rightChildIndex - 1
			

			// 如果父元素没有子元素，或小于等于子元素则退出，循环结束
			if (arr[parent] <= arr[smallerIndex]) break;

			const tmp = arr[parent]
			arr[parent] = arr[smallerIndex]
			arr[smallerIndex] = tmp

			parent = smallerIndex // 循环继续
		}
	}
}