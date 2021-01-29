class Stack {
	constructor (...array) {
		this.stack = [...array]
	}

	push (item) {
		this.stack.push(item)
	}

	pop () {
		return this.stack.pop()
	}

	peek () {
		return this.stack[this.stack.length - 1]
	}

	isEmpty () {
		return (this.stack.length <= 0)
	}

	hasEntries () {
		return (this.stack.length > 0)
	}
}

const hasDeadlock = (connections) => {
	// set up stack and visiting items.
	const untouched = new Set()
	const visiting = new Set()
	const completed = new Set()

	// create a lookup table
	nodes = []
	connections.forEach((children, index) => {
		untouched.add(index)
		nodes[index] = {index, children}
	})


	// set up depth-first traversal.
	const searchDFT = (index) => {
		// this node has officially been touched
		untouched.delete(index)

		// get node info
		const node = nodes[index]

		// check if its already being visited.
		if (visiting.has(index) && !completed.has(index)) {
			return true // cycle found.
		}

		// currently visiting node.
		visiting.add(node.index)

		// visit all children.
		for (const childIndex of node.children) {
			if (!completed.has(childIndex)) {
				const result = searchDFT(childIndex)
				if (result === true) {
					return true // cycle found in children.
				}
			}
		}

		// completed visiting node without issue.
		completed.add(node.index)
		return false
	}

	// utilize helper function.
	while (untouched.size > 0) {
		const seed = untouched.keys().next().value
		const results = searchDFT(seed)
		if (results === true) {
			return true
		}
	}

	return false
}
