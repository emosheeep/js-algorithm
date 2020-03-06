/**
 * 稀疏图（邻接表）的深度优先遍历和广度优先遍历
 */
class SparseIterator {
    constructor (graph) {
        this.n = graph.map.length // 节点个数
        this.graph = graph // 图的引用

        this.iterator()
    }
    /**
     * 邻接表的深度优先遍历
     */
    iterator () {
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
    
            // 同样的，遍历所有相邻点，并检查是否访问过
            for (const item of this.graph.map[i]) {
                if (!visited[item]) {
                    dfs(item)
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

        console.log('邻接表深度遍历', resultStr)
        console.log('连通分量: ', count)
    }
}

module.exports = { SparseIterator }