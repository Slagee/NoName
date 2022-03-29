import { useState, useEffect } from 'react'
import users from "../../services/users/users";

export function GetUserList(mail, page) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(null);
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await users.getUsersByMail(mail, page);
            if (response) {
                setData(response.content);
                setTotalPages(response.totalPages)
                setLoading(false);
            }
        })();
    }, [mail, page]);

    return [data, isLoading, totalPages];
}