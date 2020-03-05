/**
 * 二分查找
 */
function binarySearch(arr, target) {
	let left = 0, right = arr.length - 1

	while (left <= right) {
		const mid = left + Math.floor((right - left) / 2)
		if (arr[mid] === target)
			return mid;

		if (target > arr[mid] )
			left = mid + 1
		else
			right = mid - 1
	}

	return -1
}
/**
 * 二分查找递归版本
 */
function binarySearch2(arr, target, left = 0, right = arr.length - 1) {
	const mid = left + Math.floor((right - left) / 2)

	if (left > right)
		return -1

	if (target < arr[mid] )
		return binarySearch2(arr, target, left, mid - 1)
	else if (target > arr[mid])
		return binarySearch2(arr, target, mid + 1, right)
	else
		return mid

}