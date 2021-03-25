

"hello world5[ again]!"
"hello world again again again ..."








"use strict";

/*
3[[] (not valid)
[asdf] (not valid)
3[]
2[4[abc]]
4[5] (not valid)
*/


// track:
// current index
// the start and end index of the number
// the index of the opening bracket
// the index of the closing bracket

// iterative approach
const multiplyString = (input) => {
	// find the index of the right-most multiplier,
	// and then resolve it into a normal string.
	// do this until the string has no more multipliers.

	while (input.lastIndexOf('[') > 0) {
		// use a helper funciton to obtain important indices.
		const {
			firstDigitIndex,
			finalDigitIndex,
			openingBracketIndex,
			closingBracketIndex,
		} = findImportantIndices(input)

		// get ranges for making slices easier.
		const contentRange = [openingBracketIndex, closingBracketIndex + 1]
		const multiplierRange = [firstDigitIndex, finalDigitIndex + 1]

		// first obtain the contents, and remove unneeded brackets
		let contents = input.slice(...contentRange).slice(1,-1)

		// then, obtain the multiplier-string and convert it.
		const multiplier = input.slice(...multiplierRange)

		// we can now multiply the contents!
		contents = contents.repeat(multiplier)

		// now we have to remove the original sequence from the input.
		// we can also squeeze in the contents while doing so.
		input = input.slice(0, firstDigitIndex) + contents + input.slice(closingBracketIndex + 1)
	}

	return input
}

const findImportantIndices = (input) => {
	/* find the index of the closing bracket. */
	const openingBracketIndex = input.lastIndexOf('[')

	/* find the index of the opening bracket. */
	// start by slicing off everything before the bracket.
	const tailingString = input.slice(openingBracketIndex)

	// now, find the leftmost bracket from that slice.
	// ensure we add the length of the truncated string.
	const closingBracketIndex = tailingString.indexOf(']')
		+ openingBracketIndex

	/* find the last index of the multiplier number. */
	const finalDigitIndex = openingBracketIndex - 1

	/* find the first index of the multiplier number. */
	// help check if a character is stringy number.
	const isStringyNumber = (character) => (
		'0' <= character && character <= '9'
	)

	// to find the index, iterate backwards starting from finalDigitIndex.
	// check out the character, and determine if its a number.
	// if its not, the firstDigitIndex can be easily determined.
	let loopIndex = finalDigitIndex
	while (loopIndex >= 0 && isStringyNumber(input[loopIndex])) {
		loopIndex -= 1
	}

	// the true index is the loopIndex plus one.
	// if loopIndex points to a non-number,
	// 	then the previous character was the last number.
	// if loopIndex gets to -1 (out of bounds),
	// 	then the first character is a number.
	const firstDigitIndex = loopIndex + 1

	return {
		firstDigitIndex,
		finalDigitIndex,
		openingBracketIndex,
		closingBracketIndex,
	}
}

console.log(multiplyString('Hello world5[!]\nThis is a test. 5[Again3[.]? ]3[]Nice.0[ NOT!!]'))
