/**
 * 稠密图——用来邻接矩阵来存储
 */
const { MinHeap } = require('./minheap-edge.js') // 定制的一个存放edge对象的最小堆，使用权值edge.weight作为排序依据

class DenseGraph {
    constructor (n, directed = false) {
        this.n = n
        this.map = []
        this.directed = directed // 表示是否为有向图
        this.sum = 0 // 表示边的数量
        // 初始化n维度数组
        for (let i = 0; i < n; i++) 
            this.map.push(new Array(n).fill(null))
    }
    addEdge (i, j, weight) {
        if (this.hasEdge(i, j))
            return
    
        this.map[i][j] = {
            from: i,
            to: j,
            weight
        }

        if (!this.directed)
            this.map[j][i] = {
                from: j,
                to: i,
                weight
            }

        this.sum ++
    }
    hasEdge (i, j) {
        console.assert(i >= 0 && i < this.map.length)
        console.assert(j >= 0 && j < this.map.length)
        return !(this.map[i][j] === null)
    }
    show () {
        const result = this.map.slice(0)
        for (let i = 0; i < result.length; i ++) {
            result[i] = result[i].map(edge => edge === null ? edge : `${edge.to}(${edge.weight})`)
        }
        console.table(result)
    }
    /**
     * 邻接表的深度优先遍历
     */
    dfsIter () {
        const visited = new Array(this.n).fill(false)  // 记录节点访问情况
        let count = 0 // 统计连通分量
        let resultStr = '' // 拼接遍历结果

        /**
         * 递归遍历所有邻边
         */
        const dfs = i => {
            visited[i] = true
            resultStr += `${i} `

            // 判断是否存在边且节点未访问过
            for (const edge of this.map[i]) {
                if (edge && !visited[edge.to]) {
                    dfs(edge.to)
                }
            }
        }

        // 对每个结点进行遍历
        for (let i = 0; i < this.n; i++) {
            // 检查一下节点是否被遍历过
            if (!visited[i]) {
                dfs(i)
                count ++ // 统计连通分量
            }
        }

        console.log('邻接矩阵：', resultStr)
        console.log('连通分量: ', count)
    }
    /**
     * 广度优先遍历
     */
    bfsIter () {
        const visited = []
        const list = [] // 队列
        let count = 0
        let resultStr = '' // 拼接遍历结果

        const bfs = i => {
            visited[i] = true
            list.push(i)

            while (list.length !== 0) {
                i = list.shift()
                resultStr += `${i} `

                for (const edge of this.map[i]) {
                    if (edge && !visited[edge.to]) {
                        list.push(edge.to)
                        visited[edge.to] = true // 加入队列之后迟早会访问到，置为true
                    }
                }
            }
        }

        // 对每个结点进行遍历，遍历是为了解决不连通的情况
        for (let i = 0; i < this.n; i++) {
            // 检查一下节点是否被遍历过
            if (!visited[i]) {
                bfs(i)
                count ++ // 统计连通分量
            }
        }

        console.log('邻接矩阵：', resultStr)
        console.log('连通分量', count)
    }
    /**
     * 获得a, b之间的路径
     */
    path (a, b) {
        console.assert(a >= 0 && a < this.n)
        console.assert(b >= 0 && b < this.n)

        const from = []
        const visited = []
        const dfs = i => {
            visited[i] = true
            from.push(i)

            for (const edge of this.map[i]) {
                if (edge && !visited[edge.to]) {
                    dfs(edge.to)
                }
            }
        }
        dfs(a) // 从a开始深度遍历
        
        if (!visited[b]) {
            return []
        } else {
            return from.slice(0, from.indexOf(b) + 1)
        }
    }
    shortestPath (a, b) {
        const visited = []
        const list = [] // 队列
        const from = new Array(this.n).fill(-1)

        const bfs = i => {
            visited[i] = true
            list.push(i)

            while (list.length !== 0) {
                i = list.shift()

                for (const edge of this.map[i]) {
                    if (edge && !visited[edge.to]) {
                        list.push(edge.to)
                        from[edge.to] = edge.from // 其实这里的edge.from就是i
                        visited[edge.to] = true // 加入队列之后迟早会访问到，置为true
                    }
                }              
            }
        }

        bfs(a)

        if (!visited[b]) {
            return []
        } else {
            const path = [b]
            let p = from[b]
            // 倒推回去就知道b是从哪里过来的
            while (p !== -1) {
                path.push(p)
                p = from[p]
            }
            return path.reverse() // 再正过来就是顺序路径
        }
    }
    // lazyPrim最小生成树算法，详细注释查看weight-sparse-graph.js
    lazyPrim () {
        const marked = new Array(this.n).fill(false)
        const minEdge = new MinHeap()
        const mst = []
        let weight = 0

        const visit = i => {
            console.assert(!marked[i], `节点${i}已经访问过`)
            marked[i] = true

            for (const edge of this.map[i]) {
                if (edge && !marked[edge.to]) {
                    minEdge.push(edge)
                }
            }
        }

        visit(0)
        while (minEdge.size() !== 0) {
            const edge = minEdge.shift()

            if (marked[edge.to] === marked[edge.from]) {
                continue
            }

            mst.push(edge)

            if (!marked[edge.to]) {
                visit(edge.to)
            } else {
                visit(edge.from)
            }
        }

        weight = mst.reduce((result, edge) => {
            result += edge.weight
            return result
        }, 0)
        console.group('邻接矩阵最小生成树:')
        console.log(mst)
        console.log('最小权值', weight)
        console.groupEnd()
    }
}

module.exports = { DenseGraph }