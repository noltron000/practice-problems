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
const createAirports = (times) => {

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
	// we'll return a dictionary of airports by city-name.
	// those airports will contain the flights.
	const airports = flights.reduce((airports, flight) => {

		// at the beginning of each loop over flights,
		// 	the flight will have redumentry information about
		// 	its originating and destination airport.
		// it will only have a string of the city name.

		// the origin and destination airport city goes through
		// 	the same basic process, making a f(x) a good idea.
		const getAirport = (city) => {
			if (city in airports) {
				return airports[city]
			}
			else {
				airports[city] = new Airport({city})
				return airports[city]
			}
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
		// 	entered into airports, we can return the dictionary.
		return airports
	}, { })

	// airports object is complete after the loop.
	return airports
}

/*
// Djikstra's algorithm.
function Dijkstra(Graph, source):
       dist[source]  := 0                     // Distance from source to source is set to 0
       for each vertex v in Graph:            // Initializations
           if v ≠ source
               dist[v]  := infinity           // Unknown distance function from source to each node set to infinity
           add v to Q                         // All nodes initially in Q

      while Q is not empty:                  // The main loop
          v := vertex in Q with min dist[v]  // In the first run-through, this vertex is the source node
          remove v from Q

          for each neighbor u of v:           // where neighbor u has not yet been removed from Q.
              alt := dist[v] + length(v, u)
              if alt < dist[u]:               // A shorter path to u has been found
                  dist[u]  := alt            // Update distance of u

      return dist[ ]
  end function
 */

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
	const airports = createAirports(times)

	// replace origin and destination city with
	// 	their respective Airport instances.
	origin = airports[origin]
	destination = airports[destination]

	while (unvisited.length > 0) {
		// get & visit the minimum-cost airport,
		// 	which is found at the zeroeth index.
		const airport =	unvisited.shift( )

		// find neighbors with connecting flights.
		// if there is a layover, the connecting flight must
		// 	depart an hour after the last flight's arrival time.
		const neighbors = airport['flights'].filter((flight) => {
			let startCost = cost[airport['city']]

			// add layover padding
			if (startCost > 0) {
				startCost += 60
			}

			// determine if flight fits schedule
			if (flight['departure'] >= startCost) {
				return true
			}
			else {
				return false
			}
		})

		//
	}
}

0 -> 134 + 60 (194) -> 200
let times
let source
let dest

times = [["Chicago", "Denver","03:00", "06:00"],
         ["Chicago", "Denver","03:30", "07:00"],
         ["Chicago", "Los Angeles", "01:00", "05:00"],
         ["Denver", "Austin", "06:30", "08:30"],
         ["Denver", "Austin", "07:30", "09:30"],
         ["Austin", "Denver", "06:30", "08:30"],
         ["Los Angeles", "Phoenix", "06:00", "07:00"],
         ["Los Angeles", "Phoenix", "05:30", "06:50"],
         ["Phoenix", "Austin", "08:00", "08:40"]]
source = "Chicago"
dest = "Austin"

flightPlan(times, source, dest)
