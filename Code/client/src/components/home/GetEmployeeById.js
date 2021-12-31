import { useState, useEffect } from 'react'
import employees from "../../services/employees/employees";
import { useParams } from 'react-router-dom' // Hook, ktery z URL v routingu vytahne cislo a pouzije ho jako parametr

export function GetEmployeeById() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    
    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await employees.getEmployeeById(id);
            if (response) {                
                setLoading(false);
                setData(response);
            }
        })();
    }, [id]);

    return [data, isLoading];
}