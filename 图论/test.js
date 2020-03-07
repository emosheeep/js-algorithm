const { DenseGraph, SparseGraph } = require('./graph.js')
const { SparseIterator } = require('./sparse-iterator.js')
const { DenseIterator } = require('./dense-iterator.js')

const init = function (graph) {
    graph.addEdge(0, 5)
    graph.addEdge(4, 3)
    graph.addEdge(0, 1)
    graph.addEdge(9, 12)
    graph.addEdge(6, 4)
    graph.addEdge(5, 4)
    graph.addEdge(0, 2)
    graph.addEdge(11,12)
    graph.addEdge(9, 10)
    graph.addEdge(0, 6)
    graph.addEdge(7, 8)
    graph.addEdge(9, 11)
    graph.addEdge(5, 3)
}


const dense = new DenseGraph(13)
const sparse = new SparseGraph(13)
init(dense)
init(sparse)

/**
 * 二者的打印结果不同（正确的前提下）
 * 是因为遍历的初始节点选取不同
 */
const denseIter = new DenseIterator(dense) // 稠密图的深度和广度
const sparseIter = new SparseIterator(sparse) // 稀疏图的深度和广度

console.group('-----------------------深度优先遍历--------------------------')
denseIter.dfsIter()
sparseIter.dfsIter()
console.groupEnd()

console.group('-----------------------路径测试--------------------------')
console.log('邻接表中（1, 2）路径：', sparseIter.path(1, 2).join('->'))
console.log('邻接矩阵（1, 2）路径：', denseIter.path(1, 2).join('->'))
console.groupEnd()

console.group('-----------------------广度优先遍历--------------------------')
denseIter.bfsIter()
sparseIter.bfsIter()
console.groupEnd()

console.group('-----------------------最短路径测试--------------------------')
console.log('邻接表中（1, 2）最短路径：', sparseIter.shortestPath(1, 2).join('->'))
console.log('邻接矩阵（1, 2）最短路径：', denseIter.shortestPath(1, 2).join('->'))
console.groupEnd()

console.group('-----------------------打印输出--------------------------')
dense.show()
sparse.show()
console.groupEnd()

