def is_crypt_solution(crypt, solution):
	# create a dictionary from the solution,
	# and non-destructively replace the original array with it
	dictionary = {}
	for pair in solution:
		key, value = pair
		dictionary[key] = value
	solution = dictionary
	del dictionary

	for ordinal, word in enumerate(crypt):
		# transform word into digit-string
		for index, glyph in enumerate(word):
			word = word[:index] + solution[glyph] + word[index+1:]

		# verify digit-string does not start with a "0"
		if word[0] == '0' and len(word) > 1:
			return False

		# transform digit-string into a whole number
		word = int(word)
		crypt[ordinal] = word

	# verify results are arithmetically correct
	*addends, total_sum = crypt
	if sum(addends) == total_sum:
		return True
	else:
		return False

# this is for code signal's wonkey python camel-case
isCryptSolution = is_crypt_solution

if __name__ == '__main__':
	crypt = ['A', 'A', 'A']
	solution = [
		['A', '1'],
	]
	print(
		is_crypt_solution(crypt, solution)
	)
