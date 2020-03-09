/**
 * 逆序对暴力求法(O(n2))
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