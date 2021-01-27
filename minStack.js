class Stack {
	constructor (...array) {
		this.stack = []

		array.forEach((element) => {
			this.push(element)
		})
	}

	push (element) {
		this.stack.push(element)
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

class minStack extends Stack {
	constructor (...array) {
		super(...array)
		this.stack = []
		this.min = null

		array.forEach((element) => {
			this.push(element)
		})
	}

	push (element) {
		let elementToAdd = element

		if (this.isEmpty()) {
			this.min = element
		}
		else if (element < this.min) {
			// special insert
			elementToAdd = 2 * element - this.min
			this.min = element
		}

		this.stack.push(elementToAdd)
	}

	pop () {
		let element = this.stack.pop()
		if (element < this.min) {
			this.min = 2 * this.min - element
		}
	}
}


// intermediate function
const minimumOnStack = (operations) => {
	const stack = new minStack()
	const minimums = []

	operations.forEach((operation) => {

		operation = operation.split(' ')
		let [operator, operand] = operation

		if (operator === 'push') {
			operand = parseInt(operand)
			stack.push(operand)
		}
		else if (operator === 'pop') {
			stack.pop()
		}
		else if (operator === 'min') {
			minimums.push(stack.min)
		}
		else {
			throw new ValueError('Invalid Operation!')
		}
	})
	return minimums
}

//
//  "min",
//  "push 5",
//  "min",
//  "push 8",
//  "min",
//  "pop",
//  "min",
//  "pop",
//  "min"]
// ))
