package decodestring

import (
	"regexp"
	"strconv"
	"strings"
)

func decodeString(encoding string) string {
	// Search for matching pattern
	// reEncoded := regexp.MustCompile(`\d+\[((?!\d+\[).)*?\]`)
	reOpening := regexp.MustCompile(`\d+\[`)
	reClosing := regexp.MustCompile(`\]`)

	if reOpening.MatchString(encoding) {
		// Find the start & end of the opening string.
		openingBounds := reOpening.FindStringIndex(encoding)
		inactiveHead := encoding[:openingBounds[0]]

		// Split up the opening brace and convert it to an integer.
		duplicator, _ := strconv.Atoi(encoding[openingBounds[0] : openingBounds[1]-1])

		// Everything to the left of the opening is already parsed; throw it out.
		encoding = encoding[openingBounds[1]:]

		// Recursively call this function decodeString.
		encoding = decodeString(encoding)

		// Repeat the enclosed properties several times over.
		closingBounds := reClosing.FindStringIndex(encoding)
		inactiveTail := encoding[closingBounds[1]:]

		// Everything right off the closing brace will be parsed later; trash it.
		encoding = encoding[:closingBounds[0]]

		// Sandwich the decoded guts between the head and tail.
		encoding = inactiveHead + strings.Repeat(encoding, duplicator) + inactiveTail
	}

	// Return the string as it is! Its now decoded.
	return encoding
}
