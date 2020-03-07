/**
 * 稠密图（邻接矩阵）的深度优先遍历和广度优先遍历
 */
class DenseIterator {
    constructor (graph) {
        this.n = graph.map.length // 节点个数
        this.graph = graph // 图的引用
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

            /**
             * 除了需要判断是否访问过，还要判断节点i、j之间是否存在一条边
             * 额外的判断，和不必要的遍历，影响了一部分性能
             * 所以如果边数少，属于稀疏图的话，最好使用邻接表来表示
             */
            for (let j = 0; j < this.n; j ++) {
                if (this.graph.map[i][j] === 1 && !visited[j]) {
                    dfs(j)
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
        let resultStr = ''

        const bfs = i => {
            visited[i] = true
            list.push(i)

            while (list.length !== 0) {
                i = list.shift()
                resultStr += `${i} `

                for (let j = 0; j < this.n; j++) {
                    if (!visited[j] && this.graph.map[i][j] === 1) {
                        list.push(j)
                        visited[j] = true // 加入队列之后迟早会访问到，置为true
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

            for (let j = 0; j < this.graph.map[i].length; j ++) {
                if (this.graph.map[i][j] === 1 && !visited[j]) {
                    dfs(j)
                }
            }
        }
        dfs(a) // 从a开始深度遍历
        
        if (!visited[b]) {
            return false
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

                for (let j = 0; j < this.n; j++) {
                    if (!visited[j] && this.graph.map[i][j] === 1) {
                        list.push(j)
                        from[j] = i // j -> i
                        visited[j] = true // 加入队列之后迟早会访问到，置为true
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
}

module.exports = { DenseIterator }