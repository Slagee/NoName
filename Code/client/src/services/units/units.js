class Units {
    async getUnits() {
        return await fetch("unit/list",
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

export default new Units();