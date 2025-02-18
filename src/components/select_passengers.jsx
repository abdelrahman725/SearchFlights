
export default function SelectPassengers({ min, placeholder, passengers, set_passengers, passenger_type }) {
    return (
        <input className="input-number" type="number" max={10} min={min} placeholder={placeholder}
            onChange={(e) => set_passengers(prev => ({
                ...prev,
                passenger_type: e.target.value ? e.target.value : passengers[passenger_type],
            }))}
        />
    )
}
