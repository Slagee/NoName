class Employees {
    async createEmployee(employeeInfo) {
        return fetch("employee",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(employeeInfo)
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

    async getEmployeeById(id) {
        return fetch("employee/"+id,
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

export default new Employees();