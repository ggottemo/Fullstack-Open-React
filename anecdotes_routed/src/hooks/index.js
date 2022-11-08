import {useState} from "react";

export const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const reset = () => {
        setValue("");
    };

    if (type === "button") {
        return {
            type,
            onClick: reset,
        };
    }

    return {
        type,
        value,
        onChange,

    };
}