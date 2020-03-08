/**
 * 最小堆的定制版，每个元素都是Edge对象，使用edge.weight（每条边的权值）作为比较的对象
 */
class MinHeap {
	constructor () {
		this.container = []
    }
    size () {
        return this.container.length
    }
    getItem (index) {
		return this.container[index].weight // 修改这里即可
	}
	print () {
		console.log(this.container)
	}
	push (item) {
		this.container.push(item)
		this.shiftUp()
	}
	// 获取优先队列的第一个值
	peek () {
		if (this.container.length === 0) {
	      return null
	    }
	    return this.container[0]
	}
	// 取出优先队列第一个值，相应对后面的值进行shiftDown操作，保持最大堆的性质
	shift () {
	    if (this.container.length === 0) {
	      return null;
	    }

	    if (this.container.length === 1) {
	      return this.container.pop()
	    }

	    const item = this.container[0]

	    this.container[0] = this.container.pop() // 将队列最后一个值拿出来放到顶部
	    this.shiftDown()

	    return item
	}
	getParentIndex (index) {
		return Math.floor((index - 1) / 2)
	}
	getParent (index) {
		return this.getItem(this.getParentIndex(index))
	}
	hasParent(childIndex) {
	    return childIndex > 0;
	}
	getLeftChildIndex (index) {
		return index * 2 + 1
	}
	getRightChildIndex (index) {
		return index * 2 + 2
	}
	hasLeftChild (index) {
		return this.getLeftChildIndex(index) < this.container.length
	}
	hasRightChild (index) {
		return this.getRightChildIndex(index) < this.container.length
	}
	getLeftChild (index) {
		return this.getItem(this.getLeftChildIndex(index))
	}
	getRightChild (index) {
		return this.getItem(this.getRightChildIndex(index))
	}
	swap (a, b) {
		const tmp = this.container[a]
		this.container[a] = this.container[b]
		this.container[b] = tmp
	}
	/**
	 * [将新插入的元素向上移动]
	 */
	shiftUp () {
		let current = this.container.length - 1
        const targetValue = this.getItem(current) // 对新插入的元素shiftUp，使用键值比较
        const target = this.container[current] // 保存目标对象
		// 如果父元素对应键值大则要换下来
		while (this.hasParent(current) && this.getParent(current) > targetValue) {
			const parentIndex = this.getParentIndex(current)
			this.container[current] = this.container[parentIndex]
			current = parentIndex // 继续向上遍历
        }
        // 交换的是数组里面的对象，但比较用的是对象的键值
		this.container[current] = target
	}
	shiftDown (parent = 0) {
		// 判断是否有左孩子就可以确定当前节点有没有子元素，没有子元素的话，循环就没有必要进行了
		while (this.hasLeftChild(parent)) {
			// 每轮循环的目的是，让子元素中的较大值和父元素交换
			// 有右孩子，且右孩子小于左孩子，则和右孩子交换，否则和左孩子交换
			const smallerIndex = (
				this.hasRightChild(parent) &&
				this.getRightChild(parent) < this.getLeftChild(parent)
			)
			? this.getRightChildIndex(parent)
			: this.getLeftChildIndex(parent)
			

			// 如果父元素没有子元素，或大于子元素则退出，循环结束
			if (this.getItem(parent) <= this.getItem(smallerIndex)) break;

			this.swap(parent, smallerIndex)
			parent = smallerIndex // 循环继续
		}
	}
}

module.exports = { MinHeap }