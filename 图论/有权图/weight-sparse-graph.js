/**
 * 稀疏图——使用邻接表存储
 */
const { MinHeap } = require('./minheap-edge.js')
const { IndexMinHeap } = require('./indexMinHeap-edge.js')

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
     * 邻接表的深度优先遍历
     */
    dfsIter () {
        const visited = new Array(this.n).fill(false)  // 记录节点访问情况
        let count = 0 // 统计连通分量
        let resultStr = '' // 拼接遍历结果

        /**
         * 递归遍历所有邻边
         * @param i  既是索引，又是节点
         */
        const dfs = i => {
            visited[i] = true
            resultStr += `${i} `
    
            for (const edge of this.map[i]) {
                if (!visited[edge.to])
                    dfs[edge.to]
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

        console.log('邻接表：', resultStr)
        console.log('连通分量: ', count)
    }
    /**
     * 邻接表的广度优先遍历
     */
    bfsIter () {
        const visited = []
        const list = [] // 队列
        let count = 0
        let resultStr = ''

        const bfs = i => {
            visited[i] = true
            list.push(i)

            while (list.length !== 0) {
                i = list.shift()
                resultStr += `${i} `
                
                for (const edge of this.map[i]) {
                    if (!visited[edge.to]) {
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

        console.log('邻接表：', resultStr)
        console.log('连通分量', count)
    }
    // 任意找一条路径
    path (a, b) {
        console.assert(a >= 0 && a < this.n)
        console.assert(b >= 0 && b < this.n)

        const from = []
        const visited = []
        const dfs = i => {
            visited[i] = true
            from.push(i)
            
            for (const edge of this.map[i]) {
                if (!visited[edge.to]) {
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
    // 利用广度优先遍历求最短路径
    shortestPath (a, b) {
        console.assert(a >= 0 && a < this.n)
        console.assert(b >= 0 && b < this.n)

        const visited = []
        const list = [] // 队列
        const from = new Array(this.n).fill(-1) // 保存对应节点是从哪个节点过来的（精髓）

        const bfs = i => {
            visited[i] = true
            list.push(i)

            while (list.length !== 0) {
                i = list.shift()
                
                for (const edge of this.map[i]) {
                    if (!visited[edge.to]) {
                        list.push(edge.to)
                        from[edge.to] = edge.from
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
            return path.reverse()
        }
    }
    // lazy是因为，对于已经不可能成为最小生成树中的边暂时不予剔除，在将来判断时统一处理
    lazyPrim () {
        const marked = new Array(this.n).fill(false) // 标记节点是否已经计入最小生成树
        const minEdge = new MinHeap() // 用来存储所有邻切边，并从中拿出权值最小的边
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
    }
    // prim算法的优化版本，使用索引堆剔除不可能的边，减少不必要的遍历
    prim () {
        const marked = new Array(this.n).fill(false) // 标记节点是否已经计入最小生成树
        const EdgeTo = new Array(this.n).fill(null) // 暂存相邻边中的最短边
        const minWeight = new IndexMinHeap() // 用来存储所有邻切边，并从中拿出权值最小的边
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
                    if (!EdgeTo[edge.to]) {
                        minWeight.push(edge.to, edge.weight)
                        EdgeTo[edge.to] = edge
                        // 如果之前已经找到过，则对比weight值，小的覆盖大的
                    } else if (edge.weight < EdgeTo[edge.to].weight) {
                        minWeight.change(edge.to, edge.weight)
                        EdgeTo[edge.to] = edge
                    }
                }
            }
        }

        visit(0) // 初始从0节点开始访问

        while (minWeight.size() !== 0) {
            // 获取最小邻切边权值对应的索引
            // 同时这个索引也是下一个要访问的节点（edge.to）
            const index = minWeight.shiftIndex()
            const edge = EdgeTo[index]
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
    }
}

module.exports = { SparseGraph }