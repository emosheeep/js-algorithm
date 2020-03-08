const { IndexMaxHeap } = require('./indexMaxHeap.js')
const { IndexMinHeap } = require('./indexMinHeap.js')

const arr = [0, 1, 2, 3, 4, 5]

const indexMaxHeap = new IndexMaxHeap()
const indexMinHeap = new IndexMinHeap()

arr.forEach(i => {
    indexMaxHeap.push(i)
    indexMinHeap.push(i)
})

indexMinHeap.change(0, 6)
indexMinHeap.print() // indexes 1 3 2 0 4 5
while (indexMinHeap.size() !== 0) {
    console.log(indexMinHeap.shift())
}

indexMaxHeap.change(0, 6)
indexMaxHeap.print() // 0 5 4 3 2 1
while (indexMaxHeap.size() !== 0) {
    console.log(indexMaxHeap.shift())
}