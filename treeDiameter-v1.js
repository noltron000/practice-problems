const treeDiameter = (n, tree) => {
	tree = makeTree(n, tree)
	const visited = tree.map(( ) => false)
	let bestPath = [ ]

	const search = (current = 0, parentPath = undefined) => {

		// base case #1: short-circuit visited nodes.
		if (visited[current] === true) {
			return parentPath
		}

		// mark current as visited.
		visited[current] = true
		// copy the parentPath, or create it.
		parentPath = [...parentPath ?? [ ]]
		// add item to parentPath
		parentPath.push(current)

		const children = tree[current].filter((child) => {
			return visited[child] === false
		})

		// discover children paths
		let childPaths = [ ]
		children.forEach((child) => {
			const path = search(child, parentPath)
			childPaths.push(path)
		})

		// sort largest to smallest and trim these.
		childPaths.sort((a, b) => b.length - a.length)
		childPaths.splice(2)
		childPaths.forEach((path) => {
			path.splice(0, parentPath.length)
		})

		console.log('')
		console.log('---')
		console.log('children:', childPaths)
		console.log('parent:', parentPath)
		console.log('best:', bestPath)



		// check case 1: more than one child
		if (children.length > 1) {
			console.log('both children:', [...childPaths[0].reverse(), current, ...childPaths[1]])
			if (bestPath.length < childPaths[0].length + childPaths[1].length + 1) {
				bestPath = [...childPaths[0].reverse(), current, ...childPaths[1]]
			}
		}

		// check case 2: more than zero children
		if (children.length > 0) {
			console.log('one child:', [...parentPath, ...childPaths[0]])
			if (bestPath.length < parentPath.length + childPaths[0].length) {
				bestPath = [...parentPath, ...childPaths[0]]
			}
		}

		// check case 3: no children
		if (children.length === 0) {
			if (bestPath.length < parentPath.length) {
				bestPath = [...parentPath]
			}
		}

		return parentPath
	}
	search()
	return bestPath.length - 1
}

const makeTree = (nodeCount, edges) => {
	let tree = Array.from(new Array(nodeCount)).map(( ) => [ ])
	edges.forEach(([node01, node02]) => {
		tree[node01].push(node02)
		tree[node02].push(node01)
	})

	tree.forEach((node, index) => {
		console.log(index, node)
	})

	return tree
}
