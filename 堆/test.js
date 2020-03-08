const { IndexMaxHeap } = require('./indexMaxHeap.js')
const { IndexMinHeap } = require('./indexMinHeap.js')
const { MaxHeap } = require('./maxHeap.js')
const { MinHeap } = require('./minHeap.js')
const { createArr, isSorted } = require('../utils.js')

/**
 * 创建一个一定数量的随机数组，若assert没有报错，则功能正常
 */
const arr = createArr(20, 0, 20)
const result = []
const indexMaxHeap = new IndexMaxHeap()
const indexMinHeap = new IndexMinHeap()
const maxHeap = new MaxHeap()
const minHeap = new MinHeap()

arr.forEach((item, index) => {
    maxHeap.push(item)
    minHeap.push(item)
    indexMaxHeap.push(index, item)
    indexMinHeap.push(index, item)
})

console.group('-------------------堆测试--------------------')

console.group('最小堆')
minHeap.print()
result.splice(0)
while (minHeap.size() !== 0) {
    result.push(minHeap.shift())
}
console.log('最小堆出堆：', result.join('->'))
console.assert(isSorted(result), '!!!!!!!!!!最小堆有问题!!!!!!!!!')
console.groupEnd()

console.group('最大堆')
maxHeap.print()
result.splice(0)
while (maxHeap.size() !== 0) {
    result.push(maxHeap.shift())
}
console.log('最大堆出堆：', result.join('->'))
console.assert(isSorted(result, false), '!!!!!!!!!!最大堆有问题!!!!!!!!!')
console.groupEnd()

console.groupEnd()

console.group('-----------------索引堆测试------------------')

console.group('最小索引堆')
indexMinHeap.change(0, 6)
indexMinHeap.print() // indexes 1 3 2 0 4 5

result.splice(0)
while (indexMinHeap.size() !== 0) {
    result.push(indexMinHeap.shift())
}
console.log('最小索引堆出堆：', result.join('->'))
console.assert(isSorted(result), '!!!!!!!!!!最小索引堆有问题!!!!!!!!!')
console.groupEnd()

console.group('最大索引堆')
indexMaxHeap.change(0, 6)
indexMaxHeap.print() // 0 5 4 3 2 1

result.splice(0)
while (indexMaxHeap.size() !== 0) {
    result.push(indexMaxHeap.shift())
}
console.log('最大索引堆出堆：', result.join('->'))
console.assert(isSorted(result, false), '!!!!!!!!!!最大索引堆有问题!!!!!!!!!')
console.groupEnd()

console.groupEnd()