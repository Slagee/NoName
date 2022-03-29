class DocumentType {
    async getDocumentType() {
        return await fetch(process.env.REACT_APP_API_DOCUMENT_TYPE+"list",
        {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return null;
            }
        });
    }
}

export default new DocumentType()