// Binary trees are already defined with this interface:
class Tree<Type> {

	// declare property types
	value: Type
	left: Tree<Type>
	right: Tree<Type>

	// constructor takes one value.
	constructor(
		value: Type
	) {
		this.value = value
		this.left = null
		this.right = null
	}
}

const restoreBinaryTree = (
	inOrder: Array<number>,
	preOrder: Array<number>,
): Tree<number>|null => {
	// don't mutate the input objects.
	// make copies of them instead.
	inOrder = [...inOrder]
	preOrder = [...preOrder]

	// use the recursive helper function to solve the rest.
	return restoreBinaryTreeNode(inOrder, preOrder)
}

const restoreBinaryTreeNode = (
	inOrder: Array<number>,
	preOrder: Array<number>,
): Tree<number>|null => {
	// check the base case, that either array is zero-length.
	if (preOrder.length === 0 || inOrder.length === 0) {
		return null
	}

	// extract the current node's value from preOrder.
	// its the very first index of the array.
	const value = preOrder.shift()

	// create the root node for this recurse using the value.
	const node: Tree<number> = new Tree<number>(value)

	// this node's value exists with inOrder as well.
	// locate the first instance of the value for a pivot.
	// this puts an equal child node on the right.
	// change this to lastIndexOf to make it the left child.
	const valueIndex = inOrder.indexOf(value)

	// with this index, split the inOrder array into halves.
	// however, exclude the valueIndex, as its been "used".
	// use slice, not splice, to avoid mutating the array.
	const leftInOrder = inOrder.slice(0, valueIndex)
	const rightInOrder = inOrder.slice(valueIndex + 1)

	// recursively establish left and right nodes.
	node.left = restoreBinaryTreeNode(leftInOrder, preOrder)
	node.right = restoreBinaryTreeNode(rightInOrder, preOrder)

	// return the newly forged tree node.
	return node
}
