class Users {

    async getUsersByMail(mail, page) {
        let url = process.env.REACT_APP_API_USERS+"page?size=10&email&page="+(page-1)
        if (mail !== null) {

            url = process.env.REACT_APP_API_USERS+"page?size=10&email="+ mail + "&page="+(page-1)
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

    async getUserById(id) {
        //var url = "employee?id="+id
        return fetch(process.env.REACT_APP_API_USERS+"?id="+id,
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
    
    async getUsersPaged() {
        return await fetch(process.env.REACT_APP_API_USERS+"page?size=10&email",
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

export default new Users();