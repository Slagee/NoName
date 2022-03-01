class Employees {
    async createEmployee(employeeInfo) {
        return fetch("http://185.28.102.174:8080/employee",
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

    async editEmployee(employeeInfo, id) {
        return fetch("http://185.28.102.174:8080/employee/"+id,
        {
            method: 'PUT',
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
        //var url = "employee?id="+id
        return fetch("http://185.28.102.174:8080/employee?id="+id,
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

    async getEmployeesByName(name, page) {
        var url = "http://185.28.102.174:8080/employee/page?size=10&search&page="+(page-1)
        if (name !== null) {
            
            url = "http://185.28.102.174:8080/employee/page?size=10&search="+ name + "&page="+(page-1)
            console.log("call" + url);
        }
        return await fetch(url,
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

    async getEmployeesPaged() {
        return await fetch("http://185.28.102.174:8080/employee/page?size=10&search",
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
}

export default new Employees();