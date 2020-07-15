
const solution = (array) => {
	const mergeSort = (array) => {
		// if there is a single item or an empty array,
		// then the array is already sorted.
		if (array.length <= 1) {
			return array
		}

		// get the middle index of the array.
		// this will be used to split the array into two halves.
		const middleIndex = Math.floor(array.length / 2)

		// get the left and right slices.
		let left = array.slice(0, middleIndex)
		let right = array.slice(middleIndex, array.length)

		// recursively call mergeSort such that the two
		// arrays will eventually become two sorted halves.
		// ---
		// repeatedly cutting halves of arrays in half will
		// eventually create arrays of size 0 or 1.
		// arrays of these size are always sorted.
		left = mergeSort(left)
		right = mergeSort(right)

		// although both halves are sorted, they need to be
		// spliced together like a magic deck of cards.
		return merge(left, right)
	}

	const merge = (left, right) => {
		// the left and right sides are both sorted.
		// however, their values might overlap when connected!
		// we need to combine them so that they remain sorted.
		const merged = []

		// here, ID stands for index.
		let leftID = 0
		let rightID = 0

		// to do this correctly, indices for both arrays
		// must be scanned through thoroughly.
		while (leftID < left.length || rightID < right.length) {
			// these values will either be a number or undefined.
			// undefined occurs when the index is too high.
			const leftValue = left[leftID]
			const rightValue = right[rightID]

			// this first part of the if statement checks
			// whether one of the ID's are too high.
			if (leftID === left.length) {
				merged.push(rightValue)
				rightID += 1
			} else if (rightID === right.length) {
				merged.push(leftValue)
				leftID += 1

			// the remainder of the if statement compares the
			// two values and adds the smallest possible value.
			} else if (leftValue < rightValue) {
				merged.push(leftValue)
				leftID += 1
			} else if (leftValue > rightValue) {
				merged.push(rightValue)
				rightID += 1

			// if the two values are equal, arbitrarily pick
			// one of the values to take--it doesn't matter which!
			} else {
				merged.push(leftValue)
				leftID += 1
			} // end if blocks
		} // end while loop

		// return the merged and sorted array
		return merged
	}

	// return the merged array once and for all!
	return mergeSort(array)
}

// console.log(mergeSort([5,2,3,1]))
