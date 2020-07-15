#!/bin/python3

import math
import os
import random
import re
import sys

#
# Complete the 'getMinCost' function below.
#
# The function is expected to return a LONG_INTEGER.
# The function accepts following parameters:
#  1. INTEGER_ARRAY crew_id
#  2. INTEGER_ARRAY job_id
#

def get_min_cost(crew_ids, job_ids):
	# sort both lists of ids
	crew_ids.sort()
	job_ids.sort()
	# track the cost of movement
	cost = 0
	for crew_id, job_id in zip(crew_ids, job_ids):
		cost += abs(crew_id - job_id)
	return cost


# obliged camelcase :P
getMinCost = get_min_cost

# hacker rank stuff
if __name__ == '__main__':
	fptr = open(os.environ['OUTPUT_PATH'], 'w')
	crew_id_count = int(input().strip())
	crew_id = []

	for _ in range(crew_id_count):
		crew_id_item = int(input().strip())
		crew_id.append(crew_id_item)

	job_id_count = int(input().strip())
	job_id = []

	for _ in range(job_id_count):
		job_id_item = int(input().strip())
		job_id.append(job_id_item)

	result = getMinCost(crew_id, job_id)
	fptr.write(str(result) + '\n')
	fptr.close()
