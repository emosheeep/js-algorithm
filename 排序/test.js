const { createArr } = require('../utils.js')
const { 
    selectionSort, insertSort1, 
    insertSort2, bubbleSort
} = require('./baseSort.js')
const { mergeSort1, mergeSort2 } = require('./mergeSort.js')
const { quickSort1, quickSort2, quickSort3 } = require('./quickSort.js')
const { heapSort, heapSort1 } = require('./heapSort.js')



const arr = createArr(10000000, 0, 10000)
// selectionSort(arr.slice(0))
// insertSort1(arr.slice(0))
// insertSort2(arr.slice(0))
// bubbleSort(arr.slice(0))
// mergeSort1(arr.slice(0))
// mergeSort2(arr.slice(0))
// quickSort1(arr.slice(0))
// quickSort2(arr.slice(0))
// quickSort3(arr.slice(0))
heapSort(arr.slice(0))
// heapSort1(arr.slice(0))

console.time('sort')
arr.sort()
console.timeEnd('sort')