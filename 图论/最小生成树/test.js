/**
 * 最小生成树的概念在有权图上才成立，所以将实现代码放到了有权图中，这里引用代码测试即可
 */
const { DenseGraph } = require('../有权图/weight-dense-graph.js')
const { SparseGraph } = require('../有权图/weight-sparse-graph.js')

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
    graph.addEdge(4, 6, 93)
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

console.group('-----------------------Lazy Prim 最小生成树--------------------------')
sparse.lazyPrim()
dense.lazyPrim()
console.groupEnd()

console.group('-----------------------Lazy Prim 最小生成树--------------------------')
sparse.lazyPrim()
dense.lazyPrim()
console.groupEnd()

console.group('-----------------------Prim 最小生成树--------------------------')
sparse.prim()
// dense.lazyPrim()
console.groupEnd()