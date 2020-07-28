# Singly-linked lists are already defined with this interface:
class ListNode(object):
  def __init__(self, x):
    self.value = x
    self.next = None

def is_list_palindrome(head_node):
	# create a reversed linked list
	reversed_head = reverse_list(head_node)
	node = head_node
	reversed_node = reversed_head
	# compare each node
	while node is not None and reversed_node is not None:
		if node.value != reversed_node.value:
			return False
		else:
			node = node.next
			reversed_node = reversed_node.next
	return True


def reverse_list(head_node):
	node = head_node
	reversed_prev = None
	reversed_node = None
	reversed_head = None # defined later

	# loop through the original linked list in order
	while node is not None:
		reversed_prev = reversed_node
		reversed_node = ListNode(node.value)
		# the node seen before this one is actually
		# the reversed node's next value.
		reversed_node.next = reversed_prev

		# cycle to next node
		node = node.next

	# the final node is the new reversed head
	reversed_head = reversed_node
	return reversed_head

# needed for the code platform thing
isListPalindrome = is_list_palindrome
