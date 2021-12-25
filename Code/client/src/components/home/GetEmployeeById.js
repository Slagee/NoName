import { useState, useEffect } from 'react'
import employees from "../../services/employees/employees";

export function GetEmployeeById(id) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    
    useEffect(() => {
        (async () => {
            setLoading(true);
            console.log(id)
            const response = await employees.getEmployeeById(id);
            if (response) {                
                setLoading(false);
                setData(response.content);
            }
        })();
    }, [id]);

    return [data, isLoading];
}