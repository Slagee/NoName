import { useState, useEffect } from 'react'
import documents from './documents';

export function GetNotifDocs() {
    const [data, updateData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    
    useEffect(function updateNotifDocs() {
        async function fetchNotifDocs() {
            setLoading(true);
            const response = await documents.getNotifDocs();
            if (response) {
                const json = await response;
                setLoading(false);
                updateData(json)
            }
        }
        fetchNotifDocs();
    }, []);

    return [data, updateData, isLoading];
}