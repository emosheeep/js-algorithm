/**
 * 二分搜索树
 */
function Node (value) {
	this.value = value
	this.leftChild = this.rightChild = null
}
class BST {
	constructor () {
		this.root = null
		this.count = 0
	}
	isEmpty () {
		return this.count === 0
	}
	size () {
		return this.count
	}
	add (value) {
		const node = new Node(value)
		let current = this.root
		let parent;

		if (this.root === null) {
			this.root = node
			this.count ++
			return
		} 

		while (true) {
			parent = current
			if (value < current.value) {
				current = current.leftChild
				if (current === null) {
					parent.leftChild = node
					this.count ++
					break
				}
			} else if (value > current.value) {
				current = current.rightChild
				if (current === null) {
					parent.rightChild = node
					this.count ++
					break
				}
			} else {
				break
			}
		}
	}
	remove (value) {
		let current = this.root
		let parent = null
		let isRightChild = true // 标识最终的current是parent的左孩子还是右孩子

		if (!current || !this.contain(value)) // 根节点为空或值不存在则不能删除了
			return;

		// 循环结束后，current为要删除的结点，parent为要删除的节点的父节点
		while (true) {
			if (value > current.value) {
				parent = current
				current = current.rightChild
				isRightChild = true
			} else if (value < current.value) {
				parent = current
				current = current.leftChild
				isRightChild = false
			} else {
				break
			}
		}

		if (current.leftChild === null) {
			// current只存在右孩子，就用左孩子代替删除的元素
			parent[
				isRightChild
				? 'rightChild'
				: 'leftChild'
			] = current.rightChild
		} else if (current.rightChild === null) {
			// current只存在左孩子,就用左孩子代替删除的元素
			parent[
				isRightChild
				? 'rightChild'
				: 'leftChild'
			] = current.leftChild
		} else {
			// 有两个孩子
			// 找到current右节点的最小值结点
			let rightMinNode = __removeRightMin(current)
			// 将该节点放到要删除的节点位置，链接其左右子孩子
			rightMinNode.leftChild = current.leftChild
			rightMinNode.rightChild = current.rightChild

			if (parent === null) {
				// 说明当前节点是根节点
				this.root = rightMinNode
			} else {
				parent[
					isRightChild
					? 'rightChild'
					: 'leftChild'
				] = rightMinNode
			}
		}

		// 删除并返回parent节点右子树的最小结点
		function __removeRightMin(parent) {
			let current = parent
			let isRightChild = true
			current = current.rightChild // 先切换到右子树

			while (true) {
				// 找到最右子树最左侧的元素
				if (current.leftChild !== null) {
					parent = current
					current = current.leftChild // 深入左孩子
					isRightChild = false
				} else {
					break
				}
			}

			// 删除最小节点
			parent[
				isRightChild
				? 'rightChild'
				: 'leftChild'
			] = current.rightChild

			return current
		}
	}
	removeMin () {
		let current = this.root
		if (!current) // 根节点为空则不能删除了
			return;
		const parent = null

		while (true) {
			// 找到最左侧的元素
			if (current.leftChild !== null) {
				parent = current // 保存父节点
				current = current.leftChild // 深入左孩子
			} else {
				break
			}
		}

		// 找到最小值后判断是否有右节点，有则替换
		parent.leftChild = current.rightChild 
			? current.rightChild
			: null

		this.count --
	}
	// 查找最值的过程还可以使用递归实现
	removeMax () {
		if (this.root) {
			this.root = __removeMax(this.root)
			this.count --
		}
		// 删除掉node为根节点二分搜索树的最大节点
		// 返回删除节点后新的二分搜索树的根
		function __removeMax(node) {
			if (node.rightChild === null) {
				return node.leftChild
			}

			node.rightChild = __removeMax(node.rightChild)
			return node
		}
	}
	min (node = this.root) {
		if (node.leftChild) {
			return this.min(node.leftChild)
		} 
		return node
	}
	max (node = this.root) {
		if (node.rightChild) {
			return this.max(node.rightChild)
		} 
		return node
	}
	contain (value, current = this.root) {
		if (current === null) {
			return false
		}

		if (value > current.value) {
			return this.contain(value, current.rightChild)
		} else if (value < current.value) {
			return this.contain(value, current.leftChild)
		} else {
			return true
		}
	}
	search (value, current = this.root) {
		if (current === null) {
			return null
		}

		if (value > current.value) {
			return this.search(value, current.rightChild)
		} else if (value < current.value) {
			return this.search(value, current.leftChild)
		} else {
			return current
		}
	}
	preOrder (node = this.root) {
		if (node !== null) {
			console.log(node.value)
			this.preOrder(node.leftChild)
			this.preOrder(node.rightChild)
		}
	}
	inOrder (node = this.root) {
		if (node !== null) {
			this.inOrder(node.leftChild)
			console.log(node.value)
			this.inOrder(node.rightChild)
		}
	}
	postOrder (node = this.root) {
		if (node !== null) {
			this.postOrder(node.leftChild)
			this.postOrder(node.rightChild)
			console.log(node.value)
		}
	}
	/**
	 * 层序遍历（广度优先）
	 */
	levelOrder () {
		const list = []
		list.push(this.root)
		while (list.length !== 0) {
			const node = list.shift()
			console.log(node.value)
			if (node.leftChild) {
				list.push(node.leftChild)
			}
			if (node.rightChild) {
				list.push(node.rightChild)
			}
		}
	}
}

const bst = new BST()
bst.add(41)
bst.add(22)
bst.add(15)
bst.add(13)
bst.add(33)
bst.add(37)
bst.add(58)
bst.add(50)
bst.add(42)
bst.add(53)
bst.add(60)
bst.add(59)
bst.add(63)
bst.remove(41)
bst.levelOrder()