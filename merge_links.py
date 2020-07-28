def get_smaller_node(l1, l2):
	# base case -- both nodes are none.
	if (l1 is None) and (l2 is None):
		return None, l1, l2

	# if one is none, choose the other.
	elif l1 is None:
		return l2, l1, l2.next
	elif l2 is None:
		return l1, l1.next, l2

	# otherwise, compare the node values.
	elif l1.value >= l2.value:
		return l2, l1, l2.next
	elif l2.value >= l1.value:
		return l1, l1.next, l2

	# error happens if bad inputs
	else:
		raise


def merge_two_linked_lists(l1, l2):
	# determine smaller node as root.
	root, l1, l2 = get_smaller_node(l1, l2)

	# l0 is our currently tracked node.
	# it will start at the root node.
	l0 = root

	while (l1 is not None) or (l2 is not None):
		# everything is handled by this helper.
		l0.next, l1, l2 = get_smaller_node(l1, l2)
		l0 = l0.next

	# finished loop
	return root


# code signal has some camel-case issues
mergeTwoLinkedLists = merge_two_linked_lists
