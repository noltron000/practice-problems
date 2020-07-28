# Singly-linked lists are already defined with this interface:
class ListNode(object):
	def __init__(self, x):
		self.value = x
		self.next = None

def add_two_huge_numbers(a, b):
	# these stacks have the smallest values at the top.
	stack_a = get_stack_of(a)
	stack_b = get_stack_of(b)
	stack_c = []

	overflow = 0
	while (overflow > 0
	or len(stack_a) > 0
	or len(stack_b) > 0):
		if len(stack_a) == 0:
			value_a = 0
		else:
			value_a = stack_a.pop()

		if len(stack_b) == 0:
			value_b = 0
		else:
			value_b = stack_b.pop()

		# get new sum, it shouldn't ever exceed 19999.
		value_c = value_a + value_b + overflow
		# get overflow number (the ten-thousands digit)
		overflow = value_c // 10000
		# get plausible number (everything 9999 and below)
		value_c = value_c % 10000
		# add to next value
		stack_c.append(value_c)

	# use stack to create linked list
	return linked_list_from(stack_c)


def get_stack_of(l):
	stack = []
	node = l
	# add each node's value to the stack.
	while node is not None:
		stack.append(node.value)
		node = node.next
	# return the stack. its not really a stack,
	# so be careful to only use the .pop() method.
	return stack

def linked_list_from(stack):
	node = None
	head_node = None
	# we are going through the nodes in reverse order.
	while len(stack) > 0:
		# we always have to pick the current node,
		# and also apply the "previous" node value.
		previous_node = node
		node = ListNode(stack.pop())
		if head_node is None:
			head_node = node
		else:
			previous_node.next = node
	return head_node

addTwoHugeNumbers = add_two_huge_numbers

if __name__ == '__main__':
	result = add_two_huge_numbers(ListNode(3000), ListNode(1000))
