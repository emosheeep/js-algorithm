/**
 * 稀疏图——使用邻接表存储
 */
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
}

module.exports = { SparseGraph }