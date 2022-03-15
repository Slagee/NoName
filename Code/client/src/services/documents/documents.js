class Documents {
    async createDocument(formData) {
        return await fetch(process.env.REACT_APP_API_DOCUMENTS,
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
        return await fetch(process.env.REACT_APP_API_DOCUMENTS+id,
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
        });
    }
    
    async downloadDocumentById(id) {
        return fetch(process.env.REACT_APP_API_DOCUMENTS+"download?id="+id, //Tady jsem radeji pouzil absolutni URL, bez toho se vytvari GET request ve tvaru employeeDetail/employee?id=x
        {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            //    'Content-Type': 'application/pdf'
            }
        })
        .then( res => res.blob())
        .then(blob => {
            console.log(blob)
            var file = window.URL.createObjectURL(blob);
            window.open(file);
            //window.location.assign(file);
        })
        .catch((err) => {
            console.log(err)
        });
    }

    async getNotifDocs() {
        return fetch(process.env.REACT_APP_API_DOCUMENTS+"notifications",
        {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err)
        });
    }

    async getEmployeeId(id) {
        return fetch(process.env.REACT_APP_API_DOCUMENTS+"employeeForThisDocument/"+id,
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
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
export default new Documents();