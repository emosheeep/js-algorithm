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
new DenseIterator(dense) // 稠密图的深度和广度
new SparseIterator(sparse) // 稀疏图的深度和广度

dense.show()
sparse.show()


