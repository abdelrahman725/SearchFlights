import Select from "react-select";

export default function SelectAirport({ placeholder, options, selected_airport, set_airport }) {
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            padding: "10px 20px",
        }),
    };
    return (
        <div className="search-container">
            <Select
                className="react_select"
                placeholder={placeholder}
                styles={customStyles}
                value={selected_airport}
                isClearable={true}
                options={options}
                isSearchable={false}
                noOptionsMessage={() => "No matches found"}
                onChange={(selected) => set_airport(selected)}
                isLoading={options === null}
            />
        </div>
    )
}