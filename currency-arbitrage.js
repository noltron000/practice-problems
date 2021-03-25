function * range (count) {
	let index = 0
	while (index < count) {
		yield index
		index += 1
	}
}

// main function entry-point.
const currencyArbitrage = (exchanges) => {

	// copy exchanges so its not to be modified.
	exchanges = exchanges.slice( )
	const rateCount = exchanges.length

	// loop over three indices at a time.
	for (const index01 of range(rateCount)) {
		for (const index02 of range(rateCount)) {
			for (const index03 of range(rateCount)) {

				// determine if converting to and fro and back
				// 	is better than just converting to.
				exchanges[index01][index02] = Math.max(
					exchanges[index01][index02],
					exchanges[index01][index03] * exchanges[index03][index02]
				)
			}
		}
	}

	// return whether there is a chance to make money.
	return exchanges.some((_, index) => {
		return exchanges[index][index] > 1
	})
}
