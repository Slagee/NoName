import { useState, useEffect } from "react/cjs/react.development";
import units from "./units";

export function GetUnitsList() {
    const [unitsList, setUnit] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await units.getUnits();
            if (response) {
                setLoading(false);
                setUnit(response.content);
            }
        })();
    }, []);

    return [unitsList, isLoading];
}