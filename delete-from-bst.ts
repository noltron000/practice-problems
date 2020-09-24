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

const deleteFromBST = (
	tree: Tree<number>,
	queries: Array<number>,
): Tree<number>|null => {
	// base case; just return the tree
	if (tree === null) {
		return tree
	}
	if (queries.length === 0) {
		return tree
	}

	// search the left side for matching values.
	tree.left = deleteFromBST(tree.left, queries)

	// search the right side for matching values.
	tree.right = deleteFromBST(tree.right, queries)


	// check this node for queries.
	if (queries.includes(tree.value)) {

		// remove first instance of tree-value from queries.
		const target: number = queries.indexOf(tree.value)
		queries.splice(target, 1)

		// delete this node.
		if (tree.left === null) {
			tree = tree.right
		}
		else {
			// track left and right values.
			const left: Tree<number> = tree.left
			const right: Tree<number> = tree.right

			// keep the parent node handy.
			let parent: Tree<number> = null

			// get the start of the left branch.
			tree = tree.left

			// get the rightmost node of the left branch
			while (tree.right !== null) {
				parent = tree
				tree = tree.right
			}
			if (parent !== null) {
				parent.right = tree.left
				tree.left = left
			}
			tree.right = right
		}
	}
	// finally, return the tree.
	return tree
}
