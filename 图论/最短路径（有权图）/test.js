/**
 * 最小生成树的概念在有权图上才成立，所以将实现代码放到了有权图中，这里引用代码进行测试
 */
const { DenseGraph } = require('./weight-directed-dense-graph.js')
const { SparseGraph } = require('./weight-directed-sparse-graph.js')

/**
 * 该示例为一张八个点的连通图
 */
const init = function (graph) {
    graph.addEdge(0, 1, 5)
    graph.addEdge(0, 2, 2)
    graph.addEdge(0, 3, 6)
    graph.addEdge(2, 1, 1)
    graph.addEdge(2, 3, 3)
    graph.addEdge(2, 4, 5)
    graph.addEdge(1, 4, 1)
    graph.addEdge(3, 4, 2)
}

const dense = new DenseGraph(5, true) // 有向图
const sparse = new SparseGraph(5, true) // 有向图
init(dense)
init(sparse)

console.group('-----------------------打印输出--------------------------')
dense.show()
sparse.show()
console.groupEnd()

console.group('-----------------------dijkstra单源最短路径--------------------------')
sparse.dijkstra(0)
dense.dijkstra(0)
console.groupEnd()