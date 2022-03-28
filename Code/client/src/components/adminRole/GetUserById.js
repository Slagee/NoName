import { useState, useEffect } from 'react'
import users from "../../services/users/users";

export function GetUserById(id) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    
    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await users.getUserById(id);
            if (response) {
                setData(response);
                setLoading(false);                
            }
        })();
    }, [id]);

    return [data, isLoading];
}