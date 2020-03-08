const { SparseGraph } = require('./sparse-graph.js')
const { DenseGraph } = require('./dense-graph.js')

/**
 * 该示例是一张13个点的非连通图，连通分量为3
 */
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
console.group('-----------------------深度优先遍历--------------------------')
dense.dfsIter()
sparse.dfsIter()
console.groupEnd()

console.group('-----------------------路径测试--------------------------')
console.log('邻接表中（1, 2）路径：', sparse.path(1, 2).join('->'))
console.log('邻接矩阵（1, 2）路径：', dense.path(1, 2).join('->'))
console.groupEnd()

console.group('-----------------------广度优先遍历--------------------------')
dense.bfsIter()
sparse.bfsIter()
console.groupEnd()

console.group('-----------------------最短路径测试--------------------------')
console.log('邻接表中（1, 2）最短路径：', sparse.shortestPath(1, 2).join('->'))
console.log('邻接矩阵（1, 2）最短路径：', dense.shortestPath(1, 2).join('->'))
console.groupEnd()

console.group('-----------------------打印输出--------------------------')
dense.show()
sparse.show()
console.groupEnd()

