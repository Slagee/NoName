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
        return fetch("http://localhost:3000/employee?id="+id, //Tady jsem radeji pouzil absolutni URL, bez toho se vytvari GET request ve tvaru employeeDetail/employee?id=x
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
        var url = "/employee/page?size=10&search&page="+(page-1)
        if (name !== null) {
            
            url = "employee/page?size=10&search="+ name + "&page="+(page-1)
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
        return await fetch("employee/page?size=10&search",
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