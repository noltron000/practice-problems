/***********************************************************
	You are given a list dishes, where each element consists
of a list of strings beginning with the name of the dish,
followed by all the ingredients used in preparing it. You
want to group the dishes by ingredients, so that for each
ingredient you'll be able to find all the dishes that
contain it (if there are at least 2 such dishes).

	Return an array where each element is a list beginning
with the ingredient name, followed by the names of all the
dishes that contain this ingredient. The dishes inside each
list should be sorted lexicographically, and the result
array should be sorted lexicographically by the names of
the ingredients.
***********************************************************/

class ArrayDict {
	constructor (array) {
		this.data = array
	}

	get key () {
		return this.data[0]
	}

	get values () {
		return this.data.slice(1)
	}

	get keyValues () {
		return [this.key, this.values]
	}

	sort () {
		const key = this.data.shift()
		this.data.sort()
		this.data.unshift(key)
	}

	add (value) {
		const key = this.data.shift()
		this.data.push(value)
		this.data.sort()
		// remove duplicates
		this.data.unshift(key)
	}
}

const groupingDishes = (dishAndIngredientsList) => {
	// the input container becomes an array of array-dicts.
	dishAndIngredientsList = dishAndIngredientsList
	.map(dishAndIngredients => new ArrayDict(dishAndIngredients))

	// create the return container; an array of array-dicts.
	// the outter array starts empty.
	let ingredientAndDishesList = []

	// loop through each of the given dishIngredients.
	for (let dishAndIngredients of dishAndIngredientsList) {
		const [dish, ingredients] = dishAndIngredients.keyValues

		// loop through each of the given dish ingredients.
		for (const ingredient of ingredients) {

			// get the instance of the array-dict
			// whose key is the ingredient.
			// if it does not exist, create it.
			const ingredientAndDishes = getDishes(ingredientAndDishesList, ingredient)

			// add the new dish.
			ingredientAndDishes.add(dish)
		}
	}

	// filter out ingredients that don't map to many dishes.
	// and then sort the dishes by their ingredient name.
	return ingredientAndDishesList
	.filter(a => a.values.length > 1)
	.map(a => a.data)
}

const getDishes = (ingredientAndDishesList, ingredient) => {
	for (let ingredientAndDishes of ingredientAndDishesList) {
		if (ingredient === ingredientAndDishes.key) {
			// found the matching ingredient-dishes array-dict.
			return ingredientAndDishes
		}
	}
	// no matching ingredient found in an array-dict.
	// so, just create a new array-dict.
	const ingredientAndDishes = new ArrayDict([ingredient])
	// then, add it to the master container, and sort it.
	ingredientAndDishesList.push(ingredientAndDishes)
	ingredientAndDishesList.sort((a, b) => {
		return customSort(a.key, b.key)
	})
	// return the newly created array-dict.
	return ingredientAndDishes
}


// this custom sort handles undefined values properly.
// it also handles any string you throw at it.
const customSort = (
	itemA,
	itemB,
) => {
	if (itemA === itemB) {
		return 0
	} else if (itemA === undefined) {
		return -1
	} else if (itemB === undefined) {
		return 1
	} else if (itemA > itemB) {
		return 1
	} else if (itemB > itemA) {
		return -1
	} else {
		return 0
	}
}
