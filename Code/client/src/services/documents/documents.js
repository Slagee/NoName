class Documents {
    async createDocument(formData) {
        return await fetch("http://localhost:8080/document",
        {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            body: formData
        })
        .then((res) => {
            if (res.ok) {
                return res.ok;
            }
            else {
                return res.text();
            }
        })
        .catch((err) => {
            console.log(err)
        });
    }

    async deleteDocument(id) {
        return await fetch("http://localhost:8080/document/"+id,
        {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.ok;
            } else {
                return res.text();
            }
        })
        .catch((err) => {
            console.log(err)
        });
    }
}
export default new Documents();