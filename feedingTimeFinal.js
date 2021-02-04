// format groups variable nicely.
const formatGroups = (groups) => {
	// ensure that each group is independent
	// of array index by making each entry an object.
	groups = groups.map((animals, index) => {
		return {
			'id': index,
			'animals': animals,
			'neighbors': [],
			'color': null,
		}
	}).filter((group) => {
		return group.animals.length > 0
	})

	groups.forEach((group01) => {
		groups.forEach((group02) => {

			// determine if there is an intersection
			// 	between the two chosen groups.
			const intersection = group01['animals'].some((animal) => {
				return group02['animals'].includes(animal)
			})

			// if there is an intersection,
			// 	mark both groups by adding the id
			// 	to the intersections list in both groups.
			//
			// this code only adds to one group per loop.
			//
			// the second group will be added when
			// 	group02 becomes group01 and vice-versa,
			// 	which happens later on in this loop.
			if (intersection && group01 !== group02) {
				group01['neighbors'].push(group02)
			}
		})
	})

	groups.sort((group01, group02) => {
		// the largest-length arrays should appear first.
		return group02.animals.length - group01.animals.length
	})

	// return new array.
	return groups
}

// primary entry point function.
const feedingTime = (groups, colorCount = 5) => {

	// format the groups nicely with the cleaner.
	groups = formatGroups(groups)

	// create a helper function for the groups object.
	const groupIsColorable = (group01, color) => {
		// no neighbor can share this color.
		return !group01['neighbors'].some((group02) => {
			return group02['color'] === color
		})
	}

	// create a helper function for the coloring process.
	// colorify will color an empty graph if possible.
	// if it is possible, it will return true and color the graph.
	// if it is not possible, it will return false.
	const colorify = (group01, maxColor) => {
		// this has already been colored,
		// so we don't need to worry about it.
		if (group01['color'] !== null) {
			return true
		}

		// search for a color that can fill this.
		loopColors:
		for (let color = 0; color <= maxColor; color++) {
			if (groupIsColorable(group01, color)) {
				group01['color'] = color

				// now check all neighbors recursively.
				for (const group02 of group01['neighbors']) {
					if (colorify(group02, maxColor) === false) {

						// there exists a neighbor that cant be colored.
						// stop with this and go check the next color.
						group01['color'] = null
						continue loopColors
					}
				}

				// if all the neighbors were good, so are we!
				// this color works out nicely for this node.
				return true
			}
		}

		// there are no colors that can fill this node.
		// we've checked all of them up to maxColor...
		return false
	}

	// creaete a helper function that resets all node colors.
	const clearify = () => {
		for (const group of groups) {
			group['color'] = null
		}
	}


	loopMaxColor:
	for (let maxColor = 0; maxColor < colorCount; maxColor++) {
		for (const seed of groups) {

			// the group seed will initialize the colorify f(x).
			// it will also check for disconnected nodes.
			if (seed['color'] === null) {

				// if colorify is ever false for a seed,
				// 	then the maxColor must increase.
				if (colorify(seed, maxColor) === false) {
					clearify()
					continue loopMaxColor
				}
			}
		}
		// all seeds have been checked.
		// this graph has been colored in!
		return maxColor + 1
	}
	return -1
}


// feedingTime([["Tiger","Lima","Frog"],
//  ["Tiger","Zebra","Lion"],
//  ["Tiger","Rabbit"],
//  ["Emu","Zebra","Rabbit"]]
// )
