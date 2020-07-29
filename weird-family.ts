const findProfession = (
	level: number,
	position: number,
): string => {
	// make level and position 0-based.
	level -= 1
	position -= 1
	// run the primary function which only requires position.
	// return binaryPosition(position)
	if (binaryPosition(position) === 1) {
		return 'Doctor'
	}
	else {
		return 'Engineer'
	}
}

const binaryPosition = (
	position: number,
): number => {

	// keep track of how many times this while loop repeats.
	let counter = 0
	while (position > 1) {

		// find next smallest power of 2 less than position.
		// then, shave it off of the number to make it smaller.
		let power = 0
		while (2 ** (power + 1) <= position) {
			power += 1
		}
		position -= 2 ** power

		// increment counter tracker and repeat.
		counter += 1
	}
	// by the time the while loop ends,
	// the position is now most certainly a 1 or a 0.

	// tracking the counter will have been an important step.
	// it tells whether or not to reverse the position.

	// if counter is 1, make position 1 into 0, and 1 into 0.
	if (counter % 2 === 1) {
		if (position === 1) {
			position -= 1
		}
		else {
			position += 1
		}
	}
	// if counter is 0, nothing needs to be done.

	// the position is most certainly 1 or 0.
	return position
}
