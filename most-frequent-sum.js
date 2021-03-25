const mostFrequentSum = (tree) => {
	const sums = new Map( )
	const stack = [ ]
	stack.push(tree)
	while (stack.length > 0) {

		// get the tree and initialize it.
		const tree = stack.pop( )

		// tree is null
		if (tree === null) {
			continue
		}

		// tree isnt null
		tree.sum = tree.sum ?? null

		// if this node has been visited,
		// 	then theres no need to reiterate it.
		// we'll check with the sum value.
		if (tree.sum !== null) {
			continue
		}

		// check a child to get its sum.
		// or, to see if it needs to be visited.
		const check = (child) => {

			// no child exists; sum is zero.
			if (child === null) {
				return 0
			}

			// child exists and has a sum.
			else if (
				child.sum !== undefined
				&& child.sum !== null
			) {
				return child.sum
			}

			// child exists but needs to be visited.
			else {
				return null
			}
		}

		// use f(x) to get sums safely.
		const leftSum = check(tree.left)
		const rightSum = check(tree.right)

		// check if any child needs to be visited.
		if (leftSum === null || rightSum === null) {

			// visit this tree later, after children are ready.
			stack.push(tree)

			// visit the problem children to prepare them.
			if (rightSum === null) {
				stack.push(tree.right)
			}
			if (leftSum === null) {
				stack.push(tree.left)
			}
		}

		// everything is ready! sum the nodes.
		else {
			tree.sum = tree.value + leftSum + rightSum
			const sumCount = sums.get(tree.sum) ?? 0
			sums.set(tree.sum, sumCount + 1)
		}
	}

	// copy count of sums.
	let results = [...sums.entries()]

	// find max count value.
	const maximum = Math.max(
		...results.map(([, count]) => {
			return count
		})
	)

	// filter non-max counts.
	results = results.filter(([, count]) => {
		return count === maximum
	})

	// sort the results by count.
	results = results.sort(([number01,], [number02,]) => {
		// smaller values appear first.
		return number01 - number02
	})

	// return only the results, without the count.
	return results.map(([number, ]) => {
		return number
	})
}
