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

const nextLarger = (inputArray) => {
	const outputArray = new Array()
	const candidates = new Stack()
	const changes = new Array()

	// initialize changes array.
	// its essentially a copy of input array,
	// 	but it also holds data on its output value.
	inputArray.forEach((inputValue, index) => {
		changes.push({
			'index': index,
			'input': inputValue,
			'output': undefined,
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
			&& entry.input > candidates.peek().input
		) {
			// whenever a stack entry is removed, it represents
			// a candidate that has found the next greater element.
			candidates.peek().output = entry.input
			// finally delete stack entry.
			candidates.pop()
		}
		// always add the array entry to the stack at the end.
		// it will always be the smallest item in the stack,
		// because we remove everything smaller than it.
		candidates.push(entry)
	})

	const outputs = changes.map((entry) => {
		const output = entry.output ?? -1
		return output
	})

	return outputs
}
