const feedingTime = (groups) => {
	// first, format groups and animals as lists of objects.
	// this way the index is not associated with the data.
	groups = formatGroups(groups)
	let animals = formatAnimals(groups)

	/*
	sorting these arrays helps to determine which result to chooses next.
	*/

	groups.sort((group01, group02) => {
		// the largest-length arrays should appear first.
		return group02.animals.length - group01.animals.length
	})

	animals.sort((animal01, animal02) => {
		// the largest-length arrays should appear first.
		return animal02.groups.length - animal01.groups.length
	})

	console.log(Math.max(...animals.map(animal => animal.groups.length)))

	/*
	create some tracker variables to know when things happen.
	*/

	// this contains group ids only.
	// notice this is declared before the while loop.
	const unusedGroups = groups.slice()

	// set up the loop.
	const fullSchedule = []
	while (unusedGroups.length > 0) {

		// this contains animal names only.
		// notice this is declared inside the while loop.
		const unusedAnimals = animals.slice()

		// set up the second loop.
		const daySchedule = []
		while (unusedGroups.length > 0 && unusedAnimals.length > 0) {

			// find a group with no used animals.
			// in this group, find if theres a used animal.
			const group = unusedGroups.find((group) => {

				// does there exist an animal that is used?
				const badGroup = group.animals.some((animalName) => {
					const animal = animals.find(animal => animal.name === animalName)


					// check unusedAnimals for an answer.
					// if it includes the animal, its not used!
					if (unusedAnimals.includes(animal)) {
						return false
					}
					// otherwise, it is...
					else {
						return true
					}
				})

				// if there is any bad group, this won't work.
				return !badGroup
			})

			// early short-circuit
			if (group === undefined) {
				break
			}

			// remove group from unusedGroups
			unusedGroups.splice(unusedGroups.indexOf(group), 1)

			// remove each group animal from unusedAnimals
			group.animals.forEach((animalName) => {
				const animal = animals.find(animal => animal.name === animalName)
				unusedAnimals.splice(unusedAnimals.indexOf(animal), 1)
			})

			// add group to agenda.
			daySchedule.push(group)
		}

		// add day schedule to full schedule.
		fullSchedule.push(daySchedule)

		// early short-circuit
		if (fullSchedule.length > 5) {
			return -1
		}
	}

	return fullSchedule.length
}

// format groups variable nicely.
const formatGroups = (groups) => {
	// ensure that each group is independent
	// of array index by making each entry an object.
	groups = groups.map((animals, index) => {
		return {
			'id': index,
			'animals': animals
		}
	}).filter((group) => {
		return group.animals.length > 0
	})
	// return new array.
	return groups
}

// format animals variable nicely.
const formatAnimals = (groups) => {
	// create a similar animals object as well.
	// extract information from groups to get this.
	const animals = groups.reduce((animals, group) => {
		for (const name of group.animals) {
			// 'name' is the name of an animal.
			// 'animal' is the object which contains that name.

			// find the animal object which the group references.
			let animal = animals.find((animal) => {
				return animal.name === name
			})

			// if there isn't one, create it instead.
			if (animal === undefined) {
				animal = {
					'name': name,
					'groups': [],
				}

				// add animal object to animals list as well.
				animals.push(animal)
			}

			// add id to the animal object's groups list.
			animal.groups.push(group.id)
		}

		// return the animals array thus far.
		return animals
	}, [])

	// return the newly completed animals array.
	return animals
}


// console.log(feedingTime([[],[],['a'],['b'],['a', 'b'],['c', 'b']]))
