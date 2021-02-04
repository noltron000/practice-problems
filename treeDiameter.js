const createTree = (nodeCount, edges) => {
	// initialize tree array with "n" empty array items.
	const tree = Array.from(new Array(nodeCount)).map(( ) => [ ])

	// loop over each edge in edges list.
	edges.forEach(([node01, node02]) => {
		tree[node01].push(node02)
		tree[node02].push(node01)
	})

	// tree is done.
	return tree
}

const treeDiameter = (nodeCount, edges) => {
	// initialize tree.
	const tree = createTree(nodeCount, edges)

	// declare max path.
	const bestPath = [ ]
	// declare visited. all nodes aren't visited at first.
	const visited = tree.map(( ) => false)
	// declare current max.
	let max = 0

	// create search function.
	const searchDFS = (current) => {
		// visiting this node.
		visited[current] = true

		// obtain -valid- children.
		const children = tree[current].filter((child) => {
			// is only valid if child is not visited.
			return visited[child] === false
		})

		// get just the amount for each child.
		.map((child) => {
			return searchDFS(child)
		})

		// sort paths by length. (largest first)
		children.sort((a, b) => {
			return b - a
		})

		// only keep the best two children.
		children.splice(2)

		// return items
		if (children.length > 1) {
			max = Math.max(max, children[0] + children[1])
			return Math.max(children[0], children[1]) + 1
		}

		else if (children.length > 0) {
			max = Math.max(max, children[0])
			return children[0] + 1
		}

		else {
			return 1
		}
	}
	searchDFS(0)
	return max
}

const n = 10
const tree =
[[2,5],
 [5,7],
 [5,1],
 [1,9],
 [1,0],
 [7,6],
 [6,3],
 [3,8],
 [8,4]]

console.log(
	treeDiameter(n, tree)
)
