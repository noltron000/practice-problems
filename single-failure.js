const singlePointOfFailure = (connections) => {
	const nodes = getNodes(connections)
	const edges = getEdges(nodes)
	return countPointsOfFailure(edges)
}

const countPointsOfFailure = (edges) => {
	let pointsOfFailure = 0
	for (const edge of edges) {
		// perform a DFS to see if we can reach A from B.
		const [startKey, targetKey] = [...edge]
		const results = depthFirstSearch(nodes, startKey, targetKey)
		if (results === false) {
			pointsOfFailure += 1 // we can't!
		}
	}
	return pointsOfFailure // all nodes can be accessed in multiple ways.
}

// O(n^2)
const getNodes = (connections) => {
	nodes = []
	connections.forEach((connection, nodeKey) => {
		connection.forEach((cord, neighborKey) => {
			if (cord === 1) {
				nodes[nodeKey] = nodes[nodeKey] ?? []
				nodes[nodeKey].push(neighborKey)
			}
		})
	})
	return nodes
}

// O(n * m)
// n is number of nodes
// m is number of neighbors (varies)
// m <= n
const getEdges = (nodes) => {
	// determine edges for given nodes.
	let edges = new Set()

	// find all edges.
	nodes.forEach((neighbors, nodeKey) => {
		neighbors.forEach((neighborKey) => {
			const edge = [nodeKey, neighborKey].sort()
			const edgeString = JSON.stringify(edge)
			edges.add(edgeString)
		})
	})
	// clean all edgeStrings into normal edge arrays.
	edges = new Set([...edges].map((edgeString) => {
		return JSON.parse(edgeString)
	}))

	return edges
}

// O(n * log(n))
const depthFirstSearch = (nodes, startKey, targetKey) => {
	// NOTE: setting up edge aversion.

	// set up depth-first search.
	const visiting = new Set()
	const completed = new Set()
	const search = (nodeKey, path = undefined) => {
		// track the path.
		path = path ?? []
		path = path.slice()
		path.push(nodeKey)

		// base case: node is/has already being/been visited.
		if (visiting.has(nodeKey) || completed.has(nodeKey)) {
			return false
		}
		// base case: node is desired key.
		else if (nodeKey === targetKey) {
			return true
		}

		// this node is now being visited.
		visiting.add(nodeKey)

		// visit all children.
		for (const neighborKey of nodes[nodeKey]) {
			if (nodeKey === startKey && neighborKey === targetKey) {
				continue
			}
			else if (search(neighborKey, path)) {
				return true
			}
		}

		// no good results.
		visiting.delete(nodeKey)
		completed.add(nodeKey)
		return false
	}

	// utilize DFS setup.
	return search(startKey)
}
