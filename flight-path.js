// all of our nodes in this graph are airports.
class Airport {
	constructor ({city, flights}) {

		// this string, gives the node a name.
		this.city = city

		// a list of flights originating from this city.
		this.flights = flights ?? [ ]
	}
}


// all of our weighted pointers are made up with flights.
class Flight {
	constructor ({departure, arrival, origin, destination}) {

		// these variables represent times.
		this.departure = departure // when the flight starts.
		this.arrival = arrival // when the flight lands.

		// these are Airport objects.
		this.origin = origin // describes starting airport.
		this.destination = destination // destination airport.
	}

	get duration ( ) { // describes how long the flight takes.
		return this.arrival - this.departure
	}
}


// conversion f(x) for time-string to a number of minutes.
const toNumMinutes = (timeString) => {
	// split up the given string into two parts.
	let [hours, minutes] = timeString.split(':')
	// numberify the variables and simply return.
	hours = parseInt(hours)
	minutes = parseInt(minutes)
	return hours * 60 + minutes
}


// conversion f(x) for number of minutes to a time-string.
const toTimeString = (numMinutes) => {
	// calculate hours and minutes.
	let hours = Math.floor(numMinutes / 60)
	let minutes = numMinutes % 60

	// number must have exactly two digits.
	// add a zero in a case like "04:08".
	const stringify = (number) => {
		if (number < 10) {
			return `0${number}`
		}
		else {
			return number.toString( )
		}
	}

	// make hours and numbers into a clock-like string.
	hours = stringify(hours)
	minutes = stringify(minutes)
	return `${hours}:${minutes}`
}


// create a graph based on given variables.
const createAirports = (times, ...extras) => {

	// generating the airports takes two main steps:
	// 	formatting all of the flights in a list, and then
	// 	inferring a list of airports from the flight details.
	// first we'll create a list of all possible flights.
	// use the Flight object for this to make it easier.
	const flights = times.map(([

		// times[i][0] is the starting location of flight i.
		origin,

		// times[i][1] is the destination for flight i.
		destination,

		// times[i][2] is the time flight i departs.
		departure,

		// times[i][3] is the time flight i arrives.
		arrival,
	]) => {

		// convert these time strings to useable numbers.
		departure = toNumMinutes(departure)
		arrival = toNumMinutes(arrival)

		// instantiate a new Flight and return it for the list.
		return new Flight({
			origin,
			destination,
			departure,
			arrival,
		})
	})

	// create airports from flight origins and destinations,
	// 	and then let the airports "consume" the flights.
	// we'll return an array of airports by the end.
	// those airports will contain the flights.
	const airports = flights.reduce((airports, flight) => {

		// at the beginning of each loop over flights,
		// 	the flight will have redumentry information about
		// 	its originating and destination airport.
		// it will only have a string of the city name.

		// the origin and destination city goes through
		// 	the same basic process, making a f(x) a good idea.
		const getAirport = (city) => {

			// if there is any airport with this name, get it.
			let airport = airports.find((airport) => {
				return airport['city'] === city
			})

			// otherwise, create a new one and add it to the list.
			if (airport === undefined) {
				airport = new Airport({city})
				airports.push(airport)
			}

			// either way, we're returning the airport object.
			return airport
		}

		flight.origin = getAirport(flight.origin)
		flight.destination = getAirport(flight.destination)

		// now that we determined these two airports,
		// 	we can have one "consume" this flight.
		const airport = flight.origin
		airport.flights.push(flight)

		// we can forget about the flight and
		// 	just remember the airport for now on.
		// since the airport that has this flight is already
		// 	entered into airports, we can return the array.
		return airports
	}, [ ])

	// add the extras.
	// these extras don't necessarily have any flights.
	// so, create them if they don't exist yet.
	extras.forEach((city) => {

		// is there some flight that has this city name?
		const needsNewAirport = !airports.some((airport) => {
			return airport.city === city
		})

		// if not, then we need to create it.
		// but notice, it doesn't have any flights!
		if (needsNewAirport) {
			const airport = new Airport({city})
			airports.push(airport)
		}
	})

	// airports list is complete after the loop.
	return airports
}


// main function entry-point.
const flightPlan = (times, origin, destination) => {
	// Each airport can be thought of as a single node.
	//
	// Each flight connects one airport to another,
	// 	but they also do more than that:
	// 	some metadata enforces their desirability.
	// For example, if the flight itself takes too long,
	// 	or if a flight happens too early or too late,
	// 	then the flight becomes less desireable.
	//
	// With those notes in mind, we can generate a
	// 	specially weighted graph.
	// Each flight has a start times and a duration.
	const airports = createAirports(times, origin, destination)

	// replace origin and destination city with
	// 	their respective Airport instances.
	origin = airports.find((airport) => {
		return airport.city === origin
	})
	destination = airports.find((airport) => {
		return airport.city === destination
	})

	// an important concept in the program is "costs".
	// the "cost" of an airport is how long
	// 	that it takes to get there from the origin city.
	// after all, we want to find the minimum "cost"
	// 	of the destination city, from the origin city.

	// create a costs dictionary.
	// initialize all cities as not being appealing.
	// we'll use an infinite cost for unappealing cities.
	const costs = airports.reduce((costs, airport) => {
		costs.set(airport, Infinity)
		return costs
	}, new Map( ))

	// it literally takes absolutely zero time
	// 	to get from the origin city to the origin city.
	// so, set the cost to get there at zero.
	costs.set(origin, 0)

	// this program will also need an unvisited-list.
	// every node must be visited, but only in-order!
	const unvisited = airports.slice( )
	const sortUnvisited = ( ) => {
		unvisited.sort((airport01, airport02) => {
			const cost01 = costs.get(airport01)
			const cost02 = costs.get(airport02)
			return cost01 - cost02
		})
	}

	// we'll be looping over all the nodes, so we need a
	// 	visited node tracker, where airports are nodes.
	while (unvisited.length > 0) {

		// get & visit the minimum-cost airport,
		// 	which is found at the zeroeth index.
		sortUnvisited( )
		const airport =	unvisited.shift( )

		// filter out the flights that are impossible to take.
		// if there is a layover, the connecting flight must
		// 	depart an hour after the last flight's arrival time.
		const neighbors = airport['flights'].filter((flight) => {
			let initialCost = costs.get(airport)

			// add layover padding
			if (initialCost > 0) {
				initialCost += 60
			}

			// determine if flight fits schedule
			if (flight['departure'] >= initialCost) {
				return true
			}
			else {
				return false
			}

		// map possible flights over to their destinations,
		// 	which are also their neighboring airports.
		// in the meantime, update the "cost" of getting there
		// 	if the flight in question is "cheaper".
		}).map((flight) => {

			// get the airport and possible costs.
			const airport = flight['destination']
			const newCost = flight['arrival']
			const oldCost = costs.get(airport)

			// set or reset the cost of getting to this airport.
			if (oldCost > newCost) {
				costs.set(airport, newCost)
			}

			// return the neighbor
			return airport
		})
	}

	// the costs map is completely filled!
	// we can now obtain our destination's minimum cost.
	const destinationCost = costs.get(destination)

	// stringify the solution.
	if (destinationCost === Infinity) {
		return "-1"
	}
	else {
		return toTimeString(destinationCost)
	}
}
