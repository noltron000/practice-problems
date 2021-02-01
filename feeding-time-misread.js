const feedingTime = (groups) => {
	// clean animals up with consistent datatype.
	groups = new Map(
		Object
		.entries(groups)
		.map((group) => [parseInt(group[0]), group[1]])
	)

	// get animals from groups.
	const animals = new Map()
	groups.forEach((animal, groupIndex) => {

		// create animals entry if it doesnt yet exist.
		if (animals.get(animal) === undefined) {
			animals.set(animal, [])
		}
		// add groupIndex to entry array.
		animals.get(animal).push(groupIndex)
	})

	/*
	Animals and Groups are sort of both dictionaries.
	Either one gives all the data without needing the other.
	EX if animal01 is in groups[group01]
	then group01 is in animals[animal01].
	*/

	// NOTE: this gets declared outside of this f(x).
	const unusedGroups = copyMap(groups)
	// find best group-animal pairs for a single day.
	const getDaySchedule = () => {
		// NOTE: this gets declared inside the f(x).
		const unusedAnimals = copyMap(animals)

		// initialize schedule.
		const daySchedule = new Map()

		while (unusedAnimals.size > 0 && unusedGroups.size > 0) {
			// find the pickiest group that includes the least desired animal.
			let reducedGroup = [...unusedGroups.entries()]
			.reduce(reduceToSmallestArray, undefined)[0]

			// find the least desired animal.
			const reducedAnimal = [...unusedAnimals.entries()]
			.filter((a) => {a.includes(reducedGroup)})
			.reduce(reduceToSmallestArray, undefined)

			// add animal/group combo to schedule.
			daySchedule.set(reducedAnimal, reducedGroup)

			// use animal and group.
			unusedAnimals.delete(reducedAnimal)
			unusedGroups.delete(reducedGroup)
		}

		return daySchedule
	}

	let fullSchedule = []
	while (unusedGroups.size > 0) {
		fullSchedule.push(getDaySchedule())
		// must fit in 5 days or less.
		if (fullSchedule.length >= 5) {
			break
		}
	}
	return fullSchedule.length
}


const reduceToSmallestArray = (smallestEntry, entry) => {
	const smallestArray = smallestEntry?.[1]
	const array = entry?.[1]
	if (smallestArray === undefined || smallestArray.length < 1) {
		if (array === undefined || array.length < 1) {
			return undefined
		}
		else {
			return entry
		}
	}
	else if (smallestArray.length < array.length) {
		return smallestEntry
	}
	else {
		return entry
	}
}

const copyMap = (map) => {
	const {parse, stringify} = JSON
	map = [...map.entries()]
	map = parse(stringify(map))
	map = new Map(map)
	return map
}


const groups = [["Tiger", "Lima", "Frog"], ["Tiger", "Zebra", "Lion"], ["Tiger", "Rabbit"], ["Lima", "Zebra", "Rabbit"]]
console.log(feedingTime(groups))
console.log(4)
