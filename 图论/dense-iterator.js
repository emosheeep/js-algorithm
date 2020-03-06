/**
 * 稠密图（邻接矩阵）的深度优先遍历和广度优先遍历
 */
class DenseIterator {
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

            /**
             * 除了需要判断是否访问过，还要判断节点i、j之间是否存在一条边
             * 额外的判断，和不必要的遍历，影响了一部分性能
             * 所以如果边数少，属于稀疏图的话，最好使用邻接表来表示
             */
            for (let j = 0; j < this.graph.map[i].length; j ++) {
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

        console.log('邻接矩阵深度遍历', resultStr)
        console.log('连通分量: ', count)
    }
}

module.exports = { DenseIterator }