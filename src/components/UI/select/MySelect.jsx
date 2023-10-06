import React from "react";

const MySelect = ({ options, defaultValue, value, onChange }) => {
    return (
        <select
            value={value}
            onChange={(event) => onChange(event.target.value)} //Здесь в ф-цию onChange передаем не эвент, а сразу значение, которое выбрал пользователь
        >
            <option disabled value=''>
                {defaultValue}
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default MySelect;
