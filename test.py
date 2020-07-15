def solution(arr):
	sums = {
		'Left': 0,
		'Right': 0,
		'': 0,
	}
	for index, value in enumerate(arr):
		# we need to determine if this index is left or right.
		# to do that, we need the node's depth, as well as the
		# maximum number of objects that can exist in the depth.
		# `size` will represent that maximum number.
		depth, max_index = get_depth(index)
		side_length = 2**depth / 2

		# now we can determine which side the index is a part of.
		side = ''
		if index == 0:
			pass
		elif index <= max_index - side_length:
			side = 'Left'
		elif index > max_index - side_length:
			side = 'Right'

		# finally, we can add the value of the node
		# to its respective side's total.
		sums[side] += value
	print(sums)
	return(sums)

def get_depth(index):
	# depth-zero represents the root node's depth.
	depth = 0

	# size represents the maximum index
	# of an object in a certain depth.
	max_index = 0

	# the max_index of an item in each depth doubles
	# with each increment of the depth.
	# this is why powers of two are used in the while-loop.
	# EXAMPLE:
	# depth: 0 => max_index: 1
	# depth: 1 => max_index: 2
	# depth: 2 => max_index: 4
	# depth: 3 => max_index: 8
	while index > max_index:
		depth += 1
		max_index += 2**depth

	return depth, max_index
