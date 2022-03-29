import { useState, useEffect } from 'react'
import employees from "../../services/employees/employees";

export function GetEmployeeById(id) {
    const [data, updateData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    
    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await employees.getEmployeeById(id);
            if (response) {
                const json = await response;
                updateData(json);
                setLoading(false);                
            }
        })();
    }, [id]);

    return [data, updateData, isLoading];
}