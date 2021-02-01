const feedingTime = (groups) => {
	// create an adjacency list.
	const adjacency = groups.map(( ) => [ ])
	// create a visited list.
	const visited = groups.map(( ) => false)
	// create output list.
	const components = [ ]

	// create a helper function.
	const search = (id01) => {
		let counter = 1
		adjacency[id01].forEach((neighbor, id02) => {
			if (visited[id02] === false) {
				visited[id02] = true
				counter += search(id02)
			}
		})
		return counter
	}

	groups.forEach((animals01, id01) => {
		groups.forEach((animals02, id02) => {
			if (
				   id01 !== id02
				&& animals01.length > 0
				&& animals02.length > 0
			) {
				adjacency[id01].push(id02)
			}
		})
	})

	groups.forEach((animals, id) => {
		if (visited[id] === false) {
			components.push(search(id))
		}
	})

	console.log(components)
	return components.length
}
