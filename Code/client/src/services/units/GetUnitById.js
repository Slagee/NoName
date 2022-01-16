import { useState, useEffect } from "react/cjs/react.development";
import units from "./units";

export function GetUnitById(id) {
    const [unit, setUnit] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await units.getUnitById(id);
            if (response) {
                setUnit(response);
            }
        })();
    }, [id]);

    return [unit];
}