
let containsCloseNums = () => {}

/* naive solution, O(n^2) */
containsCloseNums = (nums, closeness) => {
	// base case - no duplicates.
	// loop through each of nums index
	const iArray = new Array(nums.length)
	const iRange = Array.from(iArray.keys())
	for (const i of iRange) {

		// loop through pairs of nums, within closeness factor.
		// make sure to check [0,1] but dont repeat with [1,0].
		// however, the second index can't exceed num's length.
		const jArray = new Array(closeness)
		const jRange = Array
		.from(jArray.keys())
		.map(key => key + i + 1)
		.filter(key => key < nums.length)

		for (const j of jRange) {
			if (nums[i] === nums[j]) {
				return true
			}
		}
	}

	// no pair found. return false.
	return false
}


/* naive solution, O(n^2) */
containsCloseNums = (nums, closeness) => {
	const firstFoundMap = new Map()
	const duplicatesMap = new Map()


	// the first step is to remove non-duplicates.
	for (let [index, value] of Object.entries(nums)) {
		index = parseInt(index)

		// value is already in temporary firstFoundMap.
		// that means its a duplicate!
		if (firstFoundMap.has(value)) {
			if (!duplicatesMap.has(value)) {
				const firstIndex = firstFoundMap.get(value)
				const indices = [firstIndex]
				duplicatesMap.set(value, indices)
			}
			duplicatesMap.get(value).push(index)
		}

		// value is not in firstFoundMap.
		// add it, along with its index.
		else {
			firstFoundMap.set(value, index)
		}
	}
	console.log(duplicatesMap)


	// we now have all the duplicate values
	// with their respective indices stored in sorted order.
	// extracting how close each index is will be more simple.
	for (const [value, indices] of duplicatesMap.entries()) {
		// create a range to iterate over of length indices
		const iRange = Array.from(new Array(indices.length).keys())
		iRange.pop()
		for (const i of iRange) {
			thisValueIndex = indices[i]
			nextValueIndex = indices[i + 1]
			if (nextValueIndex - thisValueIndex <= closeness) {
				return true
			}
		}
	}

	return false
}
