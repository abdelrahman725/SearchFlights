export default function Flight({ flight }) {

    const getFormattedDuration = (mins) => {
        const n_hrs = Math.floor(mins / 60)
        const n_mins = mins % 60
        if (n_hrs > 0 && n_mins > 0) {
            return `${n_hrs} hr ${n_mins} min`
        }

        if (n_hrs > 0) {
            return `${n_hrs} hr`
        }

        return `${n_mins} min`
    }

    const getFormattedTime = (time) => {
        const date_time = new Date(time)
        const formatted_time = date_time.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        return formatted_time
    }


    return (
        <div className="flight">
            <div className="airline-logo">
                <img src={flight.legs[0].carriers.marketing[0].logoUrl} alt="airline-logo" height={40} width={40} />
            </div>
            <div className="airline-name">
                {flight.legs[0].carriers.marketing[0].name}
            </div>
            <div className="time">
                {getFormattedTime(flight.legs[0].departure) + "–" + getFormattedTime(flight.legs[0].arrival)}
            </div>
            <div className="duration">{getFormattedDuration(flight.legs[0].durationInMinutes)}</div>
            <div className="airports">
                {flight.legs[0].origin.displayCode + "–" + flight.legs[0].destination.displayCode}
            </div>
            <div className="stops">
                {flight.legs[0].stopCount > 0 ? `${flight.legs[0].stopCount} Stops` : "Nonstop"}
            </div>
            <div className="price"><strong>{flight.price.formatted} </strong></div>
        </div>
    )
}
