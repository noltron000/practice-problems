def solution(angles):
	# track extra opened and closed brackets.
	extra_closed = 0
	extra_opened = 0

	# loop through every angle in the list.
	for angle in angles:

		if angle == '>':
			# there are no open brackets so this is extra!
			if extra_opened == 0:
				extra_closed += 1
			# this bracket is just closing an open one.
			else:
				extra_opened -= 1

		# matched brackets will be subtracted in the first if statement.
		elif angle == '<':
			extra_opened += 1

	# manipulate result string
	result = angles
	result = '<' * extra_closed + result
	result = result + '>' * extra_opened
	return result

if __name__ == '__main__':
	print(solution('<<>>>'))
