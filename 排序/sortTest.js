const utils = require('./sort.js')


const arr = utils.createArr(10000000, 0, 10000)
// utils.selectionSort(arr.slice(0))
// utils.insertSort1(arr.slice(0))
// utils.insertSort2(arr.slice(0))
// utils.bubbleSort(arr.slice(0))
utils.mergeSort1(arr.slice(0))
// utils.mergeSort2(arr.slice(0))
// utils.quickSort1(arr.slice(0))
// utils.quickSort2(arr.slice(0))
utils.quickSort3(arr.slice(0))
// utils.heapSort1(arr.slice(0))
utils.heapSort2(arr.slice(0))
// utils.heapSort(arr.slice(0))
console.time('sort')
arr.sort()
console.timeEnd('sort')


// const { Heap, IndexHeap } = require('./myHeap.js')

// const heap = new Heap()
// const indexHeap = new IndexHeap()

// for (let i = 1; i <= 5; i++) {
// 	heap.push(i)
// 	indexHeap.push(i)
// }
// heap.print()
// indexHeap.change(0, 1)
// indexHeap.print()