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

// 5[3[b]]3[v]
// 5[bbb] vs 3[b]3[b]3[b]3[b]3[b]


// definitions:
// - opening bracket = [
// - closing bracket = ]
// - multiplier = #[

// iterative approach
const multiplyString = (input) => {
	// find the index of the right-most multiplier,
	// and then resolve it into a normal string.
	// do this until the string has no more multipliers.

	while (input.lastIndexOf('[') > 0) {
		// use a helper funciton to obtain important indices.
		const {
			multiplierRange,
			contentRange,
			[startIndex, finalIndex],
		} = findImportantIndices(input)

		// first obtain the contents, and remove unneeded brackets
		let contents = input.slice(...contentRange).slice(1, -1)

		// then, obtain the multiplier-string and convert it.
		const multiplier = parseInt(contents.slice(...multiplierRange))

		// we can now multiply the contents!
		contents = contents.repeat(multiplier)

		// now we have to remove the original sequence from the input.
		// we can also squeeze in the contents while doing so.
		input = input.slice(0, startIndex) + contents + input.slice(finalIndex)
	}

	return input
}

const findImportantIndices = (input) => {
	/* find the index of the closing bracket. */
	const closingBracketIndex = input.lastIndexOf('[')

	/* find the index of the opening bracket. */
	// start by slicing off everything before the bracket.
	const tailingString = input.slice(closingBracketIndex)

	// now, find the leftmost bracket from that slice.
	const openingBracketIndex = tailingString.indexOf(']')

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
	const firstDigitIndex = loopIndex

	return {
		multiplierRange: [firstDigitIndex, finalDigitInde + 1],
		contentRange: [openingBracketIndex, closingBracketIndex + 1],
		fullRange: [firstDigitIndex, closingBracketIndex + 1],
	}
}



console.log(multiplyString('5[3[b]]3[v]'))

// // middling recursive approach
// const multiplyStringMR = (input) => {

// }



// const multiplyString = (input, digits = 1) => {
// 	// loop through the string
// 	input = input.split()
// 	input.findIndex

// }

// // be attempting an iterative approach
// const multiplyString = (input, digits = 1) => {
//     // loop through the string
//     for (let currentIndex = 0; currentIndex < input.length; currentIndex +=1) {
//         const character = input[currentIndex]
//         // first determine if currentIndex points to a number.
//         // TODO: Add multiple digits
//         if ('0' <= character && character <= '9') {
//             // is next character openening bracket? or null?
//             // if null get out of loop
//             const insideDigits = character.parseInt()
//             if (input[currentIndex + 1] === '[') {
//                 // need to get the inside of the brackets
//                 const newSubstring = multiplyString(input.slice(currentIndex + 2), insideDigits)
//                 input = insputString.slice(0, currentIndex) + newSubstring
//             }
//         }
//     }
//     // get a slice of the first closing bracket

//     // find closing bracket
//     // adasdfs]alsdf

//     // input = adasdfs * digits

//     // string will be completely filled up or complete
//     // there will be no brackets left
//     return input
// }

// // you can write to stdout for debugging purposes, e.g.
// console.log("This is a debug message");
