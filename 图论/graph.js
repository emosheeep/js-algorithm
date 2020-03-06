/**
 * 稠密图——用来邻接矩阵来存储
 */
class DenseGraph {
    constructor (n, directed = false) {
        this.map = []
        this.directed = directed // 表示是否为有向图
        this.sum = 0 // 表示边的数量
        // 初始化n维度数组
        for (let i = 0; i < n; i++) 
            this.map.push(new Array(n).fill(0))
    }
    addEdge (i, j) {
        if (this.hasEdge(i, j))
            return
    
        this.map[i][j] = 1

        if (!this.directed)
            this.map[j][i] = 1

        this.sum ++
    }
    hasEdge (i, j) {
        console.assert(i >= 0 && i < this.map.length)
        console.assert(j >= 0 && j < this.map.length)
        return !!this.map[i][j]
    }
    // 遍历邻边
    show () {
        console.table(this.map)
    }
}

/**
 * 稀疏图——使用邻接表存储
 */
class SparseGraph {
    constructor (n, directed = false) {
        this.map = []
        this.directed = directed // 表示是否为有向图
        this.sum = 0 // 表示边的数量
        
        for (let i = 0; i < n; i++) 
            this.map.push([]) // 初始化n维度数组
    }
    addEdge (i, j) {
        // 平行边可以先不处理，有需要再删除
        // if (this.hasEdge(i, j))
        //     return
    
        this.map[i].push(j)

        // 处理自环
        if (i !== j && !this.directed)
            this.map[j].push(i)

        this.sum ++
    }
    hasEdge (i, j) {
        console.assert(i >= 0 && i < this.map.length)
        console.assert(j >= 0 && j < this.map.length)

        // 在i的边中寻找是否有j
        for (const edge of this.map[i]) {
            if (edge === j)
                return true
        }
        return false
    }
    // 遍历邻边
    show () {
        console.table(this.map)
    }
}

module.exports = { DenseGraph, SparseGraph }