/**
 * 稀疏图——使用邻接表存储
 */
const { MinHeap } = require('../../堆/minHeap.js')
const { IndexMinHeap } = require('../../堆/indexMinHeap.js')
const { UnionFind5 } = require('../../并查集/UnionFind5.js')

class SparseGraph {
    constructor (n, directed = false) {
        this.n = n
        this.map = []
        this.directed = directed // 表示是否为有向图
        this.sum = 0 // 表示边的数量
        
        for (let i = 0; i < n; i++) 
            this.map.push([]) // 初始化n维度数组
    }
    addEdge (i, j, weight) {
        // 平行边可以先不处理，有需要再删除
        // if (this.hasEdge(i, j))
        //     return
    
        this.map[i].push({
            from: i,
            to: j,
            weight
        })

        // i !== j 是防止自环
        if (i !== j && !this.directed) {
            this.map[j].push({
                from: j,
                to: i,
                weight
            })
        }

        this.sum ++
    }
    hasEdge (i, j) {
        console.assert(i >= 0 && i < this.map.length)
        console.assert(j >= 0 && j < this.map.length)

        return this.map[i].include(edge => edge.to === j)
    }
    show () {
        for (let i = 0; i < this.map.length; i ++) {
            const result = this.map[i].map(edge => `${edge.to}(${edge.weight})`)
            console.log(i, ':', result.join(' '))
        }
    }
    /**
     * 单源最短路径问题 dijkstra 算法
     * @param s 原点
     */
    dijkstra (s) {
        console.assert(this.directed, 'dijkstra算法需要运行在带权有向图，但该图是无向图')
        const marked = new Array(this.n).fill(false) // 标记已经找到最短路径的点
        const from = new Array(this.n).fill(null) // 记录某点是从个哪个点过来的
        const pathTo = [] // 存储原点s到每个点的最短路径距离
        const minEdge = new IndexMinHeap((a, b) => a.weight > b.weight) // 存最短边

        pathTo[s] = 0 // 到自身的距离为0
        marked[s] = true
        // minEdge
    }
}

module.exports = { SparseGraph }