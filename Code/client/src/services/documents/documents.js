class Documents {
    
    async downloadDocumentById(id) {
        return fetch("http://localhost:3000/document/download?id="+id, //Tady jsem radeji pouzil absolutni URL, bez toho se vytvari GET request ve tvaru employeeDetail/employee?id=x
        {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/pdf'
            }
        })
        .then( res => res.blob())
        .then(blob => {
            var file = window.URL.createObjectURL(blob);
            window.location.assign(file);
        })
        .catch((err) => {
            console.log(err)
        });
    }
}

export default new Documents();