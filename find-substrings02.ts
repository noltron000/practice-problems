
class Trie {
	// set up property types
	value: string|null
	count: number
	children: Array<Trie>

	// initialize the Trie
	constructor (
		value: string|null = null
	) {
		this.value = value
		this.count = 0
		this.children = []
	}

	add (
		word: string|null,
		depth: number = 0,
	) {
		// null values are acceptable at the root node only.
		if (word === null) {
			if (this.value === null) {
				this.count += 1
			}
			else {
				// error
			}
		}

		if (word.length === 0) {
			// the end of the word has been found.
			// increase the count here, implying an exit.
			this.count += 1
			return
		}

		const character: string = word[0]
		let foundMatch: boolean = false

		// search for a matching character in children.
		// if a match is found, use that child.
		// otherwise, make a new child to use.
		// recurse the remaining word with the chosen child.
		for (const child of this.children) {
			if (child.value === character) {
				child.add(word.slice(1))
				foundMatch = true
				break
			}
		}
		if (!foundMatch) {
			const child: Trie = new Trie(character)
			child.add(word.slice(1))
			this.children.push(child)
		}
	}
}

const findSubstrings = (
	words: Array<string>,
	parts: Array<string>,
): Array<string> => {

	// put each word into a trie...
	const reducer = (
		trie: Trie,
		word: string,
	): Trie => {
		trie.add(word)
		return trie
	}

	// ...using the reduce method.
	const trie = words.reduce(reducer, new Trie())

	parts.forEach((part) => {

	})

}
