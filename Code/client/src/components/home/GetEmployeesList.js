import { useState, useEffect } from 'react'
import employees from "../../services/employees/employees";

export function GetEmployeesList(name, page) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(null);
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            console.log(name + ", " + page)
            const response = await employees.getEmployeesByName(name, page);
            if (response) {                
                setLoading(false);
                setData(response.content);
                setTotalPages(response.totalPages)
            }
        })();
    }, [name, page]);

    return [data, isLoading, totalPages];
}