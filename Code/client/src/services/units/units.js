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

    async deleteUnit(id) {
        return await fetch(process.env.REACT_APP_API_UNITS+id,
        {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.text();
            } else {
                return res.text();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    async editUnit(unitInfo, id) {
        return fetch(process.env.REACT_APP_API_UNITS+id,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            },
            body: JSON.stringify(unitInfo)
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        })
    }

    async createUnit(unitInfo) {
        return fetch(process.env.REACT_APP_API_UNITS,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(unitInfo)
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export default new Units();