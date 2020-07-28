# Singly-linked lists are pre-defined with this interface:
class ListNode():
	def __init__(self, x):
		self.value = x
		self.next = None

	def __repr__(self):
		if self.next is None:
			return f'[{self.value}] → None'
		else:
			return f'[{self.value}] → {self.next}'

	def get_tail(self):
		if self.next is None:
			return self
		else:
			return self.next.get_tail()


# Here's a convenient factory class:
def ListFactory(array):
	head_node = None
	last_node = None
	for value in array:
		node = ListNode(value)
		if head_node == None:
			head_node = node
		else:
			last_node.next = node
		last_node = node
	return head_node


def reverse_nodes_in_k_groups(head, size):
	left = None # left is exclusive, excluded from group.
	right = head # right is inclusive, included in group.
	counter = 0
	while right is not None:
		# increment the counter.
		counter += 1

		# check if group is complete
		if counter % size == 0:
			# save information that will be overwritten.
			if left is None:
				next_left = head
			else:
				next_left = left.next
			next_right = right.next

			# utilize reverse helper function.
			group_head, group_tail = reverse(next_left, right)

			# connect the previous and next series to the link.
			if left is not None:
				left.next = group_head
			else:
				head = group_head
			group_tail.next = next_right

			# increment the left node, and correct the right node.
			left = group_tail
			right = group_tail

		# increment the left node.
		right = right.next

	return head


def reverse(head, tail = None):
	# Base case.
	if head is None:
		return head
	if tail is None:
		tail = head.get_tail()

	# Set pointers.
	node = head
	last_node = None
	exit_node = tail.next

	# Iterate through all the nodes.
	while node != exit_node:
		# Save next_node before changing node.next pointer.
		next_node = node.next
		# Thanks to the next_node variable, we can safely change
		# the next node pointer without losing any information.
		node.next = last_node
		# Save last_node before changing the node.
		last_node = node
		node = next_node

	# Return reversed linked list.
	return tail, head


# for you, code signal
reverseNodesInKGroups = reverse_nodes_in_k_groups


if __name__ == '__main__':
	linked_list = ListFactory([1,2,3,4,5])
	# print(linked_list)
	print(reverse_nodes_in_k_groups(linked_list, 3))
