import { useEffect, useState } from "react";
import documentType from "./documentType";

export function GetDocumentTypeList() {
    const [documentTypeList, setDocumentTypeList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await documentType.getDocumentType();
            if (response) {
                setLoading(false);
                setDocumentTypeList(response);
            }
        })();
    }, []);

    return [documentTypeList, isLoading];
}