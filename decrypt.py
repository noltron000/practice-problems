#!/bin/python3

import math
import os
import random
import re
import sys

#
# Complete the 'decryptPassword' function below.
#
# The function is expected to return a STRING.
# The function accepts STRING s as parameter.
#


def assign_at_index(old_string, new_string, index):
	return old_string[:index] + new_string + old_string[index+1:]

def decrypt_password(string):

	# copy string
	string = string[:]

	# loop over string backwards
	index = len(string) - 1
	while index >= 0:
		if (string[index] == '*'
		and string[index - 1].islower()
		and string[index - 2].isupper()):

			# swap listed variables
			swapped_character = string[index - 1]
			string = string[:index - 1] + string[index - 2] + string[index:]
			string = string[:index - 2] + swapped_character + string[index - 1:]

			# remove asterisk
			string = string[:index] + string[index + 1:]

			# move to next index section in string
			# three characters were involved...
			# ...even if one got deleted, so go back 3.
			index -= 3

		elif string[index] == '0':
			# get number from start and delete zero
			string = string[:index] + string[0] + string[index + 1:]
			string = string[1:]
			# move to next index section in string
			# two characters were involved...
			# ...even if one got deleted, so go back 2.
			index -= 2

		else:
			# move to next index section in string
			index -= 1

	return string

decryptPassword = decrypt_password

if __name__ == '__main__':
	fptr = open(os.environ['OUTPUT_PATH'], 'w')
	s = input()
	result = decryptPassword(s)
	fptr.write(result + '\n')
	fptr.close()
