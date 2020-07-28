def validate_sudoku(grid):
	def get_row_siblings(row_id, col_id):
		return grid[row_id]

	def get_col_siblings(row_id, col_id):
		siblings = []
		for row in grid:
			siblings.append(row[col_id])
		return siblings

	def get_box_siblings(row_id, col_id):
		siblings = []
		row_id = row_id // 3 * 3
		col_id = col_id // 3 * 3

		for box_row_id in range(row_id, row_id + 3):
			for box_col_id in range(col_id, col_id + 3):
				siblings.append(grid[box_row_id][box_col_id])
		print(siblings)
		return siblings

	def validate(siblings):
		# copy array
		siblings = [*siblings]
		# loop through all siblings to validate
		while len(siblings) > 0:
			sibling = siblings.pop()
			# quick cleanup
			if sibling == '.':
				sibling = None
			# verify sibling isnt cloned
			if sibling in siblings and sibling is not None:
				return False
		return True

	# validate each row
	for row_id in range(0,9):
		if not validate(get_row_siblings(row_id, 0)):
			return False

	# validate each column
	for col_id in range(0,9):
		if not validate(get_col_siblings(0, col_id)):
			return False

	# validate each 3-by-3 specialty box
	for row_id in range(0, 3):
		row_id *= 3
		for col_id in range(0, 3):
			col_id *= 3
			print(row_id, col_id)
			if not validate(get_box_siblings(row_id, col_id)):
				return False

	# all is validated
	return True

# needed for the code platform thing
sudoku2 = validate_sudoku

if __name__ == '__main__':
	grid = [
		['.', '.', '.', '.', '.', '.', '5', '.', '.',],
		['.', '.', '.', '.', '.', '.', '.', '.', '.',],
		['.', '.', '.', '.', '.', '.', '.', '.', '.',],
		['9', '3', '.', '.', '2', '.', '4', '.', '.',],
		['.', '.', '7', '.', '.', '.', '3', '.', '.',],
		['.', '.', '.', '.', '.', '.', '.', '.', '.',],
		['.', '.', '.', '3', '4', '.', '.', '.', '.',],
		['.', '.', '.', '.', '.', '3', '.', '.', '.',],
		['.', '.', '.', '.', '.', '5', '2', '.', '.',],
	]
	print(validate_sudoku(grid))
