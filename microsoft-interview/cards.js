"use strict"

class Hand {
    constructor (cards) {
        // array of Card instances
        this.cards = cards
    }

    getPoints () {
        // track points
        let points = 0

        const valueDict = {
            'ace': null, // ace shouldnt be looked up here
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5,
            '6': 6,
            '7': 7,
            '8': 8,
            '9': 9,
            '10': 10,
            'king': 10,
            'queen': 10,
            'jack': 10
        }

        // filter out the ace cards
        const aces = this.cards.filter((card) => (
            card.rank === 'ace'
        ))

        // filter out the non-ace cards
        const otherCards = this.cards.filter((card) => (
            card.rank !== 'ace'
        ))

        // go over each of the cards in the hand
        // add up all the cards except for aces
        otherCards.forEach((card) => {
            points += valueDict[card.rank] // +10 pts
        })

        // first assume all aces are worth 11
        // one at a time, flip the ace to be worth 1
        // until it doesn't go over 21
        points += 11 * aces.length // +32 pts

        let acesFlipped = 0
        while (acesFlipped < aces.length && points > 21) {
            // The difference between max value of the ace (11)
            // and the min value of the ace (1) is 10.
            // Since we added the max values possible to the points from aces,
            // we want to reduce the points by the difference on each "flip".
            //
            // "Flipping" is changing an ace value from 11 to 1.
            acesFlipped += 1
            points -= 10 // +22 pts // +12pts
        }
        // +12
        return points
    }
}

class Card {
    constructor (suit, rank) {
        // suit and rank are always strings

        // suit must be hearts diamonds clubs or spades
        this.suit = suit
        // rank must be ace, jack, king, queen, or 2...10
        this.rank = rank

        // this.points --> integer
    }
}

// Test cases
// 1. make sure suit is valid
// 2. make sure rank is valid
// 3. handle dirty inputs like "K" for "King"
