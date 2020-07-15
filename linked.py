# Singly-linked lists are already defined with this interface:
class ListNode(object):
	def __init__(self, x):
		self.value = x
		self.next = None

def remove_k_from_list(node, k):
	# indicates the end of a list
	if node is None:
		return node

	# k has appeared -- remove it
	elif node.value == k:
		node = remove_k_from_list(node.next, k)
		return node

	# this node is fine.
	else:
		next_node = remove_k_from_list(node.next, k)
		node.next = next_node
		return node

# this is for code signal's wonkey python camel-case
removeKFromList = remove_k_from_list
