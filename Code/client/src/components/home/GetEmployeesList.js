import { useState, useEffect } from 'react'
import employees from "../../services/employees/employees";

export function GetEmployeesList(name, page) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(null);
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await employees.getEmployeesByName(name, page);
            if (response) {
                setData(response.content);
                setTotalPages(response.totalPages)
                setLoading(false);
            }
        })();
    }, [name, page]);

    return [data, isLoading, totalPages];
}