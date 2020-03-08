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

module.exports = {
    random, createArr, isSorted
}