import { useState, useEffect } from 'react'
import employees from "../../services/employees/employees";

export function GetEmployeeById(id) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    
    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await employees.getEmployeeById(id);
            if (response) {
                setData(response);
                setLoading(false);                
            }
        })();
    }, [id]);

    return [data, isLoading];
}