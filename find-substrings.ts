const findSubstrings = (
	words: Array<string>,
	parts: Array<string>,
): Array<string> => {
	// change each word string to have the expected brackets.
	words = words.map((word) => {
		let bestPart: string|null = null

		parts.forEach((part) => {
			// the word doesn't have the part.
			if (word.indexOf(part) === -1) {
				// do nothing.
			}
			// there isnt yet a best part.
			else if (bestPart === null) {
				bestPart = part
			}
			// the best part is no longer the best.
			else if (bestPart.length < part.length) {
				bestPart = part
			}
			// if they are equal length, the earlier part is best.
			else if (bestPart.length === part.length) {
				if (word.indexOf(part) < word.indexOf(bestPart)) {
					bestPart = part
				}
			}
		})

		// we have our best part now.
		// if there is no best part, return the word unchanged.
		if (bestPart === null) {
			return word
		}

		// helper variables
		const length: number = bestPart.length
		const index: number = word.indexOf(bestPart)

		// word parts
		const start: string = word.slice(0, index)
		const middle: string = '[' + bestPart + ']'
		const end: string = word.slice(index + length)

		// switch out the word.
		word = start + middle + end
		return word
	})
	return words
}
