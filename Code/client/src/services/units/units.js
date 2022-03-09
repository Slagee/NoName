class Units {
    async getUnits() {
        return await fetch(process.env.REACT_APP_API_UNITS+"list",
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
        return fetch(process.env.REACT_APP_API_UNITS+id,
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