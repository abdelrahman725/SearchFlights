import Flight from "./flight"

export default function Flights({ flights }) {
    return (
        flights ? <div className="flights">
            <h2>{flights.length} Flights </h2>
            {flights.map((flight, index) => (
                <Flight flight={flight} key={index} />
            ))}
        </div> : flights === null ?
            <p>Fetching flights...</p> : null
    )
}
