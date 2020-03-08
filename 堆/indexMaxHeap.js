/**
 * 最大索引堆，将this.compare反转即可变成最小索引堆
 */
class IndexMaxHeap {
	constructor (comparator) {
		this.container = [] // 存储数据
		this.indexes = []   // 存储数据对应的索引
		comparator && (this.compare = comparator) // 比较器
	}
	print () {
		console.log('indexes', this.indexes)
		console.log('container', this.container)
	}
	size () {
		return this.indexes.length
	}
	push (index, edge) {
		this.container[index] = edge
		this.indexes.push(index) // 存储索引
		this.shiftUp()
	}
	// 取出最大值，相应对后面的值进行shiftDown操作
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
    // 取出最大值的索引
    shiftIndex () {
        const index = this.indexes.pop()

		if (this.indexes.length === 0) {
			return index
        }
        
        const item =  this.indexes[0]
	    this.indexes[0] = index // 调整索引值并进行shiftDown操作
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
	// 内部排序使用
	getItem (index) {
		return this.container[this.indexes[index]]
	}
	// 供用户使用，获取对应索引的值
	get (index) {
		return this.container[index]
	}
	swap (a, b) {
		// 交换索引数组中的索引，不改变container数组
		const tmp = this.indexes[a]
		this.indexes[a] = this.indexes[b]
		this.indexes[b] = tmp
	}
	/**
	 * 父元素小则交换（最大堆）
	 * @param {*} parent 当前元素
	 * @param {*} child 当前元素的父元素
	 */
	compare (parent, child) {
		return parent < child
	}
	/**
	 * [将新插入的元素的索引向上移动]
	 */
	shiftUp (current = this.indexes.length - 1) {
		// 如果父元素大于当前元素则要换下来
		while (
			this.hasParent(current) &&
			this.compare(this.getParent(current), this.getItem(current))
		) {
			const parentIndex = this.getParentIndex(current)
			this.swap(current, parentIndex) // 当前元素和父元素交换，直到交换到顶部，也可以
			current = parentIndex // 继续向上遍历
		}
	}
	shiftDown (parent = 0) {
		// 判断是否有左孩子就可以确定当前节点有没有子元素，没有子元素的话，循环就没有必要进行了
		while (this.hasLeftChild(parent)) {
			// 每轮循环的目的是，让子元素中的较大值和父元素交换
			const smallerChild = (
				this.hasRightChild(parent) &&
				this.compare(this.getLeftChild(parent), this.getRightChild(parent))
			)
			? this.getRightChildIndex(parent)
			: this.getLeftChildIndex(parent)
			

			// 如果父元素大于等于子元素
			if (!this.compare(this.getItem(parent), this.getItem(smallerChild))) break;

			this.swap(parent, smallerChild)

			parent = smallerChild // 循环继续
		}
	}
	/**
	 * 注意改的是container，但是调整的是indexes数组，这里比较绕
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
