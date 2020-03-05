function isSorted (arr) {
	for (let i = 0; i < arr.length - 1; i ++) {
		if (Math.min(arr[i], arr[i + 1]) !== arr[i]) 
			return false
	}
	return true
}

/**
 * 插入排序1.0 使用直接交换的方式
 */
function insertSort1 (arr) {
	for (let i = 1; i < arr.length; i ++) {
		for (let j = i; j > 0 && arr[j] < arr[j - 1]; j --) {
			[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
		}
	}
}
/**
 * 插入排序2.0 先找好再插，由于提前终止循环的特性，在近乎有序的数组排序时效率很高
 */
function insertSort2 (arr) {
	for (let i = 1; i < arr.length; i ++) {
		let j = i
		const temp = arr[i]
		while (j > 0 && temp < arr[j - 1]) {
			arr[j] = arr[j - 1]
			j --
		}
		arr[j] = temp
	}
	console.assert(isSorted(arr), 'insertSort2 排序失败')
}

/**
 * 归并排序1.0，采用递归的方式，自顶向下
 */
function mergeSort1 (arr) {
	__sort(0, arr.length - 1)
	console.assert(isSorted(arr), 'mergeSort1 排序失败')
	// 递归排序
	function __sort(l, r) {
		// 处理递归到底的情况
		if (l >= r)
			return;
		const mid = Math.trunc((l + r) / 2)
		// 递归将左右两部分排序
		__sort(l, mid)
		__sort(mid + 1, r)
		// 最后归并
		if (arr[mid] > arr[mid + 1])
			__merge(l, mid, r)
	}

	function __merge (l, mid, r) {
		// 先开辟一个等大的空间存放
		const temp = []
		for (let i = l; i <= r; i ++)
			temp.push(arr[i]);

		// i, j分别是左右两个区间的起始点
		let [i, j] = [l, mid + 1]

		for (let k = l; k <= r; k ++) {
			if (i > mid) {
				arr[k] = temp[j - l]
				j ++
			} else if (j > r) {
				arr[k] = temp[i - l]
				i ++
			} else if (temp[i -l] < temp[j - l]) {
				arr[k] = temp[i - l]
				i ++
			} else {
				arr[k] = temp[j - l]
				j ++
			}
		}
	}
}

/**
 * 归并排序2.0，采用迭代的方式，自底向上，这种方式可以不直接通过下表获取元素，可以改造用于链表排序
 */
function mergeSort2 (arr) {
	
	__sort(0, arr.length - 1)
	console.assert(isSorted(arr), 'mergeSort2 排序失败')

	// 递归排序
	function __sort(l, r) {
		// 处理递归到底的情况
		if (l >= r)
			return;
		const mid = Math.trunc((l + r) / 2)
		// 递归将左右两部分排序
		__sort(l, mid)
		__sort(mid + 1, r)
		// 最后归并
		if (arr[mid] > arr[mid + 1])
			__merge(l, mid, r)
	}

	function __merge (l, mid, r) {
		// 先开辟一个等大的空间存放
		const temp = []
		for (let i = l; i <= r; i ++)
			temp.push(arr[i]);

		// i, j分别是左右两个区间的起始点
		let [i, j] = [l, mid + 1]

		for (let k = l; k <= r; k ++) {
			if (i > mid) {
				arr[k] = temp[j - l]
				j ++
			} else if (j > r) {
				arr[k] = temp[i - l]
				i ++
			} else if (temp[i -l] < temp[j - l]) {
				arr[k] = temp[i - l]
				i ++
			} else {
				arr[k] = temp[j - l]
				j ++
			}
		}
	}
}

/**
 * 三路快速排序，相比于双路和单路，性能更高，在大量相同元素时表现优异
 */
function quickSortThreeWays (arr) {
	__sort(0, arr.length - 1)
	console.assert(isSorted(arr), 'quickSortThreeWays 排序失败')
	console.log(arr)
	function __sort (l, r) {
		if (l >= r)
			return;
		const base = arr[l]
		let lt = l
		let i =  lt + 1 // 初始arr[l ~ lt] 没有元素
		let gt = r + 1 // 初始arr[gt ~ j] 没有元素

		while (i < gt) {
			if (arr[i] < base) {
				[arr[i], arr[lt + 1]] = [arr[lt + 1], arr[i]]
				i ++
				lt ++
			} else if (arr[i] > base) {
				[arr[i], arr[gt - 1]] =  [arr[gt - 1], arr[i]]
				gt -- // 此时i不需要增加
			} else {
				i ++
			}
		}

		// 最后将base移到合适位置
		arr[l] = arr[lt]
		arr[lt] = base

		// 递归
		__sort(l, lt - 1)
		__sort(gt, r)
	}
}

/**
 * 逆序对暴力求法
 */
function inversionsNum_stupid (arr) {
	let num = 0
	console.time('暴力求解')
	for (let i = 0; i < arr.length; i ++)
		for (let j = i + 1; j < arr.length; j ++)
			if (arr[i] > arr[j])
				num ++;
	console.timeEnd('暴力求解')
	console.log(num)
}
/**
 * 归并排序解决逆序对问题
 */
function inversionsNum (arr) {
	let num = 0 // 逆序对
	console.time('归并排序求解')
	__sort(0, arr.length - 1)
	console.timeEnd('归并排序求解')
	console.log(num)

	console.assert(isSorted(arr), '排序失败')

	// 递归排序
	function __sort(l, r) {
		// 处理递归到底的情况
		if (l >= r)
			return;
		const mid = Math.trunc((l + r) / 2)
		// 递归将左右两部分排序
		__sort(l, mid)
		__sort(mid + 1, r)
		// 最后归并
		if (arr[mid] > arr[mid + 1])
			__merge(l, mid, r)
	}

	

	function __merge (l, mid, r) {
		// 先开辟一个等大的空间存放
		const temp = []
		for (let i = l; i <= r; i ++)
			temp.push(arr[i]);

		// i, j分别是左右两个区间的起始点
		let [i, j] = [l, mid + 1]

		for (let k = l; k <= r; k ++) {
			if (i > mid) {
				arr[k] = temp[j - l]
				j ++
			} else if (j > r) {
				arr[k] = temp[i - l]
				i ++
			} else if (temp[i -l] <= temp[j - l]) {
				arr[k] = temp[i - l]
				i ++
			} else {
				arr[k] = temp[j - l]
				j ++
				num += mid - i + 1 // 关键代码，当左边小于右边时
			}
		}
	}
}

/**
 * 快速排序，解决topN问题
 */
function topN (arr, n) {
	console.log(arr)
	__sort(0, arr.length - 1)
	
	function __sort (l, r) {
		if (l >= r)
			return;
		const base = arr[l]
		let lt = l
		let i =  lt + 1 // 初始arr[l ~ lt] 没有元素
		let gt = r + 1 // 初始arr[gt ~ j] 没有元素

		while (i < gt) {
			if (arr[i] < base) {
				[arr[i], arr[lt + 1]] = [arr[lt + 1], arr[i]]
				i ++
				lt ++
			} else if (arr[i] > base) {
				[arr[i], arr[gt - 1]] =  [arr[gt - 1], arr[i]]
				gt -- // 此时i不需要增加
			} else {
				i ++
			}
		}

		// 最后将base移到合适位置
		arr[l] = arr[lt]
		arr[lt] = base
     	
     	if (n < lt) {
     		console.log(n)
     		__sort(l, lt - 1)
     	} else if (n > lt) {
     		console.log(n)
			__sort(gt, r)	
		} else {
			console.log(n)
		}
	}
}

module.exports = {
	insertSort2,
	mergeSort1,
	mergeSort2,
	quickSortThreeWays,
	inversionsNum,
	inversionsNum_stupid,
	topN
}