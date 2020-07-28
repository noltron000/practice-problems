const areFollowingPatterns = (strings, patterns) => {
	// ensure inputs are same length
	if (strings.length !== patterns.length) {
		return false
	}
	const length = strings.length

	// loop through each string index
	const iArray = new Array(length)
	const iRange = Array.from(iArray.keys())
	for (const i of iRange) {

		// loop through each pair of string indexes.
		// make sure to check [0,1] but dont repeat with [1,0].
		const jArray = new Array(length - i)
		const jRange = Array.from(jArray.keys()).map(k => k + i)
		for (const j of jRange) {

			// check if the pattern matches.
			if ((strings[i] === strings[j] && patterns[i] === patterns[j])
			|| (strings[i] !== strings[j] && patterns[i] !== patterns[j])) {
				// do nothing since the pattern matches.
			} else {
				// this pattern does not match.
				return false
			}
		}
	}

	// no pair did not match; this pattern matches completely.
	return true
}

areFollowingPatterns([1,2,3],["a","b","c"])
