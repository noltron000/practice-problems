# Singly-linked lists are already defined with this interface:
class ListNode(object):
	def __init__(self, x):
		self.value = x
		self.next = None

def remove_k_from_list(node, k):
	# initialize previous node tracker
	list_head = node
	node_prev = None
	# loop through every node, checking each one
	while node is not None:
		# k has been found; remove it.
		if node.value == k:
			if node_prev == None:
				list_head = node.next
			else:
				node_prev.next = node.next
		# k isnt found, just continue onwards
		else:
			node_prev = node
		# go to the next node
		node = node.next
	# return the head node
	return list_head

# this is for code signal's wonkey python camel-case
removeKFromList = remove_k_from_list
