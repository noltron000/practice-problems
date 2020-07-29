// Binary trees are already defined with this interface:
class Tree<Type> {
	value: Type
	left: Tree<Type>
	right: Tree<Type>
	constructor(
		value: Type
	) {
		this.value = value
		this.left = null
		this.right = null
	}
}

const hasPathWithGivenSum = (
	tree: Tree<number>,
	targetSum: number,
	currentSum: number = 0,
): boolean => {
	// base case - tree is null
	if (tree === null) {
		return false
	}

	// increment currentSum
	currentSum += tree.value

	// if this is a leaf node
	if (tree.left === null && tree.right === null) {
		if (targetSum === currentSum) {
			return true
		}
		else {
			return false
		}
	}

	// otherwise dive deeper
	else if (hasPathWithGivenSum(tree.left, targetSum, currentSum)) {
		return true
	}
	else if (hasPathWithGivenSum(tree.right, targetSum, currentSum)) {
		return true
	}

	// none of the children give valid results
	else {
		return false
	}
}
