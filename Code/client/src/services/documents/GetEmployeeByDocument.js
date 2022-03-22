import { useEffect, useState } from "react";
import documents from "./documents";

export function GetEmployeeByDocumentId(id) {
    const [data, setData] = useState();

    useEffect(() => {
        (async () => {
            const response = await documents.getEmployeeId(id);
            if (response) {
                setData(response);             
            }
        })();
    }, [id]);

    return [data, setData];
}