class Stack {
	constructor (...array) {
		this.stack = [...array]
	}

	push (item) {
		this.stack.push(item)
	}

	pop () {
		return this.stack.pop()
	}

	peek () {
		return this.stack[this.stack.length - 1]
	}

	isEmpty () {
		return (this.stack.length <= 0)
	}

	hasEntries () {
		return (this.stack.length > 0)
	}
}

/**********************************************************/

const nearestGreater = (array) => {
	const candidates = new Stack()
	const changes = new Array()

	// initialize changes array.
	// its essentially a copy of input array,
	// 	but it also holds data on its output value.
	array.forEach((inputValue, index) => {
		changes.push({
			'input': {
				'key': index,
				'value': inputValue
			},
			'output': {
				'key': undefined,
				'value': undefined,
			}
		})
	})

	// loop through the changes array,
	// whilst modifiying the output value where possible.
	changes.forEach((entry) => {
		while (
			candidates.hasEntries() // ensure stack has items.
			// this while loop doubles as a sort of if statement.
			// if the entry input is greater than the stack input,
			// then we can delete the stack entry.
			&& entry.input.value > candidates.peek().input.value
		) {

			// whenever a stack entry is removed, it represents
			const leftDistance = entry.input.key - candidates.peek().input.key
			const rightDistance = candidates.peek().input.key - candidates.peek().output.key
			// a candidate that has found the next greater element.
			if (
				candidates.peek().output.key === undefined
				|| leftDistance < rightDistance
			) {
				candidates.peek().output.key = entry.input.key
				candidates.peek().output.value = entry.input.value
			}
			// finally delete stack entry.
			candidates.pop()
		}

		// after loop, check if stack has items.
		if (candidates.hasEntries()) {
			if (entry.input.value === candidates.peek().input.value) {
				entry.output.key = candidates.peek().output.key
				entry.output.value = candidates.peek().output.value
			}
			else {
				entry.output.value = candidates.peek().input.value
				entry.output.key = candidates.peek().input.key
			}
		}

		// always add the array entry to the stack at the end.
		// it will always be the smallest item in the stack,
		// because we remove everything smaller than it.
		candidates.push(entry)
	})

	const outputs = changes.map((entry) => {
		const output = entry.output.key ?? -1
		return output
	})

	return outputs
}
