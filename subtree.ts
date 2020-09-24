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
	subtree: Tree<number>|null
): boolean => {
	/* BASE CASES *******************************************/
	// both trees are strictly identical.
	if (tree === subtree) {
		return true
	}
	// a subtree of nothingness always exists at the leaves.
	else if (subtree === null) {
		return true
	}
	// without a tree there can be no subtree.
	else if (tree === null) {
		return false
	}

	/* SUBTREE STARTS AT THIS NODE **************************/
	// investigate any subtrees starting at this node.
	else if (matchSubnodes(tree, subtree)) {
		return true
	}

	/* SUBTREE STARTS AT A CHILD NODE ***********************/
	// investigate any subtrees starting at child nodes.
	// the left branches might have subtrees.
	else if (isSubtree(tree.left, subtree)) {
		return true
	}
	// maybe the right branches have subtrees.
	else if (isSubtree(tree.right, subtree)) {
		return true
	}

	/* THERE IS NO SUBTREE **********************************/
	// this entire branch is fruitless; it has no matches.
	else {
		return false
	}
}


const matchSubnodes = (
	tree: Tree<number>|null,
	subtree: Tree<number>|null
): boolean => {
	/* BASE CASES *******************************************/
	// both trees are strictly identical.
	if (tree === subtree) {
		return true
	}
	// the tree still has children, but the subtree ended.
	else if (subtree === null) {
		return false
	}
	// the subtree still has children, but the tree ended.
	else if (tree === null) {
		return false
	}

	/* CHECK THIS STEP **************************************/
	// the values don't match so its not a subtree.
	else if (tree.value !== subtree.value) {
		return false
	}

	/* CHECK CHILD STEPS ************************************/
	// the left branch doesn't match up for some reason.
	else if (!matchSubnodes(tree.left, subtree.left)) {
		return false
	}
	// the right branch doesn't match up for some reason.
	else if (!matchSubnodes(tree.right, subtree.right)) {
		return false
	}

	/* SUCCESS **********************************************/
	// looks like the subnodes match after all.
	else {
		return true
	}
}
