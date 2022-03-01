class Units {
    async getUnits() {
        return await fetch("http://185.28.102.174:8080/unit/list",
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

    async getUnitById(id) {
        return fetch("http://185.28.102.174:8080/unit?id="+id,
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
                return res.status;
            }
        })
        .catch((err) => {
            console.log(err)
        });
    }
}

export default new Units();