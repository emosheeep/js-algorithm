/**
 * 并查集第二版（Quick Union）：使用指针构造出一颗树
 */ 
class UnionFind2 {
    constructor (count) {
        this.parent = []
        // 初始情况下元素自身等于索引即可
        // 用来表示没有两个元素是连接在一起的
        for (let i = 0; i < count; i ++)
            this.parent.push(i)
    }
    find (index) {
        console.assert(index >= 0 && index <= this.parent.length - 1, '越界')
        // 如果索引和自身不等，说明指向更改，需要回溯到这棵树的根节点
        while (index !== this.parent[index]) {
            index = this.parent[index]
        }
        return index
    }
    isConnected (p, q) {
        return this.find(p) === this.find(q)
    }
    // 将两个元素并在一起，让id值相等
    union (p, q) {
        const pRoot = this.find(p), qRoot = this.find(q)
        if (pRoot === qRoot)
            return

        this.parent[qRoot] = pRoot
    }
}

module.exports = { UnionFind2 }