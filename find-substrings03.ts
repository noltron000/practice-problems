const getLengths = (
	list: Array<string>|Set<string>
): Array<number> => {
	return [...new Set(
		[...[...list].map(item => item.length)]
	)].sort((a, b) => b - a)
}


const findSubstrings = (
	wordsInput: Array<string>,
	partsInput: Array<string>,
): Array<string> => {
	const parts: Set<string> = new Set([...partsInput])
	const partsLengths: Array<number> = getLengths(parts)
	const words: Array<string> = wordsInput.map((word) => {
		for (const length of partsLengths) {
			for (let id = 0; id + length <= word.length; id++) {

				// id is short for index here.
				const substring = word.slice(id, id + length)
				if (parts.has(substring)) {
					return word.slice(0, i) + '[' + substring + ']' + word.slice(i + j)
				}
			}
		}
		return word
	})
	return words
}
