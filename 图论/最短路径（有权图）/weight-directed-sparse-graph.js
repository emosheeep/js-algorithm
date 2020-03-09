/**
 * 稀疏图——使用邻接表存储
 */
const { IndexMinHeap } = require('../../堆/indexMinHeap.js')

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
        console.assert(typeof s === 'number' && s >=0 && s < this.n - 1, '请传入合法数字')
        console.assert(this.directed, 'dijkstra算法需要运行在带权有向图，但该图是无向图')
        const marked = new Array(this.n).fill(false) // 标记已经找到最短路径的点
        const from = new Array(this.n).fill(null) // 记录某点是从个哪个点过来的
        const distTo = new Array(this.n).fill(0) // 存储原点s到每个点的最短路径距离
        const minDist = new IndexMinHeap() // 存最短边

        // 初始化操作
        distTo[s] = 0 // 到自身的距离为0
        marked[s] = true
        minDist.push(s, distTo[s])
        while (minDist.size() !== 0) {
            const v = minDist.shiftIndex()

            // distTo[v]就是s到v的最短距离
            marked[v] = true
            // Relaxation， 对节点v进行s松弛操作，寻找是否有比distTo[v]更短的路径
            for (const edge of this.map[v]) {
                if (!marked[edge.to]) {
                    // 首先查看edge.to节点是否可达，若不可达，或可达但新找到的权值更小，则进入
                    if (!from[edge.to] || distTo[v] + edge.weight < distTo[edge.to]) {
                        distTo[edge.to] = distTo[v] + edge.weight // 替换新的权值大小
                        from[edge.to] = edge.from // 记录edge.to是从哪个节点过来的
                        if (minDist.contain(edge.to)) { // 将新找到的最短路径权值更新
                            minDist.change(edge.to, distTo[edge.to])
                        } else {
                            minDist.push(edge.to, distTo[edge.to])
                        }
                    }
                }
            }
        }

        console.group('邻接表：')
        console.log(`节点${s}到各个点的最小权值（数组索引代表节点）:`, distTo)
        console.log('通过迭代from数组可获得路径:', from)
        console.groupEnd()
    }
}

module.exports = { SparseGraph }