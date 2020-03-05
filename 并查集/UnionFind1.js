// 并查集第一版（Quick Find）：查很快，但并操作不快
class UnionFind1 {
    constructor (count) {
        this.id = []
        // 初始情况下元素自身等于索引即可
        // 用来表示没有两个元素是连接在一起的
        for (let i = 0; i < count; i ++)
            this.id.push(i)
    }
    find (p) {
        console.assert(p >= 0 && p <= this.id.length - 1, '越界')
        return this.id[p]
    }
    isConnected (p, q) {
        return this.find(p) === this.find(q)
    }
    // 将两个元素并在一起，让id值相等
    union (p, q) {
        const pID = this.find(p), qID = this.find(q)
        if (pID === qID)
            return

        for (let i = 0; i < this.id.length; i ++) {
            if (this.id[i] === pID)
                this.id[i] === qID
        }
    }
}

module.exports = { UnionFind1 }