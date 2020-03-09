const { DenseGraph } = require('./weight-dense-graph.js')
const { SparseGraph } = require('./weight-sparse-graph.js')

/**
 * 该示例为一张八个点的连通图
 */
const init = function (graph) {
    graph.addEdge(5, 1, 32)
    graph.addEdge(5, 7, 28)
    graph.addEdge(5, 4, 35)
    graph.addEdge(1, 7, 19)
    graph.addEdge(4, 7, 37)
    graph.addEdge(1, 2, 36)
    graph.addEdge(7, 2, 34)
    graph.addEdge(7, 0, 16)
    graph.addEdge(0, 2, 26)
    graph.addEdge(0, 6, 58)
    graph.addEdge(4, 0, 38)
    graph.addEdge(4, 6, 29)
    graph.addEdge(2, 6, 40)
    graph.addEdge(3, 6, 52)
    graph.addEdge(2, 3, 17)
    graph.addEdge(1, 3, 29)
}

const dense = new DenseGraph(8)
const sparse = new SparseGraph(8)
init(dense)
init(sparse)

console.group('-----------------------打印输出--------------------------')
dense.show()
sparse.show()
console.groupEnd()

/**
 * 二者的打印结果不同（正确的前提下）
 * 是因为遍历的初始节点选取不同
 */
console.group('-----------------------深度优先遍历--------------------------')
dense.dfsIter()
sparse.dfsIter()
console.groupEnd()

// 结果与图的存储方式有关
console.group('-----------------------路径测试(普通路径)--------------------------')
console.log('邻接表中（5, 6）路径：', sparse.path(5, 6).join('->'))
console.log('邻接矩阵（5, 6）路径：', dense.path(5, 6).join('->'))
console.groupEnd()

console.group('-----------------------广度优先遍历--------------------------')
dense.bfsIter()
sparse.bfsIter()
console.groupEnd()

console.group('-----------------------最短路径测试--------------------------')
console.log('邻接表中（5, 6）最短路径：', sparse.shortestPath(5, 6).join('->'))
console.log('邻接矩阵（5, 6）最短路径：', dense.shortestPath(5, 6).join('->'))
console.groupEnd()