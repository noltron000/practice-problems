// skyMap is a 2D array where indices are X, Y coordinates.
const countClouds = (skyMap) => {
	return bruteForce(skyMap)
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
