def rotate_image(original):
	# BUG height will break if length is zero.
	length = len(original)
	height = len(original[0])

	# the length of the rotated list is the original's height.
	rotated = [None] * height

	# the height of the rotated list is the original's length.
	for row_id, row in enumerate(rotated):
		rotated[row_id] = [None] * length

	for row_id, row in enumerate(original):
		for col_id, val in enumerate(row):
			# the new row id is equal to the og's col id.
			# the new col id is the og's inversed row id.
			rotated[col_id][length - 1 - row_id] = val

	return rotated

rotateImage = rotate_image

if __name__ == '__main__':
	print(rotate_image([[1,2,3],[4,5,6]]))
