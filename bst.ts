// Binary trees are already defined with this interface:
class Tree<Type> {
	value: Type;
	left: Tree<Type>;
	right: Tree<Type>;

	constructor(value: Type) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

const kthSmallestInBST = (
	root: Tree<number>,
	k: number,
): number|null => {
	const searchNodes = (
		node: Tree<number>,
	): Tree<number>|null => {

		// are there smaller nodes?
		if (node.left !== null) {
			const foundNode = searchNodes(node.left)
			if (foundNode !== null) {
				return foundNode
			}
		}

		// visit this node, reducing k by 1.
		k -= 1

		// is this the correct node? if it is, we found it!
		if (k == 0) {
			return node
		}

		// are there larger nodes?
		if (node.right !== null) {
			const foundNode = searchNodes(node.right)
			if (foundNode !== null) {
				return foundNode
			}
		}

		// the search of this entire branch is fruitless.
		return null
	}

	// visit the first node, in searching for the smallest.
	// this will recursively search its children as well.
	const foundNode = searchNodes(root)

	// here's the kth smallest node value.
	if (foundNode !== null) {
		return foundNode.value
	}

	// this might fail if k is larger
	// than the total number of tree nodes.
	else {
		return null
	}
}
