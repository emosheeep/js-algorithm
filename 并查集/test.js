const { UnionFind1 } = require('./UnionFind1.js')
const { UnionFind2 } = require('./UnionFind2.js')
const { UnionFind3 } = require('./UnionFind3.js')
const { UnionFind4 } = require('./UnionFind4.js')
const { UnionFind5 } = require('./UnionFind5.js')

const n = 100000

// test(new UnionFind1(n), 'u1')
// test(new UnionFind2(n), 'u2')
test(new UnionFind3(n), 'u3')
test(new UnionFind4(n), 'u4')
test(new UnionFind5(n), 'u5')

function test (u, str) {
    console.time(str)
    for (let i = 0; i < n; i++) {
        const a = Math.floor(Math.random() * n)
        const b = Math.floor(Math.random() * n)
        u.union(a, b)
    }
    for (let i = 0; i < n; i++) {
        const a = Math.floor(Math.random() * n)
        const b = Math.floor(Math.random() * n)
        u.isConnected(a, b)
    }
    console.timeEnd(str)
}
