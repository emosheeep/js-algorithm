/**
 * 实现一个索引堆
 */
class IndexMaxHeap {
	constructor () {
		this.container = [] // 存储数据
		this.indexes = []   // 存储数据对应的索引
	}
	size () {
		return this.indexes.length
	}
	print () {
		console.log('indexes', this.indexes)
		console.log('container', this.container)
	}
	push (item) {
		this.container.push(item)
		this.indexes.push(this.container.length - 1) // 存储索引
		this.shiftUp()
	}
	// 取出优先队列第一个值，相应对后面的值进行shiftDown操作，保持最大堆的性质
	shift () {
		const index = this.indexes.pop()

		if (this.indexes.length === 0) {
			return this.container[index]
		}

	    const item = this.getItem(0)

	    this.indexes[0] = index // 将索引数组末尾值放到头顶
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
		return this.getLeftChildIndex(index) < this.indexes.length
	}
	hasRightChild (index) {
		return this.getRightChildIndex(index) < this.indexes.length
	}
	getLeftChild (index) {
		return this.getItem(this.getLeftChildIndex(index))
	}
	getRightChild (index) {
		return this.getItem(this.getRightChildIndex(index))
	}
	getItem (index) {
		return this.container[this.indexes[index]]
	}
	swap (a, b) {
		// 交换索引数组中的索引，不改变container数组
		const tmp = this.indexes[a]
		this.indexes[a] = this.indexes[b]
		this.indexes[b] = tmp
	}
	/**
	 * [将新插入的元素的索引向上移动]
	 */
	shiftUp (current = this.indexes.length - 1) {
		// 如果父元素小则要换下来
		while (this.hasParent(current) && this.getParent(current) < this.getItem(current)) {
			const parentIndex = this.getParentIndex(current)
			this.swap(current, parentIndex) // 当前元素和父元素交换，直到交换到顶部，也可以
			current = parentIndex // 继续向上遍历
		}
	}
	shiftDown (parent = 0) {
		// 可以类似插入排序的优化，将交换变为赋值
		// 判断是否有左孩子就可以确定当前节点有没有子元素，没有子元素的话，循环就没有必要进行了
		while (this.hasLeftChild(parent)) {
			// 每轮循环的目的是，让子元素中的较大值和父元素交换
			// 有右孩子，且右孩子大于左孩子，则和右孩子交换，否则和左孩子交换
			const biggerIndex = (
				this.hasRightChild(parent) &&
				this.getRightChild(parent) > this.getLeftChild(parent)
			)
			? this.getRightChildIndex(parent)
			: this.getLeftChildIndex(parent)
			

			// 如果父元素没有子元素，或大于子元素则退出，循环结束
			if (this.getItem(parent) >= this.getItem(biggerIndex)) break;

			this.swap(parent, biggerIndex)

			parent = biggerIndex // 循环继续
		}
	}
	/**
	 * 注意改的是container，但是调整的是indexes数组
	 * @param  index [要修改的索引]
	 * @param  item  [要修改的值]
	 */
	change (index, item) {
		// 传入的index是container的index
		this.container[index] = item
		// 为了维持堆的性质，还需要尝试将indexes中值为index的索引进行shiftUp或者shiftDown，调整位置
		index = this.indexes.indexOf(index)

		if (index !== -1) {
			this.shiftUp(index)
			this.shiftDown(index)
		}
	}
}

module.exports = { IndexMaxHeap }