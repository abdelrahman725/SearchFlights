import { useRef } from 'react'
import { DEFAULT_HEADERS, API_BASIC_URL } from '../constants'

export default function SearchLocation({ set_selected_airport, placeholder, set_airports, auto_focus }) {
    const input_ref = useRef(null)
    const btn_ref = useRef(null)

    // fetch available airports for the given location.
    const fetchLocationAirports = async () => {
        const location = input_ref.current.value
        if (!location) {
            return
        }

        set_airports(null)
        set_selected_airport(null)
        btn_ref.current.disabled = true

        const url = `${API_BASIC_URL}/v1/flights/searchAirport?query=${location}&locale=en-US`
        const options = {
            method: 'GET',
            headers: DEFAULT_HEADERS
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json()
            const airports_data = result.data.map(row => ({
                label: row.presentation.suggestionTitle + ", " + row.presentation.subtitle,
                skyId: row.skyId,
                entityId: row.entityId,
            }))
            set_airports(airports_data)
            console.log(result);

        } catch (error) {
            console.error(error);
            set_airports()
        }
        btn_ref.current.disabled = false
    }

    return (
        <div className="search-location">
            <input className="search-input" type="text" placeholder={placeholder} ref={input_ref} autoFocus={auto_focus} />
            <button className="search-btn" onClick={fetchLocationAirports} ref={btn_ref}>search</button>
        </div>
    )
}