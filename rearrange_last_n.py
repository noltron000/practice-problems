# Singly-linked lists are pre-defined with this interface:
class ListNode():
	def __init__(self, x):
		self.value = x
		self.next = None

	def __repr__(self):
		if self.next is None:
			return f'[{self.value}] → None'
		else:
			return f'[{self.value}] → {self.next.value}'


def get_tail(node):
	counter = 0
	if node is None:
		return node, counter
	while node.next is not None:
		node = node.next
		counter += 1
	return node, counter


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


def rearrange_last_n(head, n):
	if head is None:
		return None

	# the length here will be useful.
	tail, length = get_tail(head)
	tail.next = head

	# we need to push the head forward M times.
	# M is the length of the list minus N.
	m = length - n
	while m >= 0:
		tail = head
		head = head.next
		m -= 1

	# now, delete the tail.
	tail.next = None
	return head


# for you codesignal :P
rearrangeLastN = rearrange_last_n
