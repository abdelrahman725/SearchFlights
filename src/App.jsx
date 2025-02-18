import './App.css'

import { useState, useRef } from 'react'
import SearchLocation from './components/search_location'
import { DEFAULT_HEADERS, API_BASIC_URL } from './constants'
import SelectDate from './components/date_picker'
import SelectAirport from './components/select_airport'
import Flights from './components/flights'
import FilterBar from './components/filter'
import SelectPassengers from './components/select_passengers'
import Select from "react-select";

function App() {
  const [flights, setFlights] = useState()
  const [origin_airports, setOriginAirports] = useState()
  const [destination_airports, setDestinationAirports] = useState()

  const [selected_origin, setOrigin] = useState()
  const [selected_destination, setDestination] = useState()
  const [date, setDate] = useState()
  const [return_date, setReturnDate] = useState()
  const [passengers, setPassengers] = useState({
    "adults": 1,
    "children": 0,
    "infants": 0,
  })
  const [cabin_class, setCabinClass] = useState("economy")
  const CABIN_CLASS_OPTIONS = [
    { value: "economy", label: "economy" },
    { value: "premium_economy", label: "premium_economy" },
    { value: "business", label: "business" },
    { value: "first", label: "first" }
  ]
  const search_btn = useRef(null)

  const searchFlights = async () => {
    const originSkyId = selected_origin.skyId
    const originEntityId = selected_origin.entityId
    const destinationSkyId = selected_destination.skyId
    const destinationEntityId = selected_destination.entityId
    const formated_date = date.toISOString().split('T')[0]

    const formated_return_date_parameter = return_date ?
      `&returnDate=${return_date.toISOString().split('T')[0]}` : ""

    const url = `${API_BASIC_URL}/v2/flights/searchFlights?` +
      `originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}` +
      `&destinationEntityId=${destinationEntityId}&date=${formated_date}${formated_return_date_parameter}` +
      `&cabinClass=${cabin_class}&adults=${passengers.adults}&children=${passengers.children}` +
      `&infants=${passengers.infants}&sortBy=best&currency=USD&market=en-US&countryCode=US`;

    const options = {
      method: 'GET',
      headers: DEFAULT_HEADERS
    };

    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result
  }

  const fetchFlights = async () => {
    if (!selected_origin || !selected_destination || !date || !cabin_class) {
      return
    }
    search_btn.current.disabled = true
    setFlights(null)
    try {
      const result = await searchFlights()

      if (result.data.context.status === "failure") {
        alert("error fetching flights")
      }
      else {
        const flights_data = result.data.itineraries
        setFlights(flights_data)
      }

    } catch (error) {
      setFlights()
      console.error(error);
    }
    search_btn.current.disabled = false
  }

  return (
    <>
      <h1>Google Flights</h1>
      <p>made by bedo </p>

      {/* // origin */}
      <div className="upper-container">
        <FilterBar set_passengers={setPassengers} set_cabin_class={setCabinClass} />
        <div className="search-container">
          <SearchLocation
            placeholder="Where from ?"
            set_airports={setOriginAirports}
            set_selected_airport={setOrigin}
            auto_focus={true}
          />
          <SelectAirport
            placeholder="origin airport/city"
            options={origin_airports}
            selected_airport={selected_origin}
            set_airport={setOrigin}
          />
        </div>

        <div>
          {/* // destination */}
          <SearchLocation
            placeholder="Where to?"
            set_airports={setDestinationAirports}
            set_selected_airport={setDestination}
            auto_focus={false}
          />

          <SelectAirport
            placeholder="destination airport/city"
            options={destination_airports}
            selected_airport={selected_destination}
            set_airport={setDestination} />
        </div>
        <div>
          <SelectPassengers min={1} placeholder={"No.adults" + " 1"} set_passengers={setPassengers} passenger_type={"adults"} />
          <SelectPassengers min={0} placeholder={"No.children" + " 0"} set_passengers={setPassengers} passenger_type={"children"} />
          <SelectPassengers min={0} placeholder={"No.infants" + " 0"} set_passengers={setPassengers} passenger_type={"infants"} />
        </div>

        <Select
          className="react_select"
          placeholder="choose cabin class"
          options={CABIN_CLASS_OPTIONS}
          isSearchable={false}
          onChange={(selected) => setCabinClass(selected.value)}
        />

        <SelectDate
          date={date}
          set_date={setDate}
          placeholder="Departure"

        />
        <SelectDate
          date={return_date}
          set_date={setReturnDate}
          placeholder={"Return"}
        />
      </div>

      <button className="flights-search-btn" onClick={fetchFlights} ref={search_btn}>Find flights</button>

      <Flights flights={flights} />
    </>
  )
}

export default App
