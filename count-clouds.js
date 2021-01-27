class Stack {
	constructor(...data) {
		this.data = data
	}

	// get the "height" of the stack, or number of nodes.
	get size () {
		return this.data.length
	}

	// the stack has nodes if its size is greater than zero.
	get hasNodes () {
		return this.size !== 0
	}

	// add an node to the "top" of the stack.
	push (node) {
		this.data.push(node)
	}

	// remove a node from the "top" of the stack,
	// and then return it.
	pop () {

		// get the result, which might be undefined.
		const result = this.data.pop()

		// filter out the possibility of returning undefined.
		if (result !== undefined) {
			return result
		} else {
			throw new Error('Cannot pop an empty stack!')
		}
	}

	// return the node at the "top" of the stack,
	// but do not remove it.
	peek () {

		// get the result, which might be undefined.
		const result = this.data.slice(-1)[0]

		// filter out the possibility of returning undefined.
		if (result !== undefined) {
			return result
		} else {
			throw new Error('Cannot peek into an empty stack!')
		}
	}
}

/**********************************************************/

// skyMap is a 2D array where indices are X, Y coordinates.
const countClouds = (skyMap) => {
	return searchSolution(skyMap)
}

const searchSolution = (skyMap) => {
	// initialize tracker variables
	const length = skyMap.length
	const width = skyMap[0]?.length
	const visited = new Set()
	const clouds = new Set()

	// implement depth-first search
	for (let xPos = 0; xPos < width; xPos += 1) {
		for (let yPos = 0; yPos < length; yPos += 1) {
			const coords = JSON.stringify([yPos, xPos])

			// create a new coordoinate cloud
			const cloud = new Set()

			// implement depth-first search
			const stack = new Stack(coords)
			while (stack.hasNodes) {

				// determine coords, positions, and value.
				const coords01 = stack.peek()
				const [yPos01, xPos01] = JSON.parse(coords01)
				const value01 = skyMap[yPos01]?.[xPos01]

				// short-circuit if theres a void- or zero-value,
				// or if these coords have been visited before.
				if (value01 === undefined || visited.has(coords01)) {
					stack.pop()
					continue
				}
				else if (value01 === '0') {
					visited.add(coords01)
					stack.pop()
					continue
				}

				// determine all possible neighbors
				const northCoords = JSON.stringify([yPos01 - 1, xPos01])
				const southCoords = JSON.stringify([yPos01 + 1, xPos01])
				const westCoords =  JSON.stringify([yPos01, xPos01 - 1])
				const eastCoords =  JSON.stringify([yPos01, xPos01 + 1])
				const neighbors = new Set([
					northCoords,
					southCoords,
					westCoords,
					eastCoords,
				])

				// add all neighbors to stack
				for (const coords02 of neighbors) {
					stack.push(coords02)
				}

				// add coordinates as visited and into the cloud
				cloud.add(coords01)
				visited.add(coords01)
			}

			// add cloud to clouds, if its not empty
			if (cloud.size > 0) {
				clouds.add(cloud)
			}
		}
	}
	return clouds.size
}

const bruteForce = (skyMap) => {
	const width = skyMap[0]?.length
	const length = skyMap.length
	const clouds = new Set()

	for (let xPos = 0; xPos < width; xPos += 1) {
		for (let yPos = 0; yPos < length; yPos += 1) {
			// ignore this coordinates if its value is zero.
			if (skyMap[yPos]?.[xPos] === '0') {
				continue
			}

			// in these coordinates arrays,
			// notice its [y, x] not [x, y].
			// its intentional:
			// contents of the parent array represents columns.
			// contents of an inner array represents an entry.
			// each entry has a dedicated row number.
			const thisCoords =  [yPos, xPos]
			const northCoords = [yPos - 1, xPos]
			const southCoords = [yPos + 1, xPos]
			const eastCoords =  [yPos, xPos - 1]
			const westCoords =  [yPos, xPos + 1]

			const neighbors = new Set(
				[northCoords, southCoords, eastCoords, westCoords]
				.filter((coords) => {
					// ensure coordinates are valid.
					const [yCoord, xCoord] = coords
					return (
						skyMap[yCoord]?.[xCoord] !== undefined
						&& skyMap[yCoord][xCoord] !== '0'
					)
				})
			)

			const neighborClouds = new Set()
			// loop through neighbors
			for (const neighborCoords of neighbors) {
				// search for neighbor's home-cloud
				cloudSearch: for (const cloud of clouds) {
					for (const cloudCoords of cloud) {
						if (
							cloudCoords[0] === neighborCoords[0]
							&& cloudCoords[1] === neighborCoords[1]
						) {
							// home cloud found
							neighborClouds.add(cloud)
							break cloudSearch
						}
					}
				}
			}

			// remove each home-cloud from clouds list.
			// we'll merge them into one big cloud.
			const bigCloud = new Set([thisCoords])
			for (const cloud of neighborClouds) {
				// add cloud coordinates to the big cloud
				for (const cloudCoords of cloud) {
					bigCloud.add(cloudCoords)
				}
				clouds.delete(cloud)
			}
			clouds.add(bigCloud)
		}
	}
	return clouds.size
}
