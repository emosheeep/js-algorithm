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
    // lazy是因为，对于已经不可能成为最小生成树中的边暂时不予剔除，在将来判断时统一处理
    lazyPrim () {
        const marked = new Array(this.n).fill(false) // 标记节点是否已经计入最小生成树
        const minEdge = new MinHeap((a, b) => a.weight > b.weight) // 用来存储所有邻切边，并从中拿出权值最小的边
        const mst = [] // 存储最小生成树
        let weight = 0 // 权值总和

        // 访问某个节点，将邻边推入最小堆
        const visit = i => {
            console.assert(!marked[i], `节点${i}已经访问过`)
            marked[i] = true

            // 将i节点的所有未访问过的邻边放入最小堆
            for (const edge of this.map[i]) {
                // 如果邻边对应的节点没有访问过，就把边放入堆中
                if (!marked[edge.to]) {
                    minEdge.push(edge)
                }
            }
        }

        visit(0) // 初始从0节点开始访问
        
        while (minEdge.size() !== 0) {
            const edge = minEdge.shift() // 获取最小邻切边

            /**
             * 如果这条边已经被标记了，那么忽略掉
             * 实际上，能运行到这里，则不可能同为false，只能为同true
             * 同true说明都已经是最小生成树中的点，说明这条边没用了
             */
            if (marked[edge.to] === marked[edge.from]) { 
                continue
            }

            mst.push(edge) // 将满足条件的边保存起来

            // 紧接着检查这条边的两个顶点，确定下一步访问的节点
            if (!marked[edge.from]) {
                visit(edge.from)
            } else {
                visit(edge.to)
            }
        }

        weight = mst.reduce((result, edge) => {
            result += edge.weight
            return result
        }, 0)
        console.group('邻接表最小生成树:')
        console.log(mst)
        console.log('最小权值', weight)
        console.groupEnd()

        return weight
    }
    // prim算法的优化版本，使用索引堆剔除不可能的边，减少不必要的遍历
    prim () {
        const marked = new Array(this.n).fill(false) // 标记节点是否已经计入最小生成树
        // 用来存储所有邻切边，并从中拿出权值最小的边
        const minEdge = new IndexMinHeap((e1, e2) => e1.weight > e2.weight)
        const mst = [] // 存储最小生成树
        let weight = 0 // 权值总和

        // 访问某个节点，将邻边推入最小堆
        const visit = i => {
            console.assert(!marked[i], `节点${i}已经访问过`)
            marked[i] = true

            // 将i节点的所有未访问过的邻边放入最小堆
            for (const edge of this.map[i]) {
                if (!marked[edge.to]) {
                    // 如果之前没有找到过与edge.to相邻的横切边
                    if (!minEdge.get(edge.to)) {
                        minEdge.push(edge.to, edge)
                        // 如果之前已经找到过，则对比weight值，小的覆盖大的
                    } else if (edge.weight < minEdge.get(edge.to).weight) {
                        minEdge.change(edge.to, edge)
                    }
                }
            }
        }

        visit(0) // 初始从0节点开始访问

        while (minEdge.size() !== 0) {
            // 获取最小邻切边
            const edge = minEdge.shift()
            console.assert(edge, '邻切边不存在')
            mst.push(edge) // 将满足条件的边保存起来

            visit(edge.to)
        }

        weight = mst.reduce((result, edge) => {
            result += edge.weight
            return result
        }, 0)
        console.group('邻接表最小生成树:')
        console.log(mst)
        console.log('最小权值', weight)
        console.groupEnd()

        return weight
    }
    // kruscal 算法求最小生成树
    kruscal () {
        // 首先将所有边进行一次排序，这里使用最小堆来进行
        const edges = new MinHeap((a, b) => a.weight > b.weight)
        const mst = [] // 存储最小生成树
        const uf = new UnionFind5(this.n) // 初始化并查集
        let weight = 0 // 权值总和

        // 初始化最小堆
        for (let i = 0; i < this.n; i ++) {
            for (const edge of this.map[i]) {
                if (edge.from < edge.to) // 无向图每条边存了两次，但是这里只放一次
                    edges.push(edge)
            }
        }

        while (edges.size() !== 0 || mst.length === this.sum - 1) {
            const edge = edges.shift()

            // 如果这条边的两个顶点之间没有连接，则该条边符合要求
            if (!uf.isConnected(edge.from, edge.to)) {
                mst.push(edge)
                uf.union(edge.from, edge.to) // 连接起来
            }
        }

        weight = mst.reduce((result, edge) => {
            result += edge.weight
            return result
        }, 0)
        console.group('邻接表最小生成树:')
        console.log(mst)
        console.log('最小权值', weight)
        console.groupEnd()

        return weight
    }
}

module.exports = { SparseGraph }