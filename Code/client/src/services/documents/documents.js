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
        });
    }
    
    async downloadDocumentById(id) {
        return fetch("http://localhost:8080/document/download?id="+id, //Tady jsem radeji pouzil absolutni URL, bez toho se vytvari GET request ve tvaru employeeDetail/employee?id=x
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
            console.log("sad")
        })
        .catch((err) => {
            console.log(err)
        });
    }
}
export default new Documents();