/* primary function ***************************************/
const swapLexOrder = (oldString, pairs) => {


	/* helper function **************************************/
	const lookupSorter = (a, b) => {
		a = oldString[a]
		b = oldString[b]
		if (a === b) {
			// doesn't matter which is first; they are the same.
			return 0
		}
		else if (a > b) {
			// a is larger. keep it first.
			return -1
		}
		else if (a < b) {
			// a is smaller. put it after b.
			return 1
		}
		else {
			return 0
		}
	}


	/* helper function **************************************/
	const getCliques = (pairs) => {
		// there are cliques of indices that can be swapped.
		// this is represented by set of subsets.
		const cliques = new Set()
		for (let [id01, id02] of pairs) {

			// not really using actual indices... 🤨
			// make them start at zero like they should.
			id01 -= 1
			id02 -= 1

			// create a new clique set for this index pairing.
			let newClique = new Set([id01, id02])

			// check each clique to see if
			// either index exists already.
			for (const oldClique of cliques) {
				if (oldClique.has(id01) || oldClique.has(id02)) {

					// one of the ids exist in the old clique.
					// so, join them up together! its a family.
					newClique = new Set([...newClique, ...oldClique])
					cliques.delete(oldClique)
				}
			}

			// this reference isnt yet in our list of cliques.
			cliques.add(newClique)
		}

		// here's a list of all the cliques.
		return cliques
	}


	/* primary content **************************************/
	// cliques is a set of subsets.
	let cliques = getCliques(pairs)

	// make two sorteds arrays map to one another by index.
	// one is sorted with larger index-lookup values first.
	// the other is sorted with smaller index values first.
	cliques = new Set([...cliques].map((clique) => {
		const cliqueKeys = [...clique].sort((a, b) => a - b)
		const cliqueVals = [...clique].sort(lookupSorter)
		return {
			'size': clique.size,
			'keys': cliqueKeys,
			'vals': cliqueVals,
		}
	}))

	// create a copy of the input string into an array.
	let newString = oldString

	// swap out every clique as determined earlier.
	for (const clique of cliques) {
		for (let index = 0; index < clique.size; index++) {
			const into = clique.keys[index]
			const from = clique.vals[index]
			// put value from index "from" into index "into".
			newString = newString.slice(0, into) + oldString[from] + newString.slice(into + 1)
		}
	}
	return newString
}
