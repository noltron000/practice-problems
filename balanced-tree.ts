//
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

const isTreeSymmetric = (
	root: Tree<number>
): boolean => {
	const leftRows = compileRows(root)
	const rightRows = compileRows(root).map(row => row.reverse())

	return areSameArray(leftRows, rightRows)
}

const areSameArray = (
	arrays01: Array<Array<number|null>>,
	arrays02: Array<Array<number|null>>,
): boolean => {
	if (arrays01.length !== arrays02.length) {
		return false
	}
	for (let i = 0; i < arrays01.length; i++) {
		const array01 = arrays01[i]
		const array02 = arrays02[i]
		if (array01.length !== array02.length) {
			return false
		}
		for (let j = 0; j < array01.length; j++) {
			const item01 = array01[j]
			const item02 = array02[j]
			if (item01 !== item02) {
				return false
			}
		}
	}
	return true
}

const compileRows = (
	tree: Tree<number>|null,
	depth: number = 0,
	rows?: Array<Array<number|null>>,
): Array<Array<number|null>> => {
	// create rows array & rows@depth array
	if (!rows) {
		rows = []
	}
	if (!rows[depth]) {
		rows[depth] = []
	}

	// ensure the tree isnt empty
	if (tree !== null) {
		// add the tree's value to the row@depth array.
		rows[depth].push(tree.value)

		// increment the depth
		depth += 1

		// update the rows@depth array with the children.
		rows = compileRows(tree.left, depth, rows)
		rows = compileRows(tree.right, depth, rows)
	}

	// the tree is empty
	else {
		// use null to represent an empty tree.
		// hopefully the tree values aren't ever null.
		rows[depth].push(null)
	}

	// this will help determine mirrored values
	return rows
}
