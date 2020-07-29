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

const isSubtree = (
	tree: Tree<number>|null,
	subtree: Tree<number>|null,
): boolean => {
	if (subtree === null) {
		return true
	}
	else {
		return recurseIsSubtree(tree, subtree)
	}
}

const recurseIsSubtree = (
	tree: Tree<number>|null,
	subtree: Tree<number>|null,
): boolean => {
	// check if either tree is null.
	if (tree === null && subtree === null) {
		return true
	}
	else if (tree === null) {
		return false
	}
	else if (subtree === null) {
		return false
	}

	// start by checking if the given nodes are a match.
	if (tree.value === subtree.value) {
		console.log('values match.', tree.value)
		if (!recurseIsSubtree(tree.left, subtree.left)) {
			// is not a subtree. end early.
		}
		else if (!recurseIsSubtree(tree.right, subtree.right)) {
			// is not a subtree.
		}
		else {
			return true
		}
	}

	// check if its a subtree of any children.
	if (!recurseIsSubtree(tree.left, subtree)) {
		// is not a subtree. end early.
	}
	else if (!recurseIsSubtree(tree.right, subtree)) {
		// is not a subtree.
	}
	else {
		return true
	}

	// this entire branch is fruitless.
	// it is does not have a subtree.
	return false
}
