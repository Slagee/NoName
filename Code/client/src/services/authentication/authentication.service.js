import { message } from 'antd';

class AuthService {
    async login(credentials) {
        return fetch("login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(credentials)
        })
        .then((res) => {
            if (res.ok) {
                message.success("Přihlášení úspěšné!");
                return res.text()
            }
            else {
                message.error("Zadali jste špatné přihlašovací údaje!");
                return ""
            }
        })
        .catch((err) => {
            console.log(err)
        });
    }

    logout() {
        /*fetch("logout",
        {
            method: 'GET',
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res);
        })*/
        localStorage.removeItem('token');
        message.warning("Úspěšně jste se odhlásili!")
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();