def solution(prices):
	best_profit = 0
	for buy_index, buy_price in enumerate(prices):
		for sell_index, sell_price in enumerate(prices[buy_index + 1:]):
			profit = sell_price - buy_price
			if profit > best_profit:
				best_profit = profit
	return best_profit


if __name__ == '__main__':
	print(solution([1,2,4,8,16]))
	print(solution([16,8,5,4,3,2,1]))
