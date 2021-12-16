import { useState, useEffect } from 'react'
import employees from "../../services/employees/employees";

export function GetEmployeesList(name) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    
    useEffect(() => {
        (async () => {
            setLoading(true);
            console.log(name)
            const response = await employees.getEmployeesByName(name);
            setLoading(false);
            setData(response.content);
        })();
    }, [name]);

    return [data, isLoading];
}