const solution = (numbers) => {
	// create a map, an object like a dictionary,
	// except it allows numbers to be keys.
	const numberCounter = new Map()
	// count the occurances of each number in numbers.
	for (let number of numbers) {
		let count
		if (numberCounter.has(number)) {
			// get the current count for this number
			// then add one, to count this instance
			count = 1 + numberCounter.get(number)
		} else {
			// initialize the count for this number
			count = 1
		}
		// update the count for this number
		numberCounter.set(number, count+1)
	}

	// track the smallest occurance.
	let smallestCount = null
	// loop through all the values of
	// the map and determine the lowest count.
	for (let count of numberCounter.values()) {
		// if it doesn't exist yet (first iteration)
		if (smallestCount === null) {
			smallestCount = count
		// if there is something smaller
		} else if (smallestCount > count) {
			smallestCount = count
		}
	}

	let validNumbers = []
	// loop through all the entries of the map
	// and determine which values are acceptable
	// by checking their counts.
	for (let [number, count] of numberCounter.entries()) {
		if (count === smallestCount) {
			validNumbers.push(number)
		}
	}

	// sort the valid numbers and return
	validNumbers = validNumbers.sort((x,y) => numSorter(x,y))
	return validNumbers
}

const numSorter = (num01, num02) => {
	// this is true if the number is above 0.
	// since its called many times, via .sort(),
	// its just sorting in place.
	return num01 - num02
}

console.log(solution([10, 941, 13,13,13, 941, 10]))
