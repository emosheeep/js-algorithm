/**
 * 实现一个最小堆
 */
class MinHeap {
	constructor (comparator) {
		this.container = []
		comparator && (this.compare = comparator)
	}
	print () {
		console.log(this.container)
	}
	size () {
		return this.container.length
	}
	push (item) {
		this.container.push(item)
		this.shiftUp()
	}
	// 取出优先队列第一个值，相应对后面的值进行shiftDown操作，保持最大堆的性质
	shift () {
	    if (this.container.length === 0) {
	      return null;
	    }

	    if (this.container.length <= 1) {
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
		return this.container[this.getParentIndex(index)]
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
		return this.container[this.getLeftChildIndex(index)]
	}
	getRightChild (index) {
		return this.container[this.getRightChildIndex(index)]
	}
	swap (a, b) {
		const tmp = this.container[a]
		this.container[a] = this.container[b]
		this.container[b] = tmp
	}
	compare (parent, child) {
		return parent > child // 最小堆中，父元素大则交换
	}
	/**
	 * [将新插入的元素向上移动]
	 */
	shiftUp () {
		let current = this.container.length - 1
		const target = this.container[current] // 对新插入的元素shiftUp
		// 如果父元素小则要换下来
		while (
			this.hasParent(current) && 
			this.compare(this.getParent(current), target)
		) {
			const parentIndex = this.getParentIndex(current)
			this.container[current] = this.container[parentIndex]
			current = parentIndex // 继续向上遍历
		}
		this.container[current] = target
	}
	shiftDown (parent = 0) {
		// 判断是否有左孩子就可以确定当前节点有没有子元素，没有子元素的话，循环就没有必要进行了
		while (this.hasLeftChild(parent)) {
			// 每轮循环的目的是，让子元素中的较小值和父元素交换
			const smallerIndex = (
				this.hasRightChild(parent) &&
				// 左孩子大于右孩子（这里为了统一comparator，借助compare函数进行比较）
				this.compare(this.getLeftChild(parent), this.getRightChild(parent))
			)
			? this.getRightChildIndex(parent)
			: this.getLeftChildIndex(parent)
			

			// 如果父元素没有子元素，或大于子元素则退出，循环结束
			if (!this.compare(this.container[parent], this.container[smallerIndex])) break;

			this.swap(parent, smallerIndex)
			parent = smallerIndex // 循环继续
		}
	}
}

module.exports = { MinHeap }