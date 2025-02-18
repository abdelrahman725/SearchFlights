import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export default function SelectDate({ placeholder, date, set_date }) {
    const [displayed_month, setDisplayedMonth] = useState(new Date().getMonth());

    // check if a day doesn't match the current displayed calender month
    const getDayClassName = (d) => {
        const isOutsideDay = d.getMonth() !== displayed_month;
        return isOutsideDay ? "outside-day" : null;
    };

    return (
        <div className="select-date">
            <DatePicker
                className="date-picker"
                selected={date}
                onChange={(selected) => set_date(selected)}
                dateFormat="dd/MM/yyyy"
                isClearable={true}
                onMonthChange={(d) => setDisplayedMonth(d.getMonth())} // Update displayed month
                dayClassName={getDayClassName}
                placeholderText={placeholder}
            />
        </div>
    )
}