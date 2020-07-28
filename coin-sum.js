const zip = (keyArray, valueArray) => {
	return keyArray.map((key, index) => {
		return [key, valueArray[index]]
	})
}

const possibleSums = (coins, quantities) => {
	let sums = new Set()
	for (const [coin, quantity] of zip(coins, quantities)) {
		const homogenousSums = new Set()
		let i = 0
		while (i <= quantity) {
			homogenousSums.add(coin*i)
			i++
		}
		const sumsCopy = new Set([...sums])
		for (const homogenousSum of homogenousSums) {
			for (const sum of sumsCopy) {
				sums.add(sum + homogenousSum)
			}
			sums.add(homogenousSum)
		}
	}
	return sums.size - 1
}
